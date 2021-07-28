import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import SocketIoCss from "./SocketIo.module.css";
import { useParams, useHistory } from "react-router-dom";
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
  const [joinedRoom, setJoinedRoom] = useState(false);
  const userVideo = useRef();

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };
  let history = useHistory();
  function leaveRoom() {
    history.push(`/user-settings`);
    window.location.reload();
  }

  const joinAsViewer = () => {
    user = {
      room: eventId,
      name: username,
    };
    socket.emit("register as viewer", user);

    socket.on("host-not-streaming", function () {
      alert("The event has not started yet! Please come back later!");
    });
  };

  useEffect(() => {
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

      setJoinedRoom(true);
      rtcPeerConnections[broadcaster.id].ontrack = (event) => {
        userVideo.current.srcObject = event.streams[0];
      };

      rtcPeerConnections[broadcaster.id].onicecandidate = (event) => {
        if (event.candidate) {
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
    });
  }, []);

  //=================================================================================================================================
  const { id } = useParams();

  const grabEventHost = useSelector((state) => state.eventCard.eventHost);

  const [eventHost, setEventHost] = useState(grabEventHost);
  const [eventId, setEventId] = useState(grabEventHost);
  const [hasTix, setHasTix] = useState(false);
  const [theEvent, setTheEvent] = useState([]);
  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    setEventHost(grabEventHost);
  }, [grabEventHost]);

  async function getUserAddress() {
    let user_address = await web3.eth.getAccounts();

    let filterData = await eventHost.filter((data) => {
      return parseInt(data.id) === parseInt(id);
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

  async function grabCustomerIDFromWeb3(contractAddress, userId) {
    let customer = await EventContract.methods
      .TixQtyPerUser(contractAddress, userId, 0)
      .call();
    if (customer) {
      setHasTix(true);
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
                <video
                  id={SocketIoCss.video}
                  controls
                  autoPlay
                  ref={userVideo}
                ></video>
              </Col>
              <Col sm={4}>
                {joinedRoom ? (
                  <Button click={leaveRoom} text={"Leave Room"} />
                ) : (
                  <Button click={joinAsViewer} text={"Join Event"} />
                )}
                <div className={SocketIoCss.chatContainer}>
                  <div className={SocketIoCss.newUser}>
                    {theEvent && (
                      <div>
                        <h4 id={SocketIoCss.eventName}>{theEvent.eventName}</h4>
                        <div id={SocketIoCss.eventDescription}>
                          Description:{" "}
                          <span className={SocketIoCss.eventText}>
                            {theEvent.eventDescription}
                          </span>
                        </div>
                        <div id={SocketIoCss.eventStartTime}>
                          Start at:{" "}
                          <span className={SocketIoCss.eventText}>
                            {theEvent.startTime}
                          </span>
                        </div>
                        <div id={SocketIoCss.eventEndTime}>
                          End at:{" "}
                          <span className={SocketIoCss.eventText}>
                            {theEvent.endTime}
                          </span>
                        </div>
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
