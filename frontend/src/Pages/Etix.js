import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
} from "reactstrap";
import styles from "./Etix.module.css";
import { useEffect } from "react";
import axios from "redaxios";
import web3 from "../web3";
import { Col, Row } from "reactstrap";
import QRCode from "qrcode.react";

function Etix() {
  const [eventinfo, setEventinfo] = useState("");
  const [tix, setTix] = useState("");
  const [address, setAddress] = useState("");
  let event_id = window.location.pathname.split("/")[2];

  console.log(address);

  async function fetch() {
    let user_address = await web3.eth.getAccounts();
    let eventDetails = await axios.get(
      `${process.env.REACT_APP_SERVER}/event/${event_id}`
    );
    let tixDetails = await axios.post(
      `${process.env.REACT_APP_SERVER}/gettix`,
      {
        wallet_id: user_address[0],
        event_id: event_id,
      }
    );
    setAddress(user_address[0].toLowerCase());
    setEventinfo(eventDetails.data[0]);
    setTix(tixDetails.data[0]);
  }

  useEffect(() => {
    fetch();
  }, [fetch]);

  let codeContent = `${process.env.REACT_APP_FRONTSERVER}/checktix/${event_id}/${address}`;
  console.log(codeContent);

  return (
    <div className={styles.tixcontainer}>
      <Card className={styles.card}>
        <CardImg
          className={styles.cardimg}
          top
          width="100%"
          src={eventinfo.eventPhoto}
          alt="Card image cap"
        />
        <CardHeader>
          <CardTitle tag="h5"> {eventinfo.eventName} </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {eventinfo.eventLocation}
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          <CardText>
            <p style={{ color: "grey" }}> Location: </p>{" "}
            <h5>{eventinfo.venue}</h5>
          </CardText>
          <CardText>
            <Row>
              <Col>
                <p style={{ color: "grey" }}> Date: </p>{" "}
                <h5>{new Date(eventinfo.eventDate).toDateString()}</h5>
              </Col>
              <Col>
                <p style={{ color: "grey" }}> Time: </p>
                <h5>{new Date(eventinfo.eventDate).toLocaleTimeString()}</h5>
              </Col>
            </Row>
          </CardText>
          {tix ? (
            <CardText>
              <p style={{ color: "grey" }}> Ticket Quantity:</p>{" "}
              <h5>{tix.TixDetails.length}</h5>
            </CardText>
          ) : null}
          {tix ? (
            tix.TixDetails.map((each) => {
              return (
                <CardText>
                  <Row>
                    <Col>
                      <p style={{ color: "grey" }}> Row: </p>{" "}
                      <h5>{each.location.split("-")[0]}</h5>
                    </Col>
                    <Col>
                      <p style={{ color: "grey" }}> Seat no.: </p>{" "}
                      <h5>{each.location.split("-")[1]}</h5>
                    </Col>
                  </Row>
                </CardText>
              );
            })
          ) : (
            <h1>No Valid Tickets</h1>
          )}
        </CardBody>
        <div className={styles.qrcode}>
          {address && tix ? <QRCode value={codeContent} size="100" /> : null}
        </div>
      </Card>
    </div>
  );
}

export default Etix;
