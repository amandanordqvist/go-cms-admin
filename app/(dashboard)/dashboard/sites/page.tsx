'use client';

import { SiteList } from "@/components/sites/site-list";

export default function SitesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Sites</h1>
      <SiteList />
    </div>
  );
}