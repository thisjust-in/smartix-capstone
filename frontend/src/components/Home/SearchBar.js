import React, { useState } from "react";
import { Container, Row, Col, Label, Input } from "reactstrap";
import styles from "./SearchBar.module.css";
import axios from "redaxios";
import { useDispatch } from "react-redux";
import { getEventDetails } from "../../redux/EventListSlice";
import { useHistory } from "react-router-dom";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);
  const [name, setName] = useState(null);

  function getLocation(e) {
    setLocation(e.target.value);
  }
  console.log("hello");
  function getDate(e) {
    setDate(e.target.value);
  }
  function getName(e) {
    setName(e.target.value);
  }
  async function search(e) {
    e.preventDefault();
    let searchResult = {
      location: location,
      date: date,
      name: name,
    };
    try {
      let response = await axios.post(
        "http://localhost:8080/api/getlist",
        searchResult
      );
      dispatch(getEventDetails(response.data));
      history.push("/list");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <h1 style={{ color: "white", paddingBottom: "2rem" }}>
        The World's Best Events
      </h1>
      <Container style={{ backgroundColor: "#F2F2F2", borderRadius: "10px" }}>
        <Row>
          <Col md="3" className={styles.column}>
            <Label>City</Label>
            <Input
              onChange={getLocation}
              type="text"
              placeholder="Search by City"
              style={{ backgroundColor: "#E0E0E0", borderRadius: "5px" }}
            />
            <i
              style={{ position: "absolute", top: "67px", right: "30px" }}
              className="fas fa-map-marker-alt"
            ></i>
          </Col>
          <Col md="3" className={styles.column}>
            <Label>Find by Date</Label>
            <Input
              onChange={getDate}
              type="date"
              style={{ backgroundColor: "#E0E0E0", borderRadius: "5px" }}
            />
          </Col>
          <Col md="4" className={styles.column}>
            <Label>Host</Label>
            <Input
              onChange={getName}
              type="text"
              placeholder="Search by Host Name"
              style={{ backgroundColor: "#E0E0E0", borderRadius: "5px" }}
            />
          </Col>
          <Col md="1" className={styles.column}>
            <button onClick={search} className={styles.button}>
              Search
            </button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SearchBar;
