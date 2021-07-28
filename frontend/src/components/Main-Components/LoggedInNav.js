import { Nav, NavDropdown } from "react-bootstrap";
import React, { useEffect } from "react";
import { checkWalletIDThunk } from "../../redux/CheckUserSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SecondaryButton } from "./SecondaryButton";
import classes from "./LoggedInNav.module.css";

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
      <Nav.Link href="/create-event">
        <SecondaryButton name={buttonName} />
      </Nav.Link>
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
        <NavDropdown.Item href="/user-settings" className="text-dark">
          User Settings
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
