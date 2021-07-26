import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import web3 from "../../web3";
import { useSelector } from "react-redux";
import YourEventsCss from "./storedEvents/YourEvents.module.css";
import StoredEvent from "./storedEvents/StoredEvent";
import { Spinner } from "reactstrap";

let allEventWithDateFormatter;
const YourEvents = () => {
  const [isLogin, setIsLogin] = useState(null);
  const [notLogin, setNotLogin] = useState(null);
  const [checkedLogin, setCheckedLogin] = useState(false);

  async function getUserAddress() {
    let user_address = await web3.eth.getAccounts();
    setCheckedLogin(true);
    setIsLogin(user_address[0]);
  }

  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    if (isLogin === undefined) {
      setNotLogin(true);
    }

    if (isLogin === Array) {
      setIsLogin(true);
    }
  }, [isLogin]);

  const userID = useSelector((state) => {
    return state.users.userID;
  });

  const allEvent = useSelector((state) => {
    if (typeof userID === "number") {
      let theEvents = state.eventCard.eventHost.filter((event) => {
        return event.users_id === userID;
      });
      return theEvents;
    }
  });

  if (allEvent) {
    allEventWithDateFormatter = allEvent.map((event) => {
      return {
        ...event,
        eventDate: new Date(event.eventDate).toLocaleDateString(),
      };
    });
  }

  return (
    <div>
      {checkedLogin ? (
        <div className={YourEventsCss.div}>
          {allEventWithDateFormatter ? (
            allEventWithDateFormatter.map((event, index) => (
              <div key={index}>
                <StoredEvent
                  eventID={event.id}
                  contractAddress={event.contractAddress}
                  eventName={event.eventName}
                  eventLocation={event.eventLocation}
                  eventPhoto={event.eventPhoto}
                  eventDate={event.eventDate}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  theEvent={event}
                  button={"Start Broadcasting"}
                  theUrl={"streamer"}
                  isOnline={true}
                />
              </div>
            ))
          ) : (
            <div>
              <div>{isLogin && <div>Loading</div>} </div>
              <div>{notLogin && <Redirect to="/" />} </div>
            </div>
          )}
        </div>
      ) : (
        <Spinner color="dark" />
      )}
    </div>
  );
};

export default YourEvents;
