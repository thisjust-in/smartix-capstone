import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import classes from "./Cards.module.css";
import { secondaryButton } from "../Main-Components/SecondaryButton";
const Cards = (props) => {
  let data = props.events;
  return (
    <Row>
      {data &&
        data.map((events, index) => {
          console.log("eeh", events);
          return (
            <Col>
              <div className={classes.cardWrapper} key={index}>
                <Card className={classes.cardDiv}>
                  <Card.Img variant="top" src={events.eventPhoto} />
                  <Card.Body>
                    <div className={classes.flexContainer}>
                      <Card.Title>
                        <h6 className={classes.eventName}>
                          {events.eventName}
                        </h6>
                      </Card.Title>
                      <div>
                        <Badge className={classes.pill} pill bg="success">
                          {events.eventType}
                        </Badge>
                      </div>
                    </div>

                    <Card.Text>{events.eventDescription}</Card.Text>
                    <p>{events.venue}</p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
    </Row>
  );
};

export default Cards;
