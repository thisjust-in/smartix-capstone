import React, { useState } from "react";
import axios from "redaxios";
import EventContract from "../EventContract";
import { useEffect } from "react";
import styles from "./CheckTix.module.css";
import expire from "../components/assets/expired.png";
import ok from "../components/assets/OK.png";
import sorry from "../components/assets/sorry.png";

function CheckTix() {
  const [pass, setPass] = useState("");
  useEffect(() => {
    let event_id = window.location.pathname.split("/")[2];
    let address = window.location.pathname.split("/")[3];
    async function checkFromBlock() {
      let eventDetails = await axios.get(
        `${process.env.REACT_APP_SERVER}/event/${event_id}`
      );
      let qty = await EventContract.methods
        .TixQtyPerUser(eventDetails.data[0].contractAddress, address, 0)
        .call();
      setPass(qty);
    }

    checkFromBlock();
  }, []);

  let timestamp = window.location.pathname.split("/")[4];

  if (Date.now() - timestamp > 30000) {
    return (
      <div className={styles.textcontainer}>
        <img alt="logo" src={expire} className={styles.logo}></img>
        <h1>The QR code has expired,</h1>
        <h1>please refresh your Smartix.</h1>
      </div>
    );
  } else {
    return (
      <div>
        {pass > 0 ? (
          <div className={styles.textcontainer}>
            <img alt="logo" src={ok} className={styles.logo}></img>
            <h1>Welcome! You make it!</h1>
          </div>
        ) : (
          <div className={styles.textcontainer}>
            <img alt="logo" src={sorry} className={styles.logo}></img>
            <h1>Sorry, you ticket is not valid.</h1>
          </div>
        )}
      </div>
    );
  }
}

export default CheckTix;
