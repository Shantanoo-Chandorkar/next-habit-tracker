// components/Layout/DashboardLayout.js
'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import styles from './styles/dashboardLayout.module.css'
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';
import { DashboardUIProvider } from '../../../context/DashboardUIContext';

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <DashboardUIProvider>
      <div className={styles.dashboardLayout}>
        {session && <LeftPanel />}
        <main className={styles.mainContent}>{children}</main>
        {session && <RightPanel />}
      </div>
    </DashboardUIProvider>
  );
};

export default DashboardLayout;
