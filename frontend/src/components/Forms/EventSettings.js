import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import image from "../assets/Asset-1.jpg";
import web3 from "../../web3";
import EventContract from "../../EventContract";
import classes from "./EventSettings.module.css";
import axios from "redaxios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getContractAddress } from "../../redux/CheckUserSlice";
// import { useHistory } from "react-router-dom";

export const EventSettings = () => {
  const [tixPrice, setTixPrice] = useState();
  const [ethPrice, setEthPrice] = useState();
  const [priceInHKD, setPriceInHKD] = useState(0);
  //   console.log(EventContract);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContractAddress());
  }, []);

  const contractAddress = useSelector((state) => {
    console.log(state);
  });

  const fetchData = async () => {
    const res = await axios.get(
      `https://api.cryptonator.com/api/ticker/eth-usd`
    );
    setEthPrice(res.data.ticker.price);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePriceChange = async (event) => {
    const hkdPrice = await Math.ceil(event.target.value * ethPrice * 7.77);
    setPriceInHKD(hkdPrice);
  };

  const submitPrice = async (event) => {
    event.preventDefault();
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
                <strong>(Step 2) Update Event Ticket Price)</strong>
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
                    type="Number"
                    value={tixPrice}
                    placeholder="Set Ticket Price"
                    onChange={handlePriceChange}
                  />
                </Form.Group>
                <button
                  variant="primary"
                  type="submit"
                  className={classes.submitBtn}
                >
                  Set Price
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
