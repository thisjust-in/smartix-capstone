import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import YourEventsCss from "./storedEvents/YourEvents.module.css";
import StoredEvent from "./storedEvents/StoredEvent";

let allEventWithDateFormatter;
const YourEvents = () => {
  const userID = useSelector((state) => {
    return state.users.userID;
  });

  const allEvent = useSelector((state) => {
    if (typeof userID === "number") {
      let theEvents = state.eventCard.eventHost.filter((event) => {
        return event.users_id === userID;
      });
      return theEvents;
    }
  });

  if (allEvent) {
    allEventWithDateFormatter = allEvent.map((event) => {
      return {
        ...event,
        eventDate: new Date(event.eventDate).toLocaleDateString(),
      };
    });
  }

  return (
    <div className={YourEventsCss.div}>
      {allEventWithDateFormatter ? (
        allEventWithDateFormatter.map((event, index) => (
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
            />
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default YourEvents;
