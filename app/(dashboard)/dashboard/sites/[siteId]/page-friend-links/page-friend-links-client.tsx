'use client';

import { PageFriendLinkList } from "@/components/page-friend-links/page-friend-link-list";
import { useSites } from '@/hooks/use-site';

interface PageFriendLinksClientProps {
  siteId: string;
}

export function PageFriendLinksClient({ siteId }: PageFriendLinksClientProps) {
  const { currentSite } = useSites();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Page Friend Links {currentSite ? `- ${currentSite.name}` : ''}
      </h1>
      <PageFriendLinkList siteId={siteId} />
    </div>
  );
}