'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.push('/dashboard');
    }
  }, [user, isLoadingUser, router]);

  if (isLoadingUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}