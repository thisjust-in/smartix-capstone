import React from "react";
import classes from "./LoggedInNav.module.css";

export const SecondaryButton = (prop) => {
  return (
    <div>
      <button className={classes.secondaryButton}>{prop.name}</button>
    </div>
  );
};
