import React from "react";
import Classes from "./Lp.module.css";
export default function LpHeading(props) {
  return (
    <div className={Classes.container}>
      <h1 id={Classes.title}>{props.title}</h1>
      <p id={Classes.text}>{props.text}</p>
    </div>
  );
}
