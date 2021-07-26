import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1 style={{ color: "white" }}>Smartix</h1>
        <p style={{ color: "white" }}>Get your ticket now</p>
      </div>
      <Container className={styles.linkscontainer}>
        <Row>
          <Col sm="3" style={{ padding: "10px" }}>
            <Link to="/" style={{ color: "white" }}>
              Home
            </Link>
          </Col>
          <Col sm="3" style={{ padding: "10px" }}>
            <Link to="/online-events" style={{ color: "white" }}>
              Events
            </Link>
          </Col>
          <Col sm="3" style={{ padding: "10px" }}>
            <Link to="/howitworks" style={{ color: "white" }}>
              How It Works
            </Link>
          </Col>
          <Col sm="3" style={{ padding: "10px" }}>
            <Link to="/create-event" style={{ color: "white" }}>
              Host Event
            </Link>
          </Col>
        </Row>
      </Container>
      <div className={styles.rights}>
        <p style={{ color: "white", paddingTop: "1rem" }}>
          @{new Date().getFullYear()} Smartix. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
