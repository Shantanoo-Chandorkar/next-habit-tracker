'use client';
import React, { createContext, useContext, useState } from 'react';

const RightPanelContext = createContext();

export const RightPanelProvider = ({ children }) => {
  const [panelContent, setPanelContent] = useState(null); // 'newHabit' | 'newCategory' | 'editHabit' | null
  const [editData, setEditData] = useState(null);

  const showHabitForm = (data = null) => {
    setEditData(data);
    setPanelContent(data ? 'editHabit' : 'newHabit');
  };

  const showCategoryForm = (data = null) => {
    setEditData(data);
    setPanelContent('newCategory');
  };

  const clearPanel = () => {
    setEditData(null);
    setPanelContent(null);
  };

  return (
    <RightPanelContext.Provider value={{ panelContent, showHabitForm, showCategoryForm, editData, clearPanel }}>
      {children}
    </RightPanelContext.Provider>
  );
};

export const useRightPanel = () => useContext(RightPanelContext);
