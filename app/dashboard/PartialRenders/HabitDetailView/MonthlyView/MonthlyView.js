'use client';
import React from 'react';
import { useHabitContext } from '../../../../../context/HabitContext';
import styles from './styles/MonthlyView.module.css';
import { getDayOfYear } from '../../../../../lib/getDayofYear';

const MonthlyView = ({ habit, month, year, setHabitData }) => {
  const { dispatch } = useHabitContext();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday

  const totalCells = firstDay + daysInMonth;
  const trailingEmptyCells = (7 - (totalCells % 7)) % 7;

  const isCompleted = (day) => {
    const dayDate = new Date(Date.UTC(year, month, day));
    const dayOfYear = getDayOfYear(dayDate);
    return habit.completedDaysByYear?.[year]?.includes(dayOfYear);
  };

  const handleDotClick = async (day) => {
    // const dateObj = new Date(year, month, day);
    const dateObj = new Date(Date.UTC(year, month, day));
    const dayOfYear = getDayOfYear(dateObj);

    const res = await fetch(`/api/habits/${habit._id}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ year, dayOfYear }),
    });

    if (res.ok) {
      const updatedHabit = await res.json();
      setHabitData(updatedHabit); // Update the local state with the new habit data
      dispatch({ type: 'UPDATE_HABIT', payload: updatedHabit });
    }
  };

  const isFutureDay = (day) => {
    const date = new Date(year, month, day);
    const now = new Date();
    return date > now;
  };

  return (
    <div className={styles.monthGrid}>
      {Array(firstDay).fill(null).map((_, idx) => (
        <div key={`empty-start-${idx}`} className={`${styles.dayCell} ${styles.disabled}`}></div>
      ))}

      {Array.from({ length: daysInMonth }, (_, index) => {
        const currentDay = index + 1;
        const dateObj = new Date(Date.UTC(year, month, currentDay));
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
        return (
          <div
            key={currentDay}
            className={`${styles.dayCell} ${isCompleted(currentDay) ? styles.completed : ''} ${isFutureDay(currentDay) ? styles.disabled : ''}`}
            onClick={() => !isFutureDay(currentDay) && handleDotClick(currentDay)}
            title={`${formattedDate}`}
          >
            {currentDay}
          </div>
        );
      })}

      {Array(trailingEmptyCells).fill(null).map((_, idx) => (
        <div key={`empty-end-${idx}`} className={`${styles.dayCell} ${styles.disabled}`}></div>
      ))}
    </div>
  );
};

export default MonthlyView;
