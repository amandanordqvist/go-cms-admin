'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard content will be added here */}
      </div>
    </main>
  );
}