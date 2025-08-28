import React from "react";
import styles from "./LoadingCard.module.css";

const LoadingCard = ({ message = "Đang tải..." }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.spinner}></div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingCard;