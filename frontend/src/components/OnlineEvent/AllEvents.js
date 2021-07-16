import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEventThunk } from "../../redux/EventCardSlice";
import { Container, Row, Col } from "react-bootstrap";

export default function AllEvents() {
  const dispatch = useDispatch();
  const events = useSelector((state) => {
    return state.eventCard.allEvent[0];
  });

  useEffect(() => {
    dispatch(getAllEventThunk());
  }, [dispatch]);

  let onlineEvents = [];
  let offlineEvents = [];

  if (events) {
    onlineEvents = events.filter((event) => {
      return event.isOnline;
    });
    offlineEvents = events.filter((event) => {
      return !event.isOnline;
    });
  }
  console.log(onlineEvents);
  console.log(offlineEvents);

  return (
    <div>
      <Container>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </div>
  );
}
