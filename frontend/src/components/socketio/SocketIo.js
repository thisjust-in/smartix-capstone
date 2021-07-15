import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");
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
  const streamConstraints = {
    audio: false,
    video: { width: 1920, height: 1080 },
  };

  // let socket = io();

  const joinAsBroadcaster = () => {
    if (roomNumber === "" || username === "") {
      alert("Please type a room number and a name");
    } else {
      user = {
        room: roomNumber,
        name: username,
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
      {<video autoPlay ref={userVideo}></video>}
    </div>
  );
}

export default SocketIo;
