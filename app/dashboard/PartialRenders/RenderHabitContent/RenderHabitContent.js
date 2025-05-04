'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useHabitContext } from '../../../../context/HabitContext';
import { useRightPanel } from '../../../../context/RightPanelContext';
import HabitCard from '../../../components/HabitCard/HabitCard';
import FloatingActionButton from '../../../components/FloatingActionButton/FloatingActionButton';
import styles from './styles/RenderHabitContent.module.css';
import { FaThList, FaThLarge } from 'react-icons/fa';
import { MdViewColumn } from 'react-icons/md';

const RenderHabitContent = ({ onTitleClick }) => {
  const { data: session } = useSession();
  const { state, dispatch } = useHabitContext();
  const { showHabitForm, showCategoryForm } = useRightPanel();
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState('list');
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const habitRes = await fetch('/api/habits');
        if (!habitRes.ok) throw new Response('Failed to fetch habits');
        const habits = await habitRes.json();
        dispatch({ type: 'SET_HABITS', payload: habits });

        const prefsRes = await fetch('/api/preferences');
        if (prefsRes.ok) {
          const prefs = await prefsRes.json();
          if (prefs.layout?.type) setLayout(prefs.layout.type);
          if (prefs.layout?.columns) setColumns(prefs.layout.columns);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.habits.length]);

  const toggleLayout = async () => {
    const newLayout = layout === 'list' ? 'grid' : 'list';
    const newColumns = newLayout === 'grid' ? columns : 0;
    setLayout(newLayout);

    try {
      await fetch('/api/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout: { type: newLayout, columns: newColumns } }),
      });
    } catch (err) {
      console.error('Failed to update layout preference:', err);
    }
  };

  const handleColumnChange = async (e) => {
    const newColumns = parseInt(e.target.value);
    setColumns(newColumns);

    try {
      await fetch('/api/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout: { type: 'grid', columns: newColumns } }),
      });
    } catch (err) {
      console.error('Failed to update columns:', err);
    }
  };

  return (
    <div className={styles.habitContent}>
      <div className={styles.header}>
        <h2>All Habits</h2>
        <div className={styles.layoutOptions}>
          <button onClick={toggleLayout} title="Toggle Layout">
            {layout === 'list' ? <FaThLarge /> : <FaThList />}
          </button>
          {layout === 'grid' && (
            <div className={styles.columnSelector}>
              <MdViewColumn />
              <select onChange={handleColumnChange} value={columns}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <ul
        key={`${layout}-${columns}`} // 👈 this forces a re-render when layout or columns change
        className={`${styles.habitList} ${layout === 'grid' ? styles.grid : styles.list}`}
        style={layout === 'grid' ? { '--columns': columns } : {}}
      >
        {state.habits.length === 0 && !loading ? (
          <li key={0}><p>No habits found. Create a new habit!</p></li>
        ) : (
          state.habits.map((habit, index) => (
            <li
              key={index}
              className={styles.habitElement}
              style={{ '--i': index }}
            >
              <HabitCard habit={habit} onTitleClick={() => onTitleClick(habit)} />
            </li>
          ))
        )}
      </ul>

      <FloatingActionButton
        onCreateHabit={showHabitForm}
        onCreateCategory={showCategoryForm}
      />
    </div>
  );
};

export default RenderHabitContent;
