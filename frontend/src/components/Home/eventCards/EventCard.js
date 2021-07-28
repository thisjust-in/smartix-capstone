import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import OneCard from "./OneCard";
import EventCardCSS from "./EventCard.module.css";
import axios from "redaxios";
import { useHistory } from "react-router";
import { getEventDetails } from "../../../redux/EventListSlice";

const EventCardBackground = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const host = useSelector((state) => {
    return state.eventCard.eventCount;
  });

  async function redirect(name) {
    let searchResult = {
      name: name,
    };
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/getlist`,
        searchResult
      );
      dispatch(getEventDetails(response.data));
      history.push("/list");
    } catch (err) {
      console.log(err);
    }
  }

  let cards = [];
  for (const [hostName, event] of Object.entries(host)) {
    cards.push(
      <div key={event.id} onClick={() => redirect(hostName)}>
        <Col key={event.id} md={4} id={EventCardCSS.col}>
          <OneCard
            hostName={hostName}
            eventCount={event.count}
            eventPic={event.pic}
            key={event.id}
          />
        </Col>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Container>
          <h3 className="mt-5" id={EventCardCSS.string}>
            Browse by Host
          </h3>
          <Row id={EventCardCSS.row}>{cards}</Row>
        </Container>
      </div>
    </div>
  );
};

export default EventCardBackground;
