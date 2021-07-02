import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import LoggedInNav from "./LoggedInNav";
import classes from "./NavBar.module.css";

export default function NavBar() {
  const [log, setLog] = useState(true);
  async function test() {
    let test = await window.ethereum.selectedAddress;
    return test;
  }
  useEffect(async () => {
    // let test = await window.ethereum.selectedAddress;
    let test2 = await test();
    // setLog(test);
    console.log("what is log", test2);
  }, []);
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
            <Nav>{log ? <LoggedInNav /> : null}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
