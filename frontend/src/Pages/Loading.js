import React, { useEffect } from "react";
import styles from "./Loading.module.css";

function Loading() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={styles.gifcontainer}
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dnq92mpxr/image/upload/v1627205937/wj7l6xcro979njfytqoj.jpg")',
      }}
    >
      <h2 style={{ color: "white" }}>
        We are working hard on the blockchain and it will take sometime,
      </h2>
      <h2 style={{ color: "white" }}>thank you for being patient with us!</h2>
    </div>
  );
}

export default Loading;
