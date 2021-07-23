import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import image from "../assets/Asset-1.jpg";
import web3 from "../../web3";
import EventContract from "../../EventContract";
import classes from "./EventSettings.module.css";
import axios from "redaxios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const EventSettings = () => {
  const history = useHistory();
  const [tixPrice, setTixPrice] = useState();
  const [ethPrice, setEthPrice] = useState();
  const [priceInHKD, setPriceInHKD] = useState(0);

  const currentUserId = useSelector((state) => {
    return state.users.userID;
  });

  const fetchData = async () => {
    const res = await axios.get(
      `https://api.cryptonator.com/api/ticker/eth-usd`
    );
    setEthPrice(res.data.ticker.price);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  // calculate Eth to HKD
  const handlePriceChange = async (event) => {
    const hkdPrice = await Math.ceil(event.target.value * ethPrice * 7.77);
    setPriceInHKD(hkdPrice);
    setTixPrice(event.target.value);
  };

  const submitPrice = async (event) => {
    event.preventDefault();
    let currentAddress = [];
    await axios
      .post(`${process.env.REACT_APP_SERVER}/api/findContractAddress`, {
        id: currentUserId,
      })
      .then((response) => {
        currentAddress.push(response.data.contractAddress);
      });

    let accounts = await web3.eth.getAccounts();

    await EventContract.methods
      .setPrice(currentAddress[0], 0, (tixPrice * Math.pow(10, 18)).toString())
      .send({ from: accounts[0] });
    history.push("/");
  };

  return (
    <div className={classes.generalContainer}>
      <Container>
        <Row>
          <Col>
            <img src={image} alt="Image" width="500px" />
          </Col>
          <Col>
            <div className={classes.formContainer}>
              <h6>
                <strong>(Step 3) Set Event Ticket Price</strong>
                <div id={classes.priceConverter}>
                  <p>Price in HKD${priceInHKD}</p>
                </div>
              </h6>
              <Form onSubmit={submitPrice} className={classes.form}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Ticket Price in Eth</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Set Ticket Price"
                    onChange={handlePriceChange}
                  />
                </Form.Group>
                {currentUserId ? (
                  <button
                    variant="primary"
                    type="submit"
                    className={classes.submitBtn}
                  >
                    Set Price
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
