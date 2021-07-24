import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEventThunk } from "../../redux/EventCardSlice";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import classes from "./Cards.module.css";
import Cards from "./Cards";
export default function AllEvents() {
  const dispatch = useDispatch();
  const info = useSelector((state) => {
    return state.eventCard.allEvent[0];
  });
  // console.log("infop", info);
  const [activity, setActivity] = useState(info);
  useEffect(() => {
    dispatch(getAllEventThunk());
    setActivity(info);
  }, [info]);
  // useEffect(() => {
  //   setActivity(info);
  //   console.log("USE EFFECT");
  // }, [info]);

  const handleAll = () => {
    setActivity(info);
  };

  const handleEntertainment = () => {
    let result = info.filter((each) => {
      return each.eventType == "entertainment";
    });
    setActivity(result);
  };

  const handleCooking = () => {
    let result = info.filter((each) => {
      return each.eventType == "cooking";
    });
    setActivity(result);
  };

  const handleSeminar = () => {
    let result = info.filter((each) => {
      return each.eventType == "seminar";
    });
    setActivity(result);
  };

  const handleEducational = () => {
    let result = info.filter((each) => {
      return each.eventType == "educational";
    });
    setActivity(result);
  };

  const handleFitness = () => {
    let result = info.filter((each) => {
      return each.eventType == "fitness";
    });
    setActivity(result);
  };

  const handleWellBeing = () => {
    let result = info.filter((each) => {
      return each.eventType == "well-being";
    });
    setActivity(result);
  };

  const handleHobbies = () => {
    let result = info.filter((each) => {
      return each.eventType == "hobbies";
    });
    setActivity(result);
  };
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
        <div className={classes.filterDiv}>
          <div>
            <Button
              onClick={handleAll}
              className={classes.filterBtn}
              variant="secondary"
            >
              All
            </Button>
            <Button
              onClick={handleEntertainment}
              className={classes.filterBtn}
              variant="secondary"
            >
              Entertainment
            </Button>
            <Button
              onClick={handleCooking}
              className={classes.filterBtn}
              variant="secondary"
            >
              Cooking
            </Button>
            <Button
              onClick={handleSeminar}
              className={classes.filterBtn}
              s
              variant="secondary"
            >
              Seminar
            </Button>
            <Button
              onClick={handleFitness}
              className={classes.filterBtn}
              s
              variant="secondary"
            >
              Fitness
            </Button>
            <Button
              onClick={handleEducational}
              className={classes.filterBtn}
              s
              variant="secondary"
            >
              Educational
            </Button>
            <Button
              onClick={handleWellBeing}
              className={classes.filterBtn}
              s
              variant="secondary"
            >
              Well-being
            </Button>
            <Button
              onClick={handleHobbies}
              className={classes.filterBtn}
              s
              variant="secondary"
            >
              Hobbies
            </Button>
          </div>
        </div>
        <h5>All events</h5>
        <Cards events={activity} />
      </Container>
    </div>
  );
}
