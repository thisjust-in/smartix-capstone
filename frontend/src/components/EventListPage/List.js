import React, { useEffect } from "react";
import { Col, Row, Container } from "reactstrap";
import styles from "./List.module.css";
import PrimaryBtn from "../Main-Components/PrimaryBtn";
import { useHistory } from "react-router-dom";

function List(props) {
  const history = useHistory();

  function redirect() {
    history.push(`/event/${props.id}`);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container style={{ backgroundColor: "#F4F4F4" }}>
      <Row className={styles.row}>
        <Col className={styles.column} md="3">
          <h5 className={styles.noMarginPadding} style={{ color: "#132BFF" }}>
            {props.date}
          </h5>
          <p className={styles.noMarginPadding} style={{ color: "#AFAFAF" }}>
            {props.time}
          </p>
        </Col>
        <Col className={styles.column} md="6">
          <div className={styles.wrapper}>
            <h3 className={styles.noMarginPadding}>{props.name}</h3>
            <h5 className={styles.noMarginPadding}>{props.location}</h5>
          </div>
        </Col>
        <Col className={styles.column} md="1">
          <h5 className={styles.noMarginPadding} style={{ color: "#132BFF" }}>
            {props.price}
          </h5>
        </Col>
        <Col className={styles.column} md="2">
          <PrimaryBtn text={"See Tickets"} click={redirect} />
        </Col>
      </Row>
    </Container>
  );
}

export default List;
