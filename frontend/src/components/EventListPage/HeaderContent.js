import React from "react";
import styles from "./HeaderContent.module.css";

function HeaderContent(props) {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        {props.avatar ? (
          <img className={styles.avatar} src={props.avatar} alt="avatar"></img>
        ) : null}
        <div>
          {props.title ? (
            <h1 className={styles.noMarginPadding} style={{ color: "white" }}>
              {props.title}
            </h1>
          ) : (
            <h1 className={styles.noMarginPadding} style={{ color: "white" }}>
              The World's Best Events
            </h1>
          )}
          {props.para ? (
            <p className={styles.noMarginPadding} style={{ color: "white" }}>
              {props.para}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default HeaderContent;
