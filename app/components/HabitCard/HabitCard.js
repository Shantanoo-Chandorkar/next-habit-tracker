import React, { useState, useRef, useEffect } from 'react';
import styles from './styles/habitCard.module.css';
import { FiMoreVertical } from 'react-icons/fi';
import { useHabitContext } from '../../../context/HabitContext';
import { getDayOfYear } from '../../../lib/getDayofYear';
import { useRightPanel } from '../../../context/RightPanelContext';

const HabitCard = ({ habit, onTitleClick }) => {
  const { dispatch } = useHabitContext();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Reference for the dropdown
  const { showHabitForm } = useRightPanel();

  const toggleMenu = () => setShowMenu(prev => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleDotClick = async (dateObj) => {
    const dayOfYear = getDayOfYear(dateObj);
    const year = dateObj.getUTCFullYear();

    const res = await fetch(`/api/habits/${habit._id}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ year, dayOfYear }),
    });

    if (res.ok) {
      const updatedHabit = await res.json();
      dispatch({ type: 'UPDATE_HABIT', payload: updatedHabit });
    }
  };

  const isDayCompleted = (dateObj) => {
    const year = dateObj.getUTCFullYear().toString();
    const dayOfYear = getDayOfYear(dateObj);
    return habit.completedDaysByYear?.[year]?.includes(dayOfYear);
  };

  const handleEdit = () => {
    showHabitForm(habit); // Pass the habit data for editing
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/habits/${habit._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.ok) {
      const deleteHabit = await res.json();
      dispatch({ type: 'DELETE_HABIT', payload: deleteHabit._id });
    } else {
      const error = await res.json();
      console.error('Error deleting habit: ', error);
    }
  }

  return (
    <div className={styles.card}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={!!isDayCompleted(new Date())}
        onChange={() => handleDotClick(new Date())}
      />

      <div className={styles.details}>
        <h3 onClick={onTitleClick} className={styles.title}>{habit.title}</h3>

        <div className={styles.consistency}>
          {[...Array(7)].map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - index)); // left to right
            const completed = isDayCompleted(date);

            const formattedDate = date.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            });

            return (
              <span
                key={index}
                className={`${styles.dot} ${completed ? styles.filled : ''}`}
                title={formattedDate}
                onClick={() => handleDotClick(date)}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.menuWrapper} ref={menuRef}>
        <FiMoreVertical className={styles.menuIcon} onClick={toggleMenu} />
        {showMenu && (
          <div className={styles.dropdown}>
            {/* {() => { onCreateCategory(); setIsOpen(false); }} */}
            <button onClick={() => { handleEdit(); setShowMenu(false); }}>Edit</button>
            <button onClick={() => { handleDelete(); setShowMenu(false); }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitCard;
