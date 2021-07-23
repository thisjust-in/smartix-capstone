import React from "react";
import { Container } from "react-bootstrap";
import Settings from "../components/user-settings/Settings";
import classes from "../components/user-settings/User-setting.module.css";
function Usersettings() {
  return (
    <div className={classes.mainContainer}>
      <Container className={classes.page}>
        <div className={classes.introSection}>
          <h5 id={classes.title}>Account settings</h5>
          <p className="mt-3">View and edit your personal settings</p>
        </div>
        <div className={classes.tabDiv}>
          <Settings />
        </div>
      </Container>
    </div>
  );
}

export default Usersettings;
