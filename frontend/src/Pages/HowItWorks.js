import React from "react";
import styles from "./HowItWorks.module.css";
import Header from "../components/Main-Components/Header";
import { Col, Row, Container } from "reactstrap";

function HowItWorks() {
  return (
    <div>
      <Header
        backgroundimage={"./howitworks.jpg"}
        content={
          <div className="container">
            <h1 style={{ color: "white" }}>Smartix makes ticketing smarter</h1>
          </div>
        }
      />
      <div className={styles.textcontainer}>
        <img
          alt=""
          src="https://res.cloudinary.com/dnq92mpxr/image/upload/v1627288856/How-it-works-smartix_pbakoc.png"
        />
      </div>
    </div>
  );
}

export default HowItWorks;
