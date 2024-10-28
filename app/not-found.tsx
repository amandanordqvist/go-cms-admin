import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">Page not found</p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}