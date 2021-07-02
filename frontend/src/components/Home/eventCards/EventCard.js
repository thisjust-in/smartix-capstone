import EventCardStyle from "./EventCard.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventHostThunk } from "../../redux/EventCardSlice";
import { Container, Row, Col } from "react-bootstrap";
import OneCard from "./OneCard";

const EventCardBackground = () => {
  const dispatch = useDispatch();
  const host = useSelector((state) => {
    return state.eventCard.eventCount;
  });
  useEffect(() => {
    dispatch(getEventHostThunk());
  }, []);
  console.log(host);

  let cards = [];
  for (const [hostName, event] of Object.entries(host)) {
    cards.push(
      <Col md={4}>
        <OneCard
          hostName={hostName}
          eventCount={event.count}
          eventPic={event.pic}
        />
      </Col>
    );
  }

  return (
    <div>
      <div>
        <Container>
          <Row>{cards}</Row>
        </Container>
      </div>
    </div>
  );
};

export default EventCardBackground;
