'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export type CategoryType = 'VIDEO' | 'NOVEL' | 'PICTURE' | 'COMIC';

export interface Category {
  id: string;
  name: string;
  url?: string;
  type: CategoryType;
  parentId?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export interface CategoryInput {
  name: string;
  url?: string;
  type: CategoryType;
  parentId?: string;
  isActive: boolean;
  order?: number;
}

// Mock data
const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Videos',
    type: 'VIDEO',
    isActive: true,
    order: 0,
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
    children: [
      {
        id: '2',
        name: 'Tutorials',
        type: 'VIDEO',
        parentId: '1',
        isActive: true,
        order: 0,
        createdAt: '2024-03-20T00:00:00Z',
        updatedAt: '2024-03-20T00:00:00Z',
      },
      {
        id: '3',
        name: 'Entertainment',
        type: 'VIDEO',
        parentId: '1',
        isActive: true,
        order: 1,
        createdAt: '2024-03-20T00:00:00Z',
        updatedAt: '2024-03-20T00:00:00Z',
      },
    ],
  },
  {
    id: '4',
    name: 'Comics',
    type: 'COMIC',
    isActive: true,
    order: 1,
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
];

export function useCategories() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_CATEGORIES;
      
      // Real API call (commented out)
      // const response = await fetch('/api/categories');
      // if (!response.ok) throw new Error('Failed to fetch categories');
      // return response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: CategoryInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...data, id: Date.now().toString() };
      
      // Real API call (commented out)
      // const response = await fetch('/api/categories', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) throw new Error('Failed to create category');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
    mutationFn: async ({ id, data }: { id: string; data: Partial<CategoryInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...data, id };
      
      // Real API call (commented out)
      // const response = await fetch(`/api/categories/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) throw new Error('Failed to update category');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Real API call (commented out)
      // const response = await fetch(`/api/categories/${id}`, {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error('Failed to delete category');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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