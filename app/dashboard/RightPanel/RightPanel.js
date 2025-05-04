'use client';
import React from 'react';
import styles from './styles/rightPanel.module.css';
import { useRightPanel } from '../../../context/RightPanelContext';
import HabitForm from '../HabitForms/HabitForm/HabitForm';
import CategoryForm from '../HabitForms/CategoryForm/CategoryForm';

const RightPanel = () => {
  const { panelContent, editData } = useRightPanel();

  return (
    <aside className={styles.rightPanel}>
      {panelContent === 'newHabit' && <HabitForm />}
      {panelContent === 'editHabit' && <HabitForm editData={editData} />}
      {panelContent === 'newCategory' && <CategoryForm editData={editData} />}
      {!panelContent && <p>Select an action to get started.</p>}
    </aside>
  );
};

export default RightPanel;
