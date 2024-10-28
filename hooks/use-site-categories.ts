'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export type CategoryType = 'VIDEO' | 'NOVEL' | 'PICTURE' | 'COMIC';

export interface SiteCategory {
  id: string;
  siteId: string;
  parentId?: string | null;
  name: string;
  url?: string;
  type: CategoryType;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  children?: SiteCategory[];
}

export interface SiteCategoryInput {
  name: string;
  url?: string;
  type: CategoryType;
  parentId?: string | null;
  isActive: boolean;
  order?: number;
}

// Mock data
const MOCK_CATEGORIES: Record<string, SiteCategory[]> = {
  'global': [
    {
      id: '1',
      siteId: 'global',
      name: 'Videos',
      type: 'VIDEO',
      isActive: true,
      order: 0,
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
      children: [
        {
          id: '2',
          siteId: 'global',
          parentId: '1',
          name: 'Tutorials',
          type: 'VIDEO',
          isActive: true,
          order: 0,
          createdAt: '2024-03-20T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z',
        },
      ],
    },
  ],
  'site1': [
    {
      id: '3',
      siteId: 'site1',
      name: 'Site 1 Videos',
      type: 'VIDEO',
      isActive: true,
      order: 0,
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
  ],
};

export function useSiteCategories(siteId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: categories, isLoading } = useQuery<SiteCategory[]>({
    queryKey: ['site-categories', siteId],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_CATEGORIES[siteId] || [];
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/categories`);
      // if (!response.ok) throw new Error('Failed to fetch categories');
      // return response.json();
    },
    enabled: !!siteId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: SiteCategoryInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newCategory: SiteCategory = {
        id: Date.now().toString(),
        siteId,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_CATEGORIES[siteId] = [...(MOCK_CATEGORIES[siteId] || []), newCategory];
      return newCategory;
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/categories`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to create category');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-categories', siteId] });
      toast({
        title: 'Success',
        description: 'Category created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create category',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SiteCategoryInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const categoryIndex = MOCK_CATEGORIES[siteId]?.findIndex(c => c.id === id);
      if (categoryIndex === -1) throw new Error('Category not found');
      
      const updatedCategory = {
        ...MOCK_CATEGORIES[siteId][categoryIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      MOCK_CATEGORIES[siteId][categoryIndex] = updatedCategory;
      return updatedCategory;
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/categories/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to update category');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-categories', siteId] });
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update category',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      MOCK_CATEGORIES[siteId] = MOCK_CATEGORIES[siteId]?.filter(c => c.id !== id) || [];
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/categories/${id}`, {
      //   method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Failed to delete category');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-categories', siteId] });
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete category',
      });
    },
  });

  return {
    categories,
    isLoading,
    createCategory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}