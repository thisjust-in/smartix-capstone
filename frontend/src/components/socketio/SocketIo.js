import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import SocketIoCss from "./SocketIo.module.css";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import web3 from "../../web3";
import Button from "../Main-Components/PrimaryBtn";
import { Spinner } from "reactstrap";

const socket = io.connect(`${process.env.REACT_APP_SERVER}`);
let rtcPeerConnections = {};
let user;
function SocketIo() {
  const [stream, setStream] = useState();
  const [newUser, setNewUser] = useState([]);
  const broadcasterVideo = useRef();
  const userVideo = useRef();

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };
  const streamConstraints = { audio: false, video: { height: 480 } };

  let history = useHistory();
  function leaveRoom() {
    // history.push(`/user-settings`);
    window.location.reload();
  }
  // let socket = io();

  const joinAsBroadcaster = () => {
    user = {
      room: eventId,
      name: hostName,
    };
    console.log("broadcasterVideo", broadcasterVideo);
    navigator.mediaDevices
      .getUserMedia(streamConstraints)
      .then(function (stream) {
        // console.log(myVideo);
        setStream(stream);
        broadcasterVideo.current.srcObject = stream;
        socket.emit("register as broadcaster", user.room);
      });
  };

  useEffect(() => {
    socket.on("new viewer", async function (viewer) {
      // console.log("new user comes in!", viewer.name);
      setNewUser((user) => [...user, viewer.name]);
      rtcPeerConnections[viewer.id] = new RTCPeerConnection(iceServers);

      const stream = broadcasterVideo.current.srcObject;
      await stream.getTracks().forEach((track) => {
        return rtcPeerConnections[viewer.id].addTrack(track, stream);
      });
      rtcPeerConnections[viewer.id].onicecandidate = (event) => {
        if (event.candidate) {
          console.log("sending ice candidate");
          console.log("viewer.id", viewer.id);
          socket.emit("candidate", viewer.id, {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      };

      rtcPeerConnections[viewer.id]
        .createOffer()
        .then((sessionDescription) => {
          rtcPeerConnections[viewer.id].setLocalDescription(sessionDescription);
          socket.emit("offer", viewer.id, {
            type: "offer",
            sdp: sessionDescription,
            broadcaster: user,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });

    socket.on("candidate", function (id, event) {
      let candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });
      rtcPeerConnections[id].addIceCandidate(candidate);
    });

    socket.on("offer", function (broadcaster, sdp) {
      rtcPeerConnections[broadcaster.id] = new RTCPeerConnection(iceServers);

      rtcPeerConnections[broadcaster.id].setRemoteDescription(sdp);

      rtcPeerConnections[broadcaster.id]
        .createAnswer()
        .then((sessionDescription) => {
          rtcPeerConnections[broadcaster.id].setLocalDescription(
            sessionDescription
          );
          socket.emit("answer", {
            type: "answer",
            sdp: sessionDescription,
            room: user.room,
          });
        });

      console.log(broadcasterVideo);
      rtcPeerConnections[broadcaster.id].ontrack = (event) => {
        userVideo.current.srcObject = event.streams[0];
      };

      rtcPeerConnections[broadcaster.id].onicecandidate = (event) => {
        if (event.candidate) {
          console.log("sending ice candidate");
          socket.emit("candidate", broadcaster.id, {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      };
    });

    socket.on("answer", function (viewerId, event) {
      rtcPeerConnections[viewerId].setRemoteDescription(
        new RTCSessionDescription(event)
      );
      // console.log("what is this now", rtcPeerConnections);
    });

    socket.on("user-disconnected", (user) => {
      // if (peers[userId]) peers[userId].close();
      console.log("disconnected", user.id);
      removeUser(user.name);
    });

    function removeUser(userName) {
      setNewUser((user) => {
        console.log("user", user);
        let newArr = [...user];
        let index = newArr.indexOf(userName);
        if (index > -1) {
          console.log("index", index);
          newArr.splice(index);
          console.log("after remove", newArr);
        }
        return newArr;
      });
    }
  }, []);

  //=================================================================================================================================
  const { id } = useParams();

  const grabEventHost = useSelector((state) => state.eventCard.eventHost);
  const [eventHost, setEventHost] = useState(grabEventHost);
  const [eventId, setEventId] = useState(grabEventHost);
  const [isHost, setIsHost] = useState(false);
  const [userId, setUserId] = useState("");
  const [hostName, setHostName] = useState();
  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    setEventHost(grabEventHost);
  }, [grabEventHost]);

  useEffect(() => {
    checkIsHost();
  });
  async function getUserAddress() {
    let user_address = await web3.eth.getAccounts();
    setUserId(user_address[0].toLowerCase());
  }

  async function checkIsHost() {
    let filterData = await eventHost.filter((data) => {
      return data.id == id;
    });
    if (filterData[0]) {
      setIsHost(filterData[0].wallet_id == userId);
    }
    if (isHost) {
      setHostName(filterData[0].eventName);
      setEventId(filterData[0].contractAddress);
    }
  }
  return (
    <div className={SocketIoCss.videoDiv}>
      {isHost ? (
        <div style={{ height: "70vh" }}>
          <Container>
            <h1 className={SocketIoCss.title}>{hostName}</h1>
            <Row>
              <Col sm={8}>
                {stream ? (
                  <video
                    controls
                    autoPlay
                    id={SocketIoCss.video}
                    ref={broadcasterVideo}
                  ></video>
                ) : (
                  <div>
                    <video
                      id={SocketIoCss.video}
                      controls
                      ref={userVideo}
                    ></video>
                  </div>
                )}
              </Col>
              <Col sm={4}>
                {stream ? (
                  <Button click={leaveRoom} text={"Streaming"} />
                ) : (
                  <Button
                    click={joinAsBroadcaster}
                    text={"Start Broadcasting"}
                  />
                )}
                <div className={SocketIoCss.chatContainer}>
                  <div>
                    {newUser.length} Viewer{newUser.length > 1 ? "s" : ""}
                  </div>
                  {newUser.map((data) => (
                    <div className={SocketIoCss.newUser}>{data} Joined!</div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div style={{ height: "70vh" }} className={SocketIoCss.spinner}>
          <Spinner color="dark" />
        </div>
      )}
    </div>
  );
}

export default SocketIo;
