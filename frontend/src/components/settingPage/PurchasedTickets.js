import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import YourEventsCss from "./storedEvents/YourEvents.module.css";
import StoredEvent from "./storedEvents/StoredEvent";
import web3 from "../../web3";

const PurchasedTickets = () => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    // getUserAddress();
  }, []);

  let id = useSelector((state) => {
    return state.users.userID;
  });

  if (typeof id === "number") {
    console.log("id", id);
  }

  //   async function getUserAddress() {
  //     let user_address = await web3.eth.getAccounts();
  //     setUserId(user_address[0].toLowerCase());
  //   }

  //   console.log("userId", userId);

  return (
    <div>
      <div>
        <StoredEvent />
      </div>
    </div>
  );
};

export default PurchasedTickets;
