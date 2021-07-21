import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import LoggedInNav from "./LoggedInNav";
import classes from "./NavBar.module.css";
import MetaMaskBtn from "./MetaMaskBtn";
import web3 from "../../web3";

export default function NavBar() {
  const [ac, setAC] = useState(null);
  const [loginBtn, setLoginBtn] = useState(false);
  useEffect(() => {
    async function fetch() {
    window.onload = async function () {
      let data = await web3.eth.getAccounts();
      // console.log(data)
      setAC(data[0]);
      if (data[0] !== undefined) {
        setLoginBtn(true);
      }
    };
  }
  fetch()
  });

  return (
    <div className={classes.Container}>
      <div className="container">
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="/" className="text-dark">
            <strong>Smartix</strong>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/online-events" className={classes.tabs}>
                Events
              </Nav.Link>
            </Nav>
            {loginBtn ? null : <MetaMaskBtn />}
            <Nav>{ac ? <LoggedInNav /> : null}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
