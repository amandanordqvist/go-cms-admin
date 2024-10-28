'use client';

import { CategoryList } from "@/components/categories/category-list";

export default function GlobalSiteCategoriesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Global Site Categories</h1>
      <CategoryList siteId="global" />
    </div>
  );
}