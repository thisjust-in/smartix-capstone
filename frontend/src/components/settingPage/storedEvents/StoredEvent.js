import YourEventsCss from "./YourEvents.module.css";
import { Link } from "react-router-dom";

const StoredEvent = ({
  eventName,
  eventLocation,
  eventDate,
  startTime,
  endTime,
  eventPhoto,
  eventID,
  contractAddress,
  theEvent,
}) => {
  return (
    <div className={YourEventsCss.eventCard}>
      <img
        className={YourEventsCss.image}
        src={eventPhoto}
        alt="event cover photo"
      />
      <container className={YourEventsCss.container}>
        <h5 className={YourEventsCss.eventName}>{eventName}</h5>
        <div className={YourEventsCss.eventDescription}>
          <div className={YourEventsCss.eventDescriptionDetail}>
            Location: {eventLocation}
          </div>
          <div className={YourEventsCss.eventDescriptionDetail}>
            Event Date: {eventDate}
          </div>
          <div className={YourEventsCss.eventDescriptionDetail}>
            Start: {startTime}
          </div>
          <div className={YourEventsCss.eventDescriptionDetail}>
            End: {endTime}
          </div>
        </div>
      </container>
      <div className={YourEventsCss.buttonDiv}>
        <Link to={`/socket/${eventID}`}>
          <button className={YourEventsCss.button}>Start Broadcasting</button>
        </Link>
      </div>
    </div>
  );
};

export default StoredEvent;
