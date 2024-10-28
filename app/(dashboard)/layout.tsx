'use client';

import { Header } from "@/components/dashboard/header";
import { SideNav } from "@/components/dashboard/side-nav";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <SideNav />
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </AuthGuard>
  );
}