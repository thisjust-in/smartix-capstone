import EventCardStyle from "./EventCard.module.css";

const OneCard = ({ hostName, eventCount, eventPic }) => {
  return (
    <div
      className={EventCardStyle.background}
      style={{
        backgroundImage: `url(${eventPic})`,
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
