import classes from "./Personal-detail.module.css";

const PersonalInfo = (props) => {
  return (
    <>
      {/* <img
        src="https://avatars.githubusercontent.com/u/1309537?v=4"
        width="40px"
        alt="profilePic"
      /> */}
      <div className={classes.flexContainer}>
        <div>
          <img
            src={props.profilePic}
            alt="hello"
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
