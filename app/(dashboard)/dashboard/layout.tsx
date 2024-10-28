'use client';

import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8">
      <DashboardNav />
      {children}
    </div>
  );
}