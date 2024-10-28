'use client';

import { AdvertisementList } from "@/components/advertisements/advertisement-list";

export default function GlobalAdvertisementsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Global Advertisements</h1>
      <AdvertisementList siteId="global" />
    </div>
  );
}