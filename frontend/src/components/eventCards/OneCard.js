import EventCardStyle from "./EventCard.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventHostThunk } from "../../redux/EventCardSlice";
import { Col } from "react-bootstrap";
const OneCard = ({ hostName, eventCount, eventPic }) => {
  return (
    <div
      className={EventCardStyle.background}
      style={{
        backgroundImage: `url(${eventPic.pc1})`,
      }}
    >
      <div className={EventCardStyle.information}>
        <h2 className={EventCardStyle.text}>{hostName}</h2>
        <p className={(EventCardStyle.text, EventCardStyle.event)}>
          {eventCount} event{eventCount > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default OneCard;
