'use client';
import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import styles from "./styles/leftPanel.module.css";
import { FaBars, FaTimes } from 'react-icons/fa'; // react-icons

const LeftPanel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  if (isMobile) {
    return (
      <header className={styles.mobileHeader}>
        <div className={styles.logo}>Habit Tracker</div>
        <button onClick={toggleMenu} className={styles.hamburgerBtn}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        {menuOpen && (
          <nav className={styles.mobileNav}>
            <ul>
              <li onClick={toggleMenu}>Habits</li>
              <li onClick={toggleMenu}>
                Categories <span className={styles.comingSoon}>Coming Soon</span>
              </li>
              <li onClick={toggleMenu}>
                Statistics <span className={styles.comingSoon}>Coming Soon</span>
              </li>
              <li onClick={() => { toggleMenu(); signOut({ callbackUrl: '/' }); }}>Logout</li>
            </ul>
          </nav>
        )}
      </header>
    );
  }

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
