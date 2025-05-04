// components/Header.js
'use client';
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
