import React from "react";
import LpHeading from "../../components/OnlineEvent/LpHeading";
import LpImage from "../../components/OnlineEvent/LpImage";
import { Container, Row, Col } from "react-bootstrap";
import Classes from "./OnlineEvent.module.css";
import AllEvents from "../../components/OnlineEvent/AllEvents";
function OnlineEvents() {
  const title = "All Events";
  const text = "Check out all our unique events";
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col sm={3}>
            <LpHeading title={title} text={text} className={Classes.heading} />
          </Col>
          <Col sm={9}>
            <LpImage />
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <div className={Classes.eventsDiv}>
        <AllEvents />
      </div>
    </div>
  );
}

export default OnlineEvents;
