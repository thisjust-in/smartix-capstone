import YourEventsCss from "./YourEvents.module.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

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
  button,
  theUrl,
  isOnline,
}) => {
  console.log("event", isOnline);
  return (
    <div className={YourEventsCss.eventCard}>
      <img className={YourEventsCss.image} src={eventPhoto} alt="" />
      <Container className={YourEventsCss.container}>
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
      </Container>
      <div className={YourEventsCss.forButtonDiv}>
        <div className={YourEventsCss.buttonDiv}>
          <Link to={`/${theUrl}/${eventID}`}>
            <button className={YourEventsCss.button}>{button}</button>
          </Link>
        </div>
        <div className={YourEventsCss.buttonDiv}>
          {!isOnline && (
            <Link to={`/etix/${eventID}`}>
              <button className={YourEventsCss.button}>Ticket</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoredEvent;
