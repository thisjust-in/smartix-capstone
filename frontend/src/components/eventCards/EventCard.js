import EventCardStyle from "./EventCard.module.css";
import { useState, useEffect } from "react";

const EventCardBackground = () => {
  const [eventHost, setEventHost] = useState("");

  return (
    <div className={EventCardStyle.background}>
      <div className={EventCardStyle.information}>
        <h2 className={EventCardStyle.text}>Jay Chou</h2>
        <p className={(EventCardStyle.text, EventCardStyle.event)}>10 events</p>
      </div>
    </div>
  );
};

export default EventCardBackground;
