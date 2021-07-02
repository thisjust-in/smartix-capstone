import EventCardStyle from "./EventCard.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventHostThunk } from "../../redux/EventCardSlice";
import { Col } from "react-bootstrap";
const OneCard = (props) => {
  return (
    <div className={EventCardStyle.background}>
      <div className={EventCardStyle.information}>
        <h2 className={EventCardStyle.text}>{props.objectKey}</h2>

        <p className={(EventCardStyle.text, EventCardStyle.event)}>
          {props.objectValue} event{props.objectValue > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default OneCard;
