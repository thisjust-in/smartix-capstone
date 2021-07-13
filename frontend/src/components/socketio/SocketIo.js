import React, { useEffect, useRef, useState } from "react";

import Peer from "simple-peer";
import io from "socket.io-client";

const socket = io.connect("http://127.0.0.1:8080");
function SocketIo() {
  const [username, setUsername] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [stream, setStream] = useState();
  const broadcasterVideo = useRef();
  let user;
  let rtcPeerConnections = {};

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };
  const streamConstraints = { audio: false, video: { height: 480 } };

  // let socket = io();

  const joinAsBroadcaster = () => {
    if (roomNumber === "" || username === "") {
      alert("Please type a room number and a name");
    } else {
      user = {
        room: roomNumber,
        name: username,
      };

      navigator.mediaDevices
        .getUserMedia(streamConstraints)
        .then(function (stream) {
          // console.log(myVideo);
          setStream(stream);
          broadcasterVideo.current.srcObject = stream;
          socket.emit("register as broadcaster", user.room);
        });
    }
  };

  const joinAsViewer = () => {
    console.log("clicked");
    if (roomNumber === "" || username === "") {
      alert("Please type a room number and a name");
    } else {
      user = {
        room: roomNumber,
        name: username,
      };
      socket.emit("register as viewer", user);
      // console.log("can i get here");
    }
  };

  useEffect(() => {
    socket.on("new viewer", function (viewer) {
      console.log("new user comes in!", viewer);
      // rtcPeerConnections[viewer.id] = new RTCPeerConnection(iceServers);
      // console.log(broadcasterVideo);
      // const stream = broadcasterVideo.current.accessKey;
      // console.log("stream", stream);
      // stream.getTracks();
      // .forEach((track) => {
      //   rtcPeerConnections[viewer.id].addTrack(track, stream);
      // });

      // rtcPeerConnections[viewer.id].onicecandidate = (event) => {
      //   if (event.candidate) {
      //     console.log("sending ice candidate");
      //     socket.emit("candidate", viewer.id, {
      //       type: "candidate",
      //       label: event.candidate.sdpMLineIndex,
      //       id: event.candidate.sdpMid,
      //       candidate: event.candidate.candidate,
      //     });
      //   }
      // };
    });
  }, []);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleRoomNumber = (e) => {
    setRoomNumber(e.target.value);
  };

  return (
    <div>
      <label htmlFor="name">Type your Name</label>
      <input
        type="text"
        name=""
        id="name"
        value={username}
        onChange={handleUsername}
      />
      <label htmlFor="roomNumber">Type the room number</label>
      <input
        type="text"
        name=""
        id="roomNumber"
        value={roomNumber}
        onChange={handleRoomNumber}
      />
      <button onClick={joinAsBroadcaster}>Join as Broadcaster</button>
      <button onClick={joinAsViewer}>Join as Viewer</button>
      {stream && <video autoPlay ref={broadcasterVideo}></video>}
    </div>
  );
}

export default SocketIo;
