'use client';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './styles/loadingoverlay.module.css';

const LoadingOverlay = () => {
  return (
    <div className={styles.overlay}>
      <ClipLoader size={60} color="#ffffff" />
    </div>
  );
};

export default LoadingOverlay;
