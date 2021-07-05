import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { SecondaryButton } from "./SecondaryButton";
import classes from "./LoggedInNav.module.css";
export default function LoggedInNav() {
  const buttonName = "Create event";
  return (
    <div className={classes.test}>
      <Nav.Link href="/create-event">
        <SecondaryButton name={buttonName} />
      </Nav.Link>
      <NavDropdown
        title={
          <img
            src="https://avatars.githubusercontent.com/u/1309537?v=4"
            width="40px"
            alt='avatars'
          />
        }
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item href="#action/3.1" className="text-dark">
          User Settings
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">My Items</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Disconnect</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
