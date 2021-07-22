import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEventThunk } from "../../redux/EventCardSlice";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "./Cards";
export default function AllEvents() {
  const dispatch = useDispatch();
  const events = useSelector((state) => {
    return state.eventCard.allEvent[0];
  });

  useEffect(() => {
    dispatch(getAllEventThunk());
  }, [dispatch]);
  console.log(events);
  // let onlineEvents = [];
  // let offlineEvents = [];

  // if (events) {
  //   onlineEvents = events.filter((event) => {
  //     return event.isOnline;
  //   });
  //   offlineEvents = events.filter((event) => {
  //     return !event.isOnline;
  //   });
  // }
  // console.log(onlineEvents);
  // console.log(offlineEvents);

  return (
    <div>
      <Container>
        {/* <HeadingOne title={"All current Eve"} /> */}
        <Cards events={events} />
      </Container>
    </div>
  );
}
