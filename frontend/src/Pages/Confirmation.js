import React from "react";
import styles from "./Confirmation.module.css"

function Confirmation() {
  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <h1 style={{color: "white"}}>Thank you for your purchase!</h1>
      </div>
    </div>
  );
}

export default Confirmation;
