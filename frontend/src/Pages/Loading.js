import React, { useState } from "react";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div
      className={styles.gifcontainer}
      style={{ backgroundImage: `url("/giphy.gif")` }}
    >
      <h2 style={{ color: "white" }}>
        We are working hard on the blockchain and it will take sometime,
      </h2>
      <h2 style={{ color: "white" }}>thank you for being patient with us!</h2>
    </div>
  );
}

export default Loading;
