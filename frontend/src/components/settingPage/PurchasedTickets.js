import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import YourEventsCss from "./storedEvents/YourEvents.module.css";
import StoredEvent from "./storedEvents/StoredEvent";
import web3 from "../../web3";
import axios from "redaxios";

const PurchasedTickets = () => {
  const [purchasedEvent, setPurchasedEvent] = useState(null);

  let id = useSelector((state) => {
    return state.users.userID;
  });

  useEffect(async () => {
    if (typeof id === "number") {
      let allPurchasedEvent = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/getallpurchasedevent`,
        {
          userId: id,
        }
      );
      console.log("allPurchasedEvent", allPurchasedEvent.data);
      setPurchasedEvent(allPurchasedEvent.data);
    }
  }, [id]);

  const eventDetails = useSelector((state) => {
    if (purchasedEvent) {
      let allEvent = purchasedEvent.map((data) => {
        return state.eventCard.eventHost.filter((event) => {
          return event.id === data.event_id;
        })[0];
      });
      return allEvent;
    }
  });

  console.log(eventDetails);

  return (
    <div>
      {eventDetails ? (
        eventDetails.map((event, index) => (
          <div key={index}>
            <StoredEvent
              eventID={event.id}
              contractAddress={event.contractAddress}
              eventName={event.eventName}
              eventLocation={event.eventLocation}
              eventPhoto={event.eventPhoto}
              eventDate={event.eventDate}
              startTime={event.startTime}
              endTime={event.endTime}
              theEvent={event}
              button={"Join Event"}
              theUrl={"viewer"}
              isOnline={event.isOnline}
            />
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default PurchasedTickets;
