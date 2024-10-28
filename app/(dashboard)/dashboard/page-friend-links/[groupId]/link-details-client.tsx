'use client';

import { usePageFriendLinks } from '@/hooks/use-page-friend-links';
import { LinkDetailList } from '@/components/page-friend-links/link-detail-list';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface LinkDetailsClientProps {
  siteId: string;
  groupId: string;
}

export function LinkDetailsClient({ siteId, groupId }: LinkDetailsClientProps) {
  const { pageFriendLinks } = usePageFriendLinks(siteId);
  const pageFriendLink = pageFriendLinks?.find(link => link.id === groupId);

  if (!pageFriendLink) {
    return <div>Friend link group not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <Link href="/dashboard/page-friend-links">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Friend Link Groups
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{pageFriendLink.groupName}</h1>
        <p className="text-muted-foreground mt-2">
          Manage friend links in this group
        </p>
      </div>

      <LinkDetailList
        siteId={siteId}
        groupId={groupId}
        linkDetails={pageFriendLink.linkDetails}
      />
    </div>
  );
}