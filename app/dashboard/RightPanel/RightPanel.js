'use client';
import React from 'react';
import styles from './styles/rightPanel.module.css';
import { useRightPanel } from '../../../context/RightPanelContext';
import HabitForm from '../HabitForms/HabitForm/HabitForm';
import CategoryForm from '../HabitForms/CategoryForm/CategoryForm';

const RightPanel = ({ isMobile }) => {
  const { panelContent, clearPanel, editData } = useRightPanel();

  const renderContent = () => {
    if (panelContent === 'newHabit') return <HabitForm onSuccess={clearPanel} />;
    if (panelContent === 'editHabit') return <HabitForm editData={editData} onSuccess={clearPanel} />;
    if (panelContent === 'newCategory') return <CategoryForm onSuccess={clearPanel} />;
    if (!panelContent) return <p>Select an action to get started.</p>;
    return null;
  };

  return (
    <>
      {/* For desktop, keep using aside layout */}
      {!isMobile && (
        <aside className={styles.rightPanel}>
          {renderContent()}
        </aside>
      )}

      {/* For mobile, use overlay sliding panel */}
      {isMobile && (
        <div className={`${styles.mobileOverlay} ${panelContent ? styles.visible : ''}`}>
          <div className={styles.mobilePanel}>
            <button className={styles.closeButton} onClick={clearPanel}>×</button>
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default RightPanel;
