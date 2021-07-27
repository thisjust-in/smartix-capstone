import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import SocketIoCss from "./SocketIo.module.css";
import { useParams } from "react-router-dom";
import EventContract from "../../EventContract";
import web3 from "../../web3";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../Main-Components/PrimaryBtn";
import { Spinner } from "reactstrap";
import axios from "redaxios";

const socket = io.connect(`${process.env.REACT_APP_SERVER}`);
let rtcPeerConnections = {};
let user;
function SocketIo() {
  const [username, setUsername] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [stream, setStream] = useState();
  const broadcasterVideo = useRef();
  const userVideo = useRef();

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };
  const streamConstraints = { audio: false, video: { height: 480 } };

  // let socket = io();

  //   const joinAsBroadcaster = () => {
  //     user = {
  //       room: userId,
  //       name: "need to change",
  //     };
  //     console.log("broadcasterVideo", broadcasterVideo);
  //     navigator.mediaDevices
  //       .getUserMedia(streamConstraints)
  //       .then(function (stream) {
  //         // console.log(myVideo);
  //         setStream(stream);
  //         broadcasterVideo.current.srcObject = stream;
  //         socket.emit("register as broadcaster", user.room);
  //       });
  //   };

  const joinAsViewer = () => {
    console.log("clicked");

    user = {
      room: eventId,
      name: username,
    };
    socket.emit("register as viewer", user);
    // console.log("can i get here");
  };

  useEffect(() => {
    socket.on("new viewer", async function (viewer) {
      console.log("new user comes in!", viewer);
      rtcPeerConnections[viewer.id] = new RTCPeerConnection(iceServers);

      const stream = broadcasterVideo.current.srcObject;
      await stream.getTracks().forEach((track) => {
        return rtcPeerConnections[viewer.id].addTrack(track, stream);
      });
      rtcPeerConnections[viewer.id].onicecandidate = (event) => {
        if (event.candidate) {
          console.log("sending ice candidate");
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
  }, []);

  const handleRoomNumber = (e) => {
    setRoomNumber(e.target.value);
  };

  //=================================================================================================================================
  const { id } = useParams();

  const grabEventHost = useSelector((state) => state.eventCard.eventHost);
  const userName = useSelector((state) => {
    console.log("useselector", state);
  });
  const [eventHost, setEventHost] = useState(grabEventHost);
  const [eventId, setEventId] = useState(grabEventHost);
  const [hasTix, setHasTix] = useState(false);
  const [theEvent, setTheEvent] = useState([]);
  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(async () => {
    await setEventHost(grabEventHost);
  }, [grabEventHost]);

  async function getUserAddress() {
    let user_address = await web3.eth.getAccounts();

    let filterData = await eventHost.filter((data) => {
      return data.id == id;
    });
    if (filterData[0]) {
      setEventId(filterData[0].contractAddress);
      if (user_address) {
        setTheEvent(filterData[0]);
        grabCustomerIDFromWeb3(
          filterData[0].contractAddress,
          user_address[0].toLowerCase()
        );
        let theUserName = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/findusername`,
          {
            userAddress: user_address,
          }
        );
        setUsername(theUserName.data);
      }
    }
  }

  console.log("theEvent", theEvent);

  async function grabCustomerIDFromWeb3(contractAddress, userId) {
    let customer = await EventContract.methods
      .TixQtyPerUser(contractAddress, userId, 0)
      .call();
    if (customer) {
      setHasTix(true);
      console.log("has tix");
    }
  }

  return (
    <div className={SocketIoCss.videoDiv}>
      {hasTix ? (
        <div
          style={{
            backgroundSize: "cover",
            height: "70vh",

            backgroundImage: `url(${theEvent.eventPhoto})`,
            padding: "4rem 0rem 0rem 0rem",
          }}
        >
          <Container>
            <Row>
              <Col sm={8}>
                {stream ? (
                  <video
                    controls
                    id={SocketIoCss.video}
                    ref={broadcasterVideo}
                  ></video>
                ) : (
                  <video
                    id={SocketIoCss.video}
                    controls
                    ref={userVideo}
                  ></video>
                )}
              </Col>
              <Col sm={4}>
                {stream ? (
                  <Button click={joinAsViewer} text={"Streaming"} />
                ) : (
                  <Button click={joinAsViewer} text={"Join Event"} />
                )}
                <div className={SocketIoCss.chatContainer}>
                  <div className={SocketIoCss.newUser}>
                    {theEvent && (
                      <div>
                        <h4>{theEvent.eventName}</h4>
                        <div>Description: {theEvent.eventDescription}</div>
                        <div>Start at: {theEvent.startTime}</div>
                        <div>End at: {theEvent.endTime}</div>
                      </div>
                    )}
                  </div>
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
