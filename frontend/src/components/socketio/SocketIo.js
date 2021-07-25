import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import SocketIoCss from "./SocketIo.module.css";
import { useParams } from "react-router-dom";
import EventContract from "../../EventContract";
import web3 from "../../web3";
import Button from "../Main-Components/PrimaryBtn";
import { RedButton } from "../Main-Components/SecondaryButton";

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
  const streamConstraints = { audio: false, video: { height: 480 } };

  // let socket = io();

  const joinAsBroadcaster = () => {
    user = {
      room: userId,
      name: "need to change",
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

    grabCustomerIDFromWeb3();
  }, []);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleRoomNumber = (e) => {
    setRoomNumber(e.target.value);
  };

  //=================================================================================================================================
  const { id } = useParams();

  async function grabCustomerIDFromWeb3() {
    let customer = await EventContract.methods
      .TixQtyPerUser(
        "0xb38d1e13036bf85b89512b626e0249809185434a",
        "0x8d39602eacc3a5acd999d247310a566fe5a3e1e2",
        0
      )
      .call();
    console.log("customer", customer);
  }

  const grabEventHost = useSelector((state) => state.eventCard.eventHost);
  const [eventHost, setEventHost] = useState(grabEventHost);
  const [isHost, setIsHost] = useState(false);
  const [userId, setUserId] = useState("");
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
  }

  return (
    <div>
      {isHost ? (
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
          <button onClick={joinAsViewer}>Join as Viewer</button>
          {stream ? (
            <Button click={joinAsBroadcaster} text={"Streaming"} />
          ) : (
            <Button click={joinAsBroadcaster} text={"Start Broadcasting"} />
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
        <div>Loading</div>
      )}
    </div>
  );
}

export default SocketIo;
