import { NavDropdown } from "react-bootstrap";
import React, { useEffect } from "react";
import { checkWalletIDThunk } from "../../redux/CheckUserSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SecondaryButton } from "./SecondaryButton";
import classes from "./LoggedInNav.module.css";
import { Link } from "react-router-dom";

export default function LoggedInNav() {
  const dispatch = useDispatch();
  const buttonName = "Create event";
  const pic = useSelector((state) => {
    if (state.users.profilepic) {
      return state.users.profilepic;
    } else {
      return "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627279513/profile-pic_ovouzp.png";
    }
  });

  useEffect(() => {
    dispatch(checkWalletIDThunk());
  }, [dispatch]);

  return (
    <div className={classes.rightContainer}>
      <Link to="/create-event">
        <SecondaryButton name={buttonName} />
      </Link>
      <NavDropdown
        title={
          pic ? (
            <img
              src={pic}
              className={classes.profilePicture}
              width="40px"
              alt="avatars"
            />
          ) : (
            <img
              src="https://res.cloudinary.com/dnq92mpxr/image/upload/v1627279513/profile-pic_ovouzp.png"
              className={classes.profilePicture}
              width="40px"
              alt="avatars"
            />
          )
        }
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item className="text-dark">
          <Link to="/user-settings">User Settings</Link>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
