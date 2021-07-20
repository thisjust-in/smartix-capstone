import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import YourEventsCss from "./YourEvents.module.css";

const YourEvents = () => {
  const userID = useSelector((state) => {
    return state.users.userID;
  });
  const state = useSelector((state) => {
    console.log(state.eventCard.eventHost);
  });

  return (
    <div>
      <h4>Your Events</h4>
      <div>{"Hello"}</div>
    </div>
  );
};

export default YourEvents;
