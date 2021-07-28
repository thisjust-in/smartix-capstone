import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import StoredEvent from "./storedEvents/StoredEvent";
import axios from "redaxios";

let newEventDetails;
const PurchasedTickets = () => {
  const [purchasedEvent, setPurchasedEvent] = useState(null);

  let id = useSelector((state) => {
    return state.users.userID;
  });

  useEffect(() => {
    async function fetch() {
      if (typeof id === "number") {
        let allPurchasedEvent = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/getallpurchasedevent`,
          {
            userId: id,
          }
        );
        setPurchasedEvent(allPurchasedEvent.data);
      }
    }
    fetch();
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

  if (eventDetails) {
    newEventDetails = eventDetails.map((event) => {
      return {
        ...event,
        eventDate: new Date(event.eventDate).toLocaleDateString(),
      };
    });
  }
  console.log(purchasedEvent);
  console.log(eventDetails);
  console.log(newEventDetails);

  return (
    <div>
      {newEventDetails ? (
        newEventDetails.map((event, index) => (
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
        <div>
          <h2 className="mt-5">You have no tickets</h2>
        </div>
      )}
    </div>
  );
};

export default PurchasedTickets;
