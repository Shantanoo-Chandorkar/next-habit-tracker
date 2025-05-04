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
          <li>All Habits</li>
          <li>Categories</li>
          <li>Statistics</li>
          <li onClick={() => signOut({ callbackUrl: '/' })}>Logout</li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftPanel;
