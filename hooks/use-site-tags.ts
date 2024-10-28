'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export type TagPosition = 'TOP' | 'BOTTOM';

export interface Tag {
  id: string;
  siteId: string;
  name: string;
  order: number;
  url?: string;
  position: TagPosition;
  createdAt: string;
  updatedAt: string;
}

export interface TagInput {
  name: string;
  order?: number;
  url?: string;
  position: TagPosition;
}

// Mock data
const MOCK_TAGS: Record<string, Tag[]> = {
  'site1': [
    {
      id: '1',
      siteId: 'site1',
      name: 'Featured',
      order: 0,
      position: 'TOP',
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
    {
      id: '2',
      siteId: 'site1',
      name: 'Popular',
      order: 1,
      url: '/popular',
      position: 'TOP',
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
  ],
  'site2': [
    {
      id: '3',
      siteId: 'site2',
      name: 'Latest',
      order: 0,
      position: 'TOP',
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
  ],
};

export function useSiteTags(siteId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: tags, isLoading } = useQuery<Tag[]>({
    queryKey: ['site-tags', siteId],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_TAGS[siteId] || [];
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/tags`);
      // if (!response.ok) throw new Error('Failed to fetch tags');
      // return response.json();
    },
    enabled: !!siteId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: TagInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTag: Tag = {
        id: Date.now().toString(),
        siteId,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_TAGS[siteId] = [...(MOCK_TAGS[siteId] || []), newTag];
      return newTag;
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/tags`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to create tag');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Tag created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create tag',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TagInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const tagIndex = MOCK_TAGS[siteId]?.findIndex(t => t.id === id);
      if (tagIndex === -1) throw new Error('Tag not found');
      
      const updatedTag = {
        ...MOCK_TAGS[siteId][tagIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      MOCK_TAGS[siteId][tagIndex] = updatedTag;
      return updatedTag;
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/tags/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to update tag');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Tag updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update tag',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      MOCK_TAGS[siteId] = MOCK_TAGS[siteId]?.filter(t => t.id !== id) || [];
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/tags/${id}`, {
      //   method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Failed to delete tag');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Tag deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete tag',
      });
    },
  });

  return {
    tags,
    isLoading,
    createTag: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateTag: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteTag: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}