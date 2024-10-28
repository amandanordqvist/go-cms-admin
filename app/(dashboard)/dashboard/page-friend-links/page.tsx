'use client';

import { PageFriendLinkList } from "@/components/page-friend-links/page-friend-link-list";

export default function GlobalPageFriendLinksPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Global Page Friend Links</h1>
      <PageFriendLinkList siteId="global" />
    </div>
  );
}