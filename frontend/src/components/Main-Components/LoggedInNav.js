import { Nav, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { checkWalletIDThunk } from "../../redux/CheckUserSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "redaxios";
import { SecondaryButton } from "./SecondaryButton";
import classes from "./LoggedInNav.module.css";

export default function LoggedInNav() {
  const dispatch = useDispatch();
  const buttonName = "Create event";
  const [profilePic, setProfilePic] = useState("");
  let currentUserId;
  const user_id = useSelector((state) => {
    return state.users.userID;
  });

  if (typeof user_id === "number") {
    currentUserId = user_id;
  }

  async function getUser() {
    if (currentUserId) {
      await axios
        .post(`${process.env.REACT_APP_SERVER}/api/getInfo`, {
          id: currentUserId,
        })
        .then((response) => {
          if (response.data[0].userProfile_pic === null) {
            setProfilePic(
              "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627279513/profile-pic_ovouzp.png"
            );
          } else {
            setProfilePic(response.data[0].userProfile_pic);
          }
        });
    }
  }

  useEffect(() => {
    dispatch(checkWalletIDThunk());
    getUser();
  }, [currentUserId]);

  return (
    <div className={classes.rightContainer}>
      <Nav.Link href="/create-event">
        <SecondaryButton name={buttonName} />
      </Nav.Link>
      <NavDropdown
        title={
          <img
            src={profilePic}
            className={classes.profilePicture}
            width="40px"
            alt="avatars"
          />
        }
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item href="/user-settings" className="text-dark">
          User Settings
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">My Items</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
