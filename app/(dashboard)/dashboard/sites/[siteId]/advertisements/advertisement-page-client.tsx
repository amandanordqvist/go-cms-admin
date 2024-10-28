'use client';

import { AdvertisementList } from "@/components/advertisements/advertisement-list";
import { useSites } from '@/hooks/use-site';

interface AdvertisementPageClientProps {
  siteId: string;
}

export function AdvertisementPageClient({ siteId }: AdvertisementPageClientProps) {
  const { currentSite } = useSites();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Advertisements {currentSite ? `- ${currentSite.name}` : ''}
      </h1>
      <AdvertisementList siteId={siteId} />
    </div>
  );
}