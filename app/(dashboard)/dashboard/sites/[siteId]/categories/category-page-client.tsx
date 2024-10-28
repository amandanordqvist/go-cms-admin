'use client';

import { CategoryList } from "@/components/categories/category-list";
import { useSites } from '@/hooks/use-site';

interface CategoryPageClientProps {
  siteId: string;
}

export function CategoryPageClient({ siteId }: CategoryPageClientProps) {
  const { currentSite } = useSites();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Categories {currentSite ? `- ${currentSite.name}` : ''}
      </h1>
      <CategoryList siteId={siteId} />
    </div>
  );
}