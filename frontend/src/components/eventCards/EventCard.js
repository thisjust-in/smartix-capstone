import EventCardStyle from "./EventCard.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventHostThunk } from "../../redux/EventCardSlice";
import { Container, Row, Col } from "react-bootstrap";
import OneCard from "./OneCard";

const EventCardBackground = () => {
  const dispatch = useDispatch();
  const host = useSelector((state) => {
    // console.log(state.eventCard.eventCount);
    return state.eventCard.eventCount;
  });

  useEffect(() => {
    dispatch(getEventHostThunk());
  }, []);

  var cards = [];
  for (const [key, value] of Object.entries(host)) {
    cards.push(
      <Col md={4}>
        <OneCard objectKey={key} objectValue={value} />
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
