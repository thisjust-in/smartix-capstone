import React from "react";
import styles from "./Confirmation.module.css";
import { useEffect } from "react";
import { useHistory } from "react-router";

function Confirmation() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <h1 style={{ color: "white" }}>Thank you for your purchase!</h1>
      </div>
    </div>
  );
}

export default Confirmation;
