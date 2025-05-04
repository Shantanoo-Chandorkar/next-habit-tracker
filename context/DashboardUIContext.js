'use client';
import { createContext, useContext, useState } from 'react';

const DashboardUIContext = createContext();

export const useDashboardUI = () => useContext(DashboardUIContext);

export const DashboardUIProvider = ({ children }) => {
  const [rightPanelView, setRightPanelView] = useState(null); // 'newHabit' | 'newCategory' | null

  return (
    <DashboardUIContext.Provider value={{ rightPanelView, setRightPanelView }}>
      {children}
    </DashboardUIContext.Provider>
  );
};
