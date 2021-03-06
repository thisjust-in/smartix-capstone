import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import OnlineBannerCss from "./OnlineBanner.module.css";
import React from "react";
import { Spinner } from "reactstrap";

const OnlineBanner = () => {
  const onlineEvent = useSelector((state) => {
    return state.eventCard.eventHost;
  });

  let ranArr = [];
  if (onlineEvent.length >= 3) {
    for (let i = 0; ranArr.length < 3; i++) {
      let ranNum = Math.floor(Math.random() * onlineEvent.length + 1);
      if (!ranArr.includes(ranNum)) {
        ranArr.push(ranNum);
      }
    }
  }
  if (onlineEvent.length < 3) {
    for (let i = 0; ranArr.length < onlineEvent.length; i++) {
      let ranNum = Math.floor(Math.random() * onlineEvent.length + 1);
      if (!ranArr.includes(ranNum)) {
        ranArr.push(ranNum);
      }
    }
  }

  return (
    <div className={OnlineBannerCss.displayFlex}>
      <div className={OnlineBannerCss.background}>
        <h3 className="mt-5">Upcoming Events</h3>
        <Carousel>
          {onlineEvent[ranArr[0]] && (
            <Carousel.Item>
              {onlineEvent[ranArr[0]] ? (
                <img
                  className="d-block w-100"
                  id={OnlineBannerCss.theImage}
                  src={onlineEvent[ranArr[0]].eventPhoto}
                  alt="First slide"
                />
              ) : (
                <Spinner color="dark" />
              )}
              <Carousel.Caption>
                <div className={OnlineBannerCss.information}>
                  {onlineEvent[ranArr[0]] ? (
                    <h3>{onlineEvent[ranArr[0]].eventName}</h3>
                  ) : (
                    <Spinner color="dark" />
                  )}
                  {onlineEvent[ranArr[0]] ? (
                    <p>{onlineEvent[ranArr[0]].eventDescription}</p>
                  ) : (
                    <Spinner color="dark" />
                  )}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {onlineEvent[ranArr[1]] && (
            <Carousel.Item>
              {onlineEvent[ranArr[1]] ? (
                <img
                  className="d-block w-100"
                  id={OnlineBannerCss.theImage}
                  src={onlineEvent[ranArr[1]].eventPhoto}
                  alt="First slide"
                />
              ) : (
                <Spinner color="dark" />
              )}

              <Carousel.Caption>
                <div className={OnlineBannerCss.information}>
                  {onlineEvent[ranArr[1]] ? (
                    <h3>{onlineEvent[ranArr[1]].eventName}</h3>
                  ) : (
                    <Spinner color="dark" />
                  )}
                  {onlineEvent[ranArr[1]] ? (
                    <p>{onlineEvent[ranArr[1]].eventDescription}</p>
                  ) : (
                    <Spinner color="dark" />
                  )}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {onlineEvent[ranArr[2]] && (
            <Carousel.Item>
              {onlineEvent[ranArr[2]] ? (
                <img
                  className="d-block w-100"
                  id={OnlineBannerCss.theImage}
                  src={onlineEvent[ranArr[2]].eventPhoto}
                  alt="First slide"
                />
              ) : (
                <Spinner color="dark" />
              )}

              <Carousel.Caption>
                <div className={OnlineBannerCss.information}>
                  {onlineEvent[ranArr[2]] ? (
                    <h3>{onlineEvent[ranArr[2]].eventName}</h3>
                  ) : (
                    <Spinner color="dark" />
                  )}
                  {onlineEvent[ranArr[2]] ? (
                    <p>{onlineEvent[ranArr[2]].eventDescription}</p>
                  ) : (
                    <Spinner color="dark" />
                  )}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>{" "}
      </div>
    </div>
  );
};

export default OnlineBanner;
