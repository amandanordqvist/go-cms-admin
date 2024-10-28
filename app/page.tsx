'use client';

import { useAuth } from '@/hooks/use-auth';
import { LandingPage } from '@/components/landing/landing-page';
import { DashboardPage } from '@/components/dashboard/dashboard-page';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <DashboardPage /> : <LandingPage />;
}