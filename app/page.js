import React from 'react';
import Header from './components/Header/header';
import styles from './styles/page.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.welcomeText}>Welcome to Habit Tracker</h1>
      </div>
    </div>
  );
};

export default LandingPage;