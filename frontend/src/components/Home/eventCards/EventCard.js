import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import OneCard from "./OneCard";
import EventCardCSS from "./EventCard.module.css";
import { Link } from "react-router-dom";

const EventCardBackground = () => {
  const host = useSelector((state) => {
    return state.eventCard.eventCount;
  });

  let cards = [];
  for (const [hostName, event] of Object.entries(host)) {
    cards.push(
      <Link to={`/event/${event.id}`}>
        <Col key={event.id} md={4} id={EventCardCSS.col}>
          <OneCard
            hostName={hostName}
            eventCount={event.count}
            eventPic={event.pic}
            key={event.id}
          />
        </Col>
      </Link>
    );
  }

  return (
    <div>
      <div>
        <Container>
          <h3 className="mt-5" id={EventCardCSS.string}>
            Browse by Host
          </h3>
          <Row id={EventCardCSS.row}>{cards}</Row>
        </Container>
      </div>
    </div>
  );
};

export default EventCardBackground;
