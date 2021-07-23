import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import image from "../assets/Asset-2.png";
import web3 from "../../web3";
import EventContract from "../../EventContract";
import classes from "./EventSettings.module.css";
import axios from "redaxios";
import { useSelector, useStore } from "react-redux";
import { useHistory } from "react-router-dom";

export const MintTickets = () => {
  const history = useHistory();
  const [event, setEvent] = useState("")
  const [eventCapacity, setEventCapacity] = useState("");
  const user = useSelector((state) => state.users)

  useEffect(async () => {
    if (typeof user.userID !== "object"){
      let eventDetails = await axios.post("http://localhost:8080/api/findContractAddress", {id: user.userID})
      setEvent(eventDetails.data)
      if (eventDetails.data.isOnline == false) {
        if (eventDetails.data.venue === "Hong Kong Coliseum") {
          setEventCapacity(562);
        } else if (eventDetails.data.venue === "AsiaWorld-Expo") {
          setEventCapacity(897);
        }
      } else {
        setEventCapacity(2000);
      }

    }

  }, [user.userID]);

  const submitPrice = async (e) => {
    e.preventDefault();
    let user_address = await web3.eth.getAccounts()

        if (event.venue == "AsiaWorld-Expo") {
          console.log("Expo")
          await EventContract.methods
          .Mint(event.contractAddress, 897)
          .send({ from: user_address[0] });
        } else if (event.venue === "Hong Kong Coliseum") {
          console.log("Coliseum")
          await EventContract.methods
          .Mint(event.contractAddress, 562)
          .send({ from: user_address[0] });
        } else {
          console.log("online")
          await EventContract.methods
          .Mint(event.contractAddress, 2000)
          .send({ from: user_address[0] });
        }

    history.push("/event/settings");
  };

  return (
    <div className={classes.generalContainer}>
      <Container>
        <Row>
          <Col>
            <img src={image} alt="Image" width="100%" />
          </Col>
          <Col>
            <div className={classes.formContainer}>
              <h6>
                <strong>(Step 2) Create Event Tickets</strong>
                <div id={classes.priceConverter}>
                  {
                    event.isOnline ? <p>Event Location: Online</p> : <p>Event Location: {event.venue}</p>
                  }
                </div>
              </h6>
              <Form onSubmit={submitPrice} className={classes.form}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Event Capacity</Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder={eventCapacity}
                    disabled
                  />
                </Form.Group>
                { typeof user.userID !== "object" ? (
                  <button
                    variant="primary"
                    type="submit"
                    className={classes.submitBtn}
                  >
                    Create Ticket
                  </button>
                ) : null}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
