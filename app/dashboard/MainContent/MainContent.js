'use client';
import React, { useState } from 'react';
import { useHabitContext } from '../../../context/HabitContext';
import RenderHabitContent from '../PartialRenders/RenderHabitContent/RenderHabitContent';
import HabitDetailView from '../PartialRenders/HabitDetailView/HabitDetailView';
import styles from './styles/mainContent.module.css';

const MainContent = () => {
  // const [selectedHabit, setSelectedHabit] = useState(null);
  // // In future, this could come from a context or state
  // const currentView = 'habits';
  const [selectedHabit, setSelectedHabit] = useState(null);
  const currentView = 'habits';

  return (
    <div className={styles.mainContent}>
      {selectedHabit ? (
        <HabitDetailView habit={selectedHabit} onBack={() => setSelectedHabit(null)} />
      ) : (
        currentView === 'habits' && (
          <RenderHabitContent
            onTitleClick={setSelectedHabit}
          />
        )
      )}
    </div>
  );
};

export default MainContent;
