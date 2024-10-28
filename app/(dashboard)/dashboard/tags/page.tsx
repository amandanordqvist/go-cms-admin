'use client';

import { TagList } from "@/components/tags/tag-list";

export default function GlobalTagsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Global Tags</h1>
      <TagList siteId="global" />
    </div>
  );
}