'use client';

import { CategoryList } from "@/components/categories/category-list";

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Categories</h1>
      <CategoryList />
    </div>
  );
}