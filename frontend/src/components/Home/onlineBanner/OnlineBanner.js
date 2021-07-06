import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import OnlineBannerCss from "./OnlineBanner.module.css";

const OnlineBanner = () => {
  const onlineEvent = useSelector((state) => {
    return state.eventCard.eventHost;
  });
  let ranArr = [];
  if (onlineEvent[0]) {
    for (let i = 0; ranArr.length < 3; i++) {
      let ranNum = Math.floor(Math.random() * onlineEvent.length);
      if (!ranArr.includes(ranNum)) {
        ranArr.push(ranNum);
      }
    }
    console.log("asdasdasd", onlineEvent[ranArr[0]].eventPhoto.pc1);
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
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            {onlineEvent[ranArr[0]] ? (
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
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>{" "}
      </div>
    </div>
  );
};

export default OnlineBanner;
