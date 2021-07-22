import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEventThunk } from "../../redux/EventCardSlice";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import classes from "./Cards.module.css";
import Cards from "./Cards";
export default function AllEvents() {
  const [event, setEvent] = useState();
  const dispatch = useDispatch();
  const events = useSelector((state) => {
    return state.eventCard.allEvent[0];
  });
  console.log(events);

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
        <div className={classes.filterDiv}>
          <ButtonGroup aria-label="Basic example">
            <Button className={classes.filterBtn} variant="secondary">
              Entertainment
            </Button>
            <Button className={classes.filterBtn} variant="secondary">
              Cooking
            </Button>
            <Button className={classes.filterBtn} s variant="secondary">
              Seminar
            </Button>
            <Button className={classes.filterBtn} s variant="secondary">
              Fitness
            </Button>
            <Button className={classes.filterBtn} s variant="secondary">
              Educational
            </Button>
            <Button className={classes.filterBtn} s variant="secondary">
              Well-being
            </Button>
            <Button className={classes.filterBtn} s variant="secondary">
              Hobbies
            </Button>
          </ButtonGroup>
        </div>
        <h5>All events</h5>
        <Cards events={events} />
      </Container>
    </div>
  );
}
