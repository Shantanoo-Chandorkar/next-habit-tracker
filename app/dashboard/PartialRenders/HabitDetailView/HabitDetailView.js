'use client';
import React, { useState } from 'react';
import styles from './styles/HabitDetailView.module.css';
import MonthlyView from './MonthlyView/MonthlyView';
import YearlyView from './YearlyView/YearlyView';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const HabitDetailView = ({ habit, onBack }) => {
  const today = new Date();
  const [view, setView] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [habitData, setHabitData] = useState(habit);

  const years = Array.from({ length: 3000 - 2001 + 1 }, (_, i) => 2001 + i);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>← Back</button>
        <h2>{`${habitData.title} - ${months[selectedMonth]} Overview`}</h2>

        <div className={styles.dropdownContainer}>
          <select value={view} onChange={(e) => setView(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          {view === 'monthly' && (
            <>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {months.map((m, i) => (
                  <option key={i} value={i}>{m}</option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      <div className={styles.viewContent}>
        {view === 'monthly' ? (
          <MonthlyView habit={habitData} month={selectedMonth} year={selectedYear} setHabitData={setHabitData} />
        ) : (
          <YearlyView habit={habitData} month={selectedMonth} year={selectedYear} setHabitData={setHabitData} />
        )}
      </div>
    </div>
  );
};

export default HabitDetailView;
