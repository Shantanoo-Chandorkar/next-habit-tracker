'use client';
// app/dashboard/page.js
// This is the main dashboard page of the Habit Tracker application.
// It serves as the primary interface for users to manage their habits.
// The page includes a layout component for consistent navigation and a main content area for displaying habit-related information.
// The page also includes authentication checks to ensure that only logged-in users can access the dashboard.
// The page uses the RightPanelProvider and HabitProvider context providers to manage state and functionality related to the right panel and habits, respectively.
// The page uses the useSession hook from next-auth to check the user's authentication status and redirect them to the login page if they are not authenticated.
// The page uses the useRouter hook from next/navigation to programmatically navigate to the login page if the user is not authenticated.

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
