'use client';

import { FriendLinkList } from "@/components/friend-links/friend-link-list";

export default function GlobalFriendLinksPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Global Friend Links</h1>
      <FriendLinkList siteId="global" />
    </div>
  );
}