'use client';

import { usePageTags } from '@/hooks/use-page-tags';
import { TagDetailList } from '@/components/page-tags/tag-detail-list';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TagDetailsClientProps {
  siteId: string;
  groupId: string;
}

export function TagDetailsClient({ siteId, groupId }: TagDetailsClientProps) {
  const { pageTags } = usePageTags(siteId);
  const pageTag = pageTags?.find(tag => tag.id === groupId);

  if (!pageTag) {
    return <div>Tag group not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <Link href="/dashboard/page-tags">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tag Groups
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{pageTag.groupName}</h1>
        <p className="text-muted-foreground mt-2">
          Manage tags in this group
        </p>
      </div>

      <TagDetailList
        siteId={siteId}
        groupId={groupId}
        tagDetails={pageTag.tagDetails}
      />
    </div>
  );
}