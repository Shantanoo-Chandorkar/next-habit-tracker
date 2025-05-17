// components/Layout/LeftPanel.js
'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import styles from "./styles/leftPanel.module.css";

const LeftPanel = () => {
  return (
    <aside className={styles.leftPanel}>
      <div className={styles.logo}>Habit Tracker</div>
      <nav className={styles.nav}>
        <ul>
          <li>Habits</li>
          <li>Categories <span className={styles.comingSoon}>Coming Soon</span></li>
          <li>Statistics <span className={styles.comingSoon}>Coming Soon</span></li>
          <li onClick={() => signOut({ callbackUrl: '/' })}>Logout</li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftPanel;
