'use client';

import { FriendLinkList } from "@/components/friend-links/friend-link-list";
import { useSites } from '@/hooks/use-site';

interface FriendLinksPageClientProps {
  siteId: string;
}

export function FriendLinksPageClient({ siteId }: FriendLinksPageClientProps) {
  const { currentSite } = useSites();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Friend Links {currentSite ? `- ${currentSite.name}` : ''}
      </h1>
      <FriendLinkList siteId={siteId} />
    </div>
  );
}