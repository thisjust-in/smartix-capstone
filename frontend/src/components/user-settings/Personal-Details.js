import classes from "./Personal-detail.module.css";

const PersonalInfo = (props) => {
  return (
    <>
      <div className={classes.flexContainer}>
        <div>
          <img
            src={
              props.profilePic
                ? props.profilePic
                : "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627279513/profile-pic_ovouzp.png"
            }
            alt="Profile Picture"
            className={classes.profilePicture}
          />
        </div>
        <div className={classes.userInfo}>
          <h6>
            <strong>Username:</strong>
            &nbsp; {props.username}
          </h6>
          <h6>
            <strong>Email:</strong>&nbsp; {props.email}{" "}
          </h6>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
