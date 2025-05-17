'use client';
// app/dashboard/PartialRenders/RenderHabitContent/RenderHabitContent.js
// This component is responsible for rendering the list of habits in the dashboard.
// It fetches the habits from the server and displays them in either a grid or list layout.
// The component also includes a floating action button for creating new habits and categories.
// The component uses the HabitContext to manage the state of the habits and the RightPanelContext to manage the visibility of the right panel.
// The component uses the useSession hook from next-auth to check the user's authentication status and fetch their habits.
// The component also includes a layout toggle button to switch between grid and list views.
// The component uses the useEffect hook to fetch the habits and preferences from the server when the component mounts.
// The component also includes a resize event listener to update the layout based on the screen size.
// The component uses the useState hook to manage the loading state and the layout type.
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useHabitContext } from '../../../../context/HabitContext';
import { useRightPanel } from '../../../../context/RightPanelContext';
import HabitCard from '../../../components/HabitCard/HabitCard';
import FloatingActionButton from '../../../components/FloatingActionButton/FloatingActionButton';
import styles from './styles/RenderHabitContent.module.css';
import { FaThList, FaThLarge } from 'react-icons/fa';

const RenderHabitContent = ({ onTitleClick }) => {
  const { data: session } = useSession();
  const { state, dispatch } = useHabitContext();
  const { showHabitForm, showCategoryForm } = useRightPanel();
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState('');

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

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
    setLayout(newLayout);

    try {
      await fetch('/api/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout: { type: newLayout } }),
      });
    } catch (err) {
      console.error('Failed to update layout preference:', err);
    }
  };

  return (
    <div className={styles.habitContent}>
      <div className={styles.header}>
        <h2>All Habits</h2>
        <div className={styles.layoutOptions}>
          <button type='button' onClick={toggleLayout} title="Toggle Layout">
            {layout === 'list' ? <FaThLarge /> : <FaThList />}
          </button>
        </div>
      </div>

      <ul
        key={`${layout}`} // 👈 this forces a re-render when layout or columns change
        className={`${styles.habitList} ${layout === 'grid' ? styles.grid : styles.list}`}
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
