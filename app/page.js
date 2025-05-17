'use client';
// app/page.js
// This is the landing page of the Habit Tracker application.
// It serves as the entry point for users who are not authenticated.
// The page displays a welcome message and a button to navigate to the dashboard if the user is logged in.
// The page also includes a header component for consistent navigation across the app.
import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Header from './components/Header/header';
import styles from './styles/page.module.css';

const LandingPage = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.welcomeText}>Welcome to Habit Tracker</h1>
        {session ? (
          <Link href="/dashboard" className={styles.goToDashboardButton}>Go to Dashboard</Link>
        ) : <></>}
      </div>
    </div>
  );
};

export default LandingPage;