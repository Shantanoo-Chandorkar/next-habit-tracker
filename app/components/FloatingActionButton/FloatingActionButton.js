'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles/floatingActionButton.module.css';

const FloatingActionButton = ({ onCreateHabit, onCreateCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(null); // Reference for the floating button

  const toggleDropdown = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpenRef.current && !isOpenRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  return (
    <div className={styles.fabContainer} ref={isOpenRef}>
      {isOpen && (
        <div className={`${styles.dropdown} ${styles.show}`}>
          <button onClick={() => { onCreateCategory(); setIsOpen(false); }}>➕ Create Category</button>
          <button onClick={() => { onCreateHabit(); setIsOpen(false); }}>➕ Create Habit</button>
        </div>
      )}
      <button className={`${styles.fab} ${isOpen ? styles.rotate : ''}`} onClick={toggleDropdown}>
        +
      </button>
    </div>
  );
};

export default FloatingActionButton;
