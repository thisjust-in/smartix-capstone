import EventCardStyle from "./EventCard.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventHostThunk } from "../../redux/EventCardSlice";

const EventCardBackground = () => {
  const dispatch = useDispatch();
  const host = useSelector((state) => {
    return state.eventCard;
  });

  if (host.eventHost) {
    host.eventHost.map((data) => {
      console.log(data);
    });
  }

  useEffect(() => {
    dispatch(getEventHostThunk());
  }, []);

  return (
    <div>
      {host.eventHost &&
        host.eventHost.map((data) => {
          return (
            <div key={data.id} className={EventCardStyle.background}>
              <div className={EventCardStyle.information}>
                <h2 className={EventCardStyle.text}>{data.name}</h2>
                <p className={(EventCardStyle.text, EventCardStyle.event)}>
                  10 events
                </p>
              </div>
            </div>
          );
        })}
    </div>
    // <div className={EventCardStyle.background}>

    //   <div className={EventCardStyle.information}>
    //     {host ? (
    //       {host.eventHost.map((theHost)=>{
    //         <h2 className={EventCardStyle.text}>{theHost.name}</h2>
    //       })}
    //     ) : (
    //       <h2 className={EventCardStyle.text}> Loading </h2>
    //     )}
    //     <p className={(EventCardStyle.text, EventCardStyle.event)}>10 events</p>
    //   </div>
    // </div>

    // {
    //   host.eventHost.map((data) => {
    //     console.log(data);
    //   })
    // }

    // <div>
    //   {demo.map((obj) => {
    //     return <div>{obj.name}</div>;
    //   })}
    // </div>
  );
};

export default EventCardBackground;
