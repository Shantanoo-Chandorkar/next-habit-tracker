'use client';
import React from 'react';
import styles from './styles/YearlyView.module.css';
import { useHabitContext } from '../../../../../context/HabitContext';
import { getDayOfYear } from '../../../../../lib/getDayofYear';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Check if a year is a leap year
const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

// Get the number of days in a month
const getDaysInMonth = (year, month) => {
  if (month === 1) {
    // February
    return isLeapYear(year) ? 29 : 28;
  }
  // April, June, September, November have 30 days
  if ([3, 5, 8, 10].includes(month)) return 30;
  return 31; // All other months have 31 days
};

// Get the weeks of a month, each week is an array of days
const getWeeksInMonth = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const weeks = [];

  let currentWeek = [];
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7 || day === daysInMonth) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  return weeks;
};

const YearlyView = ({ habit, year }) => {
  return (
    <div className={styles.yearGrid}>
      {months.map((month, monthIndex) => {
        const weeks = getWeeksInMonth(year, monthIndex);
        return (
          <div key={month} className={styles.monthContainer}>
            <h3 className={styles.monthName}>{month}</h3>
            <div className={styles.monthGrid}>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className={styles.weekRow}>
                  {week.map((day, dayIndex) => {
                    const dayDate = new Date(Date.UTC(year, monthIndex, day));
                    const dayOfYear = getDayOfYear(dayDate);
                    const isCompleted = habit.completedDaysByYear?.[year]?.includes(dayOfYear);

                    return (
                      <span
                        key={dayIndex}
                        className={`${styles.dayDot} ${isCompleted ? styles.completed : ''}`}
                        title={`Day ${day}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default YearlyView;