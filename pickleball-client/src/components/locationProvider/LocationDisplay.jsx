import React from "react";
import styles from "./LocationDisplay.module.css";

const LocationDisplay = ({ userData, location, method }) => {
  if (!location) return null;

  return (
    <div className={styles.container}>
      {/* Display Name */}
      {location.displayName && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Địa chỉ đầy đủ</h4>
          <p className={styles.displayName}>{location.displayName}</p>
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;