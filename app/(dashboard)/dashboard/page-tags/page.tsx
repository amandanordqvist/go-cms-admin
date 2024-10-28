'use client';

import { PageTagList } from "@/components/page-tags/page-tag-list";

export default function GlobalPageTagsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Global Page Tags</h1>
      <PageTagList siteId="global" />
    </div>
  );
}