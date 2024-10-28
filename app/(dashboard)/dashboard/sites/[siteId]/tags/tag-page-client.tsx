'use client';

import { TagList } from "@/components/tags/tag-list";
import { useSites } from '@/hooks/use-site';

interface TagPageClientProps {
  siteId: string;
}

export function TagPageClient({ siteId }: TagPageClientProps) {
  const { currentSite } = useSites();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Tags {currentSite ? `- ${currentSite.name}` : ''}
      </h1>
      <TagList siteId={siteId} />
    </div>
  );
}