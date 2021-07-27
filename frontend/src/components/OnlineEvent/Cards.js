import { Card, Row, Col, Badge } from "react-bootstrap";
import classes from "./Cards.module.css";
import { Link } from "react-router-dom";
const Cards = (props) => {
  let data = props.events;
  return (
    <Row className={classes.cardRow}>
      {data &&
        data.map((events, index) => {
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
                        <p className={classes.venue}>{events.venue}</p>
                      </Card.Title>
                      <div>
                        <Badge className={classes.pill} pill bg="success">
                          {events.eventType}
                        </Badge>
                      </div>
                    </div>
                    <Card.Text className={classes.eventDescription}>
                      {events.eventDescription.substring(0, 70)}...
                    </Card.Text>
                    <Link
                      className={classes.cardBtn}
                      to={`/event/${events.id}`}
                    >
                      Purchase Tickets
                    </Link>
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
