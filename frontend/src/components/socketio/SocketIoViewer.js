import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import SocketIoCss from "./SocketIo.module.css";
import { useParams } from "react-router-dom";
import EventContract from "../../EventContract";
import web3 from "../../web3";
import Button from "../Main-Components/PrimaryBtn";
import { Spinner } from "reactstrap";

const socket = io.connect("http://172.20.10.2:8080");
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

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleRoomNumber = (e) => {
    setRoomNumber(e.target.value);
  };

  //=================================================================================================================================
  const { id } = useParams();

  const grabEventHost = useSelector((state) => state.eventCard.eventHost);
  const [eventHost, setEventHost] = useState(grabEventHost);
  const [eventId, setEventId] = useState(grabEventHost);
  const [hasTix, setHasTix] = useState(false);
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
        grabCustomerIDFromWeb3(
          filterData[0].contractAddress,
          user_address[0].toLowerCase()
        );
      }
    }
  }

  async function grabCustomerIDFromWeb3(contractAddress, userId) {
    let customer = await EventContract.methods
      .TixQtyPerUser(contractAddress, userId, 0)
      .call();
    if (customer) {
      setHasTix(true);
      console.log("has tix");
    }
  }

  console.log(eventId);

  return (
    <div className={SocketIoCss.videoDiv}>
      {hasTix ? (
        <div>
          {stream ? (
            <Button click={joinAsViewer} text={"Streaming"} />
          ) : (
            <Button click={joinAsViewer} text={"Join Event"} />
          )}
          {stream ? (
            <video
              controls
              id={SocketIoCss.video}
              ref={broadcasterVideo}
            ></video>
          ) : (
            <video id={SocketIoCss.video} controls ref={userVideo}></video>
          )}
        </div>
      ) : (
        <Spinner color="dark" />
      )}
    </div>
  );
}

export default SocketIo;
