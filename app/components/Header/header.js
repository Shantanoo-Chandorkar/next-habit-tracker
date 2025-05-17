'use client';
// components/Header.js
// This is the header component for the Habit Tracker application.
// It serves as the navigation bar for the application, providing links to different sections and a login/logout button.
// The header also includes a logo and a conditional login/logout button based on the user's authentication status.
// The header uses the useSession hook from next-auth to check the user's authentication status and display the appropriate button.
// The header also includes a signOut function to handle user logout and redirect them to the landing page after logging out.
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './styles/header.module.css';

const Header = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({
      callbackUrl: '/', // Redirect to landing page after logout
    });
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>Habit Tracker</div>

      {/* Conditional Login/Logout Button */}
      {session ? (
        <button onClick={handleLogout} className={styles.loginButton}>
          Logout
        </button>
      ) : (
        <Link href="/login" className={styles.loginButton}>
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
