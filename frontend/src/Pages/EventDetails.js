import React, { useState } from "react";
import Header from "../components/Main-Components/Header";
import HeaderContent from "../components/EventListPage/HeaderContent";
import { useEffect } from "react";
import { Col, Row, Container, Spinner } from "reactstrap";
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import axios from "redaxios";
import styles from "./EventDetails.module.css";
import PrimaryBtn from "../components/Main-Components/PrimaryBtn";
import web3 from "../web3";
import EventContract from "../EventContract";
import { SeatsioClient, Region } from "seatsio";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import Loading from "./Loading";

function EventDetails() {
  const history = useHistory();
  const client = new SeatsioClient(
    Region.NA(),
    "886377b9-1e1a-4780-93b3-7d0b480bbad8"
  );
  const [eventinfo, setEventinfo] = useState("");
  const [tix, setTix] = useState([]);
  const [forOnline, setForOnline] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  let currentUser;

  const user_id = useSelector((state) => {
    return state.users.userID;
  });

  if (typeof user_id === "number") {
    currentUser = user_id;
  }

  // get user email address
  async function getUser() {
    let response = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/getInfo`,
      {
        id: currentUser,
      }
    );
    setEmail(response.data[0].email);
  }

  useEffect(() => {
    async function fetch() {
      let event_id = window.location.pathname.split("/")[2];
      let response = await axios.get(
        `${process.env.REACT_APP_SERVER}/event/${event_id}`
      );
      setEventinfo(response.data[0]);
      if (response.data[0].isOnline) {
        let host = await EventContract.methods
          .eventLog(response.data[0].contractAddress)
          .call();
        let qty = await EventContract.methods
          .TixQtyPerUser(response.data[0].contractAddress, host, 0)
          .call();
        let wei = await EventContract.methods
          .TixPrice(response.data[0].contractAddress, 0)
          .call();
        let ether = web3.utils.fromWei(wei, "ether");
        let online = {
          qty: qty,
          price: ether,
        };
        setForOnline(online);
      }
    }
    getUser();
    fetch();
  }, [user_id]);

  async function select(e) {
    let location = e.id;
    let tixID = e.category.label;
    let host = await EventContract.methods
      .eventLog(eventinfo.contractAddress)
      .call();
    let qty = await EventContract.methods
      .TixQtyPerUser(eventinfo.contractAddress, host, tixID)
      .call();
    let wei = await EventContract.methods
      .TixPrice(eventinfo.contractAddress, tixID)
      .call();
    let ether = web3.utils.fromWei(wei, "ether");

    setTix((tix) => [
      ...tix,
      {
        location: location,
        category: tixID,
        qty: qty,
        price: ether,
      },
    ]);
  }

  function deselect(e) {
    setTix((tix) => {
      return tix.filter((data) => {
        return data.location !== e.id;
      });
    });
  }

  async function checkout() {
    setLoading(true);
    let amount = tix.reduce((a, b) => {
      return parseFloat(a) + parseFloat(b.price);
    }, 0);
    let accounts = await web3.eth.getAccounts();
    let wei = web3.utils.toWei(`${amount}`, "ether");
    await EventContract.methods
      .buyTicket(eventinfo.contractAddress, tix[0].category, tix.length)
      .send({ from: accounts[0], value: wei });

    let data = {
      TixDetails: tix,
      wallet_id: accounts[0],
      contractAddress: eventinfo.contractAddress,
    };
    await axios.post(`${process.env.REACT_APP_SERVER}/purchase`, data);
    let tixArray = [];
    for (let each of tix) {
      tixArray.push(each.location);
    }
    await client.events.book(eventinfo.contractAddress, tixArray);
    await axios.post(
      `${process.env.REACT_APP_SERVER}/api/purchase-confirmation`,
      {
        email: email,
      }
    );
    history.push("/confirmation");
  }

  async function checkoutForOnline() {
    setLoading(true);
    let accounts = await web3.eth.getAccounts();
    let wei = web3.utils.toWei(`${forOnline.price}`, "ether");
    await EventContract.methods
      .buyTicket(eventinfo.contractAddress, "0", "1")
      .send({ from: accounts[0], value: wei });

    let data = {
      TixDetails: { qty: 1, price: forOnline.price },
      wallet_id: accounts[0],
      contractAddress: eventinfo.contractAddress,
    };
    await axios.post(`${process.env.REACT_APP_SERVER}/purchase`, data);
    history.push("/confirmation");
  }

  console.log(eventinfo);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Header
          backgroundimage={eventinfo.eventPhoto}
          content={<HeaderContent avatar={null} title={null} para={null} />}
        />
        {eventinfo.isOnline ? (
          <Container className={styles.main}>
            <div className={styles.container}>
              <h1>{eventinfo.eventName}</h1>
              <h4>
                {new Date(eventinfo.eventDate).toString().slice(0, 3) +
                  ", " +
                  new Date(eventinfo.eventDate).toString().slice(4, 15) +
                  ", " +
                  new Date(eventinfo.eventDate).toString().slice(16, 21) +
                  ". " +
                  eventinfo.eventLocation +
                  ". " +
                  "(Online Event)"}
              </h4>
            </div>
            <div>
              <Row>
                <Col lg="6">
                  <h4>{eventinfo.eventDescription}</h4>
                </Col>
                <Col lg="6">
                  <Container>
                    <Row className={styles.titlerow}>
                      <Col xs="4">
                        <h5>Availiable</h5>
                      </Col>
                      <Col xs="4" className={styles.col2}>
                        <h5>Price</h5>
                      </Col>
                    </Row>
                    {forOnline ? (
                      <Row className={styles.row}>
                        <Col xs="4">
                          <h6>{forOnline.qty}</h6>
                        </Col>
                        <Col xs="4" className={styles.col2}>
                          <h6>{forOnline.price}</h6>
                        </Col>
                      </Row>
                    ) : (
                      <Spinner color="dark" />
                    )}
                  </Container>
                  <PrimaryBtn text={"Checkout"} click={checkoutForOnline} />
                </Col>
              </Row>
            </div>
          </Container>
        ) : (
          <Container className={styles.main}>
            <div className={styles.container}>
              <h1>{eventinfo.eventName}</h1>
              <h4>
                {new Date(eventinfo.eventDate).toString().slice(0, 3) +
                  ", " +
                  new Date(eventinfo.eventDate).toString().slice(4, 15) +
                  ", " +
                  new Date(eventinfo.eventDate).toString().slice(16, 21) +
                  ". " +
                  eventinfo.eventLocation +
                  ", " +
                  eventinfo.venue}
              </h4>
              <h4 style={{ paddingTop: "1rem" }}>
                {eventinfo.eventDescription}
              </h4>
            </div>
            <div>
              <Row>
                <Col lg="6">
                  {eventinfo.contractAddress ? (
                    <SeatsioSeatingChart
                      workspaceKey="ba650b33-08ea-4845-9c03-8f74fe31c6ce"
                      event={eventinfo.contractAddress}
                      region="na"
                      onObjectSelected={select}
                      onObjectDeselected={deselect}
                    />
                  ) : null}
                </Col>
                <Col lg="6">
                  <Container>
                    <Row className={styles.titlerow}>
                      <Col xs="4" className={styles.col}>
                        <h5>Location</h5>
                      </Col>
                      <Col xs="4">
                        <h5>Availiable</h5>
                      </Col>
                      <Col xs="4" className={styles.col2}>
                        <h5>Price</h5>
                      </Col>
                    </Row>
                    {tix.map((data) => {
                      return (
                        <Row className={styles.row}>
                          <Col xs="4" className={styles.col}>
                            <h6>{data.location}</h6>
                          </Col>
                          <Col xs="4">
                            <h6>{data.qty}</h6>
                          </Col>
                          <Col xs="4" className={styles.col2}>
                            <h6>{data.price}</h6>
                          </Col>
                        </Row>
                      );
                    })}
                  </Container>
                  <PrimaryBtn text={"Checkout"} click={checkout} />
                </Col>
              </Row>
            </div>
          </Container>
        )}
      </div>
    );
  }
}

export default EventDetails;
