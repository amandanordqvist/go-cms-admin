'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Manage your content with our powerful admin dashboard
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push('/auth/login')}>Login</Button>
          <Button variant="outline" onClick={() => router.push('/auth/register')}>
            Register
          </Button>
        </div>
      </div>
    </main>
  );
}