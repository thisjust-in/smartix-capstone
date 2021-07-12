import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import OnlineBannerCss from "./OnlineBanner.module.css";

const OnlineBanner = () => {
  const onlineEvent = useSelector((state) => {
    return state.eventCard.eventHost;
  });

  let ranArr = [];
  if (onlineEvent.length) {
    for (let i = 0; ranArr.length < onlineEvent.length || 3; i++) {
      let ranNum = Math.floor(Math.random() * onlineEvent.length);
      if (!ranArr.includes(ranNum)) {
        ranArr.push(ranNum);
      }
    }
    console.log(onlineEvent[ranArr[0]]);
  }

  return (
    <div className={OnlineBannerCss.displayFlex}>
      <div className={OnlineBannerCss.background}>
        <Carousel>
          <Carousel.Item>
            {onlineEvent[ranArr[0]] ? (
              <img
                className="d-block w-100"
                id={OnlineBannerCss.theImage}
                src={onlineEvent[ranArr[0]].eventPhoto.pc1}
                alt="First slide"
              />
            ) : (
              <div>Loading</div>
            )}
            <Carousel.Caption>
              <div className={OnlineBannerCss.information}>
                {onlineEvent[ranArr[0]] ? (
                  <h3>{onlineEvent[ranArr[0]].eventName}</h3>
                ) : (
                  <div>Loading</div>
                )}
                {onlineEvent[ranArr[0]] ? (
                  <p>{onlineEvent[ranArr[0]].eventDescription}</p>
                ) : (
                  <div>Loading</div>
                )}
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            {onlineEvent[ranArr[1]] ? (
              <img
                className="d-block w-100"
                id={OnlineBannerCss.theImage}
                src={onlineEvent[ranArr[1]].eventPhoto.pc1}
                alt="First slide"
              />
            ) : (
              <div>Loading</div>
            )}

            <Carousel.Caption>
              <div className={OnlineBannerCss.information}>
                {onlineEvent[ranArr[1]] ? (
                  <h3>{onlineEvent[ranArr[1]].eventName}</h3>
                ) : (
                  <div>Loading</div>
                )}
                {onlineEvent[ranArr[1]] ? (
                  <p>{onlineEvent[ranArr[1]].eventDescription}</p>
                ) : (
                  <div>Loading</div>
                )}
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            {onlineEvent[ranArr[0]] ? (
              <img
                className="d-block w-100"
                id={OnlineBannerCss.theImage}
                src={onlineEvent[ranArr[2]].eventPhoto.pc1}
                alt="First slide"
              />
            ) : (
              <div>Loading</div>
            )}

            <Carousel.Caption>
              <div className={OnlineBannerCss.information}>
                {onlineEvent[ranArr[2]] ? (
                  <h3>{onlineEvent[ranArr[2]].eventName}</h3>
                ) : (
                  <div>Loading</div>
                )}
                {onlineEvent[ranArr[2]] ? (
                  <p>{onlineEvent[ranArr[2]].eventDescription}</p>
                ) : (
                  <div>Loading</div>
                )}
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>{" "}
      </div>
    </div>
  );
};

export default OnlineBanner;
