import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import classes from "./NavBar.module.css";
export default function NavBar() {
  return (
    <div className={classes.Container}>
      <div className="container">
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="#home" className="text-dark">
            <strong>Smartix</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features" className="text-dark">
                How It Works
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                <button className={classes.createItem}>Create Event</button>
              </Nav.Link>
              <NavDropdown
                title={
                  <img
                    src="https://avatars.githubusercontent.com/u/1309537?v=4"
                    width="40px"
                  />
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1" className="text-dark">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
