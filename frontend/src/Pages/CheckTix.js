import React, { useState } from "react";
import axios from "redaxios";
import EventContract from "../EventContract";
import { useEffect } from "react";

function CheckTix() {
  let event_id = window.location.pathname.split("/")[2];
  let address = window.location.pathname.split("/")[3];
  const [pass, setPass] = useState("");

  async function checkFromBlock() {
    let eventDetails = await axios.get(
      `${process.env.REACT_APP_SERVER}/event/${event_id}`
    );
    let qty = await EventContract.methods
      .TixQtyPerUser(eventDetails.data[0].contractAddress, address, 0)
      .call();
    setPass(qty);
  }

  useEffect(() => {
    checkFromBlock();
  }, []);

  return <div>{pass > 0 ? "OK" : "Not OK"}</div>;
}

export default CheckTix;
