'use client';

import { useState } from 'react';
import { useCategories, Category } from '@/hooks/use-categories';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CategoryTree } from './category-tree';
import { CategoryDialog } from './category-dialog';
import { CategoryView } from './category-view';

export function CategoryList() {
  const { categories, isLoading } = useCategories();
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAdd = () => {
    setSelectedCategory(null);
    setDialogType('add');
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setDialogType('edit');
  };

  const handleView = (category: Category) => {
    setSelectedCategory(category);
    setDialogType('view');
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <CategoryTree
          categories={categories || []}
          onEdit={handleEdit}
          onView={handleView}
        />
      </div>

      {dialogType && (
        <CategoryDialog
          type={dialogType}
          category={selectedCategory}
          open={dialogType === 'add' || dialogType === 'edit'}
          onClose={handleClose}
        />
      )}

      {dialogType === 'view' && selectedCategory && (
        <CategoryView
          category={selectedCategory}
          open={dialogType === 'view'}
          onClose={handleClose}
        />
      )}
    </div>
  );
}