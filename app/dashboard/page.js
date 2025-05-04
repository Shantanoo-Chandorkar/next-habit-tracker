// app/dashboard/page.js
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import MainContent from './MainContent/MainContent';
import { RightPanelProvider } from '../../context/RightPanelContext';
import { HabitProvider } from '../../context/HabitContext';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return null;

  return (
    <RightPanelProvider>
      {/* Wrap the entire dashboard in the RightPanelProvider */}
      <HabitProvider>
        <DashboardLayout>
          <MainContent />
        </DashboardLayout>
      </HabitProvider>
    </RightPanelProvider>
  );
};

export default DashboardPage;
