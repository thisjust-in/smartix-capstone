import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import OneCard from "./OneCard";
import EventCardCSS from "./EventCard.module.css";

const EventCardBackground = () => {
  const host = useSelector((state) => {
    console.log("state", state);
    return state.eventCard.eventCount;
  });

  let cards = [];
  for (const [hostName, event] of Object.entries(host)) {
    cards.push(
      <Col md={4} id={EventCardCSS.col}>
        <OneCard
          hostName={hostName}
          eventCount={event.count}
          eventPic={event.pic}
          key={event.id}
        />
      </Col>
    );
  }

  return (
    <div>
      <div>
        <Container>
          <Row id={EventCardCSS.row}>{cards}</Row>
        </Container>
      </div>
    </div>
  );
};

export default EventCardBackground;
