'use client';

import { PageTagList } from "@/components/page-tags/page-tag-list";
import { useSites } from '@/hooks/use-site';

interface PageTagsClientProps {
  siteId: string;
}

export function PageTagsClient({ siteId }: PageTagsClientProps) {
  const { currentSite } = useSites();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Page Tags {currentSite ? `- ${currentSite.name}` : ''}
      </h1>
      <PageTagList siteId={siteId} />
    </div>
  );
}