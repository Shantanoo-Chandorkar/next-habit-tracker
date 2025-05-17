'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './styles/dashboardLayout.module.css';
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';
import { DashboardUIProvider } from '../../../context/DashboardUIContext';

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 1024);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <DashboardUIProvider>
      <div className={styles.dashboardLayout}>
        {session && <LeftPanel isMobile={isMobile} />}
        <main className={styles.mainContent}>
          {children}
        </main>
        {session && <RightPanel isMobile={isMobile} />}
      </div>
    </DashboardUIProvider>
  );
};

export default DashboardLayout;
