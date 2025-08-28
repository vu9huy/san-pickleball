import React from 'react';
import { InfoWindow } from '@vis.gl/react-google-maps';
import styles from './UserInfoWindow.module.css';
import './UserInfoWindow.css';
import Avatar from '../avatar/Avatar';

const UserInfoWindow = ({ user, onClose }) => {
  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/48/${encodeURIComponent('6B7280')}/${encodeURIComponent('FFFFFF')}?text=${user.name.charAt(0)}`;
  };

  // Convert lon to lng for InfoWindow position
  const infoWindowPosition = {
    lng: user.location.coordinates[0],
    lat: user.location.coordinates[1],
  };

  const formatContact = (contact) => {
    const contacts = [];
    if (contact?.phone) contacts.push({ type: 'phone', value: contact?.phone, label: 'Phone' });
    if (contact?.zalo) contacts.push({ type: 'zalo', value: contact?.zalo, label: 'Zalo' });
    if (contact?.facebook) contacts.push({ type: 'facebook', value: contact?.facebook, label: 'Facebook' });
    return contacts;
  };

  const contactItems = formatContact(user.contact);

  return (
    <InfoWindow 
      position={infoWindowPosition}
      onClose={onClose}
      width={220}
      className="user-info-window"
      // style={{ background: 'lightblue', padding: '10px' }}
    >
      <div className={styles.infoWindowContent}>
        <div className={styles.userHeader}>
          <div className={styles.avatarContainer}>
            <Avatar 
              svgString={user.images?.avatar}
              borderRadius={"14px"}
            />
          </div>
          <div className={styles.userDetails}>
            <h3 className={styles.userName}>{user.name}</h3>
            <div className={styles.statusAndLevel}>
              {user.level && (
                <div className={styles.levelInfo}>
                    <span className={styles.levelText}>Level: {user.level}</span>
                </div>
              )}
              {user.status && (
                <div className={styles.statusInfo}>
                    <span className={`${styles.statusIndicator} ${styles[user.status.toLowerCase()]}`}></span>
                    <span className={styles.statusText}>{user.status}</span>
                </div>
              )}
            </div>
            {/* <p className={styles.locationName}>{user.location.displayName}</p> */}
          </div>
        </div>
        
        <div className={styles.contactInfo}>
          {/* <h4 className={styles.sectionTitle}>Contact Information</h4> */}
          <div className={styles.contactList}>
            {contactItems.map((contact, index) => (
              <div key={index} className={styles.contactItem}>
                {/* <span className={styles.contactLabel}>{contact.label}:</span> */}
                {contact.type === 'phone' ? (
                  <a href={`tel:${contact.value}`} className={styles.contactLink}>
                    {contact.value}
                  </a>
                ) : (
                  <a 
                    href={contact.value} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.contactLink}
                  >
                    {contact.type === 'facebook' ? 'Facebook' : 'Zalo'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </InfoWindow>
  );
};

export default UserInfoWindow;