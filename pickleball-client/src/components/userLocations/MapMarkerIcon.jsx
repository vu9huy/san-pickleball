import React from 'react';
import styles from './MapMarkerIcon.module.css';
import Avatar from '../avatar/Avatar';

const MapMarkerIcon = ({ 
  user, 
  avatarAlt = "User avatar", 
  size = "medium",
  className = "" 
}) => {
  return (
    <div className={`${styles.mapMarker} ${styles[size]} ${className}`}>
      <div className={styles.markerBody}>
        <div className={styles.avatarContainer}>
          {user?.images?.avatar ? (
            // <img 
            //   src={user?.images?.avatar} 
            //   alt={avatarAlt}
            //   className={styles.avatar}
            // />
            <Avatar svgString={user.images?.avatar}/>
          ) : (
            <div className={styles.avatarPlaceholder}>
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className={styles.userIcon}
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className={styles.markerPoint}></div>
    </div>
  );
};

export default MapMarkerIcon;