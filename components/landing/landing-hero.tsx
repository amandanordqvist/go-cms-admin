'use client';

export function LandingHero() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Admin Dashboard
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        A powerful admin dashboard for managing your content and users
      </p>
    </div>
  );
}