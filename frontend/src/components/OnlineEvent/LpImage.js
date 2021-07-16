import React from "react";
import headerImage from "../assets/online-events-bg.png";
import Classes from "./Lp.module.css";
export default function LpImage() {
  return (
    <div>
      <img src={headerImage} className={Classes.img} alt="alt"/>
    </div>
  );
}
