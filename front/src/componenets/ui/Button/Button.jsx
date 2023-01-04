import React from "react";
import styles from "./Button.module.scss";

const Button = ({
                  text = "", callBack, type = "purple"
                }) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={callBack} className={`${styles.button} ${styles[type]}`}>
        {text}
      </button>
    </div>
  );
};

export default Button;
