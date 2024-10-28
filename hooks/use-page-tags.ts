'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export interface TagDetail {
  id: string;
  pageTagId: string;
  name: string;
  order: number;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageTag {
  id: string;
  siteId: string;
  groupName: string;
  tagDetails: TagDetail[];
  createdAt: string;
  updatedAt: string;
}

export interface PageTagInput {
  groupName: string;
}

export interface TagDetailInput {
  name: string;
  order: number;
  url?: string;
}

// Mock data
const MOCK_PAGE_TAGS: Record<string, PageTag[]> = {
  'site1': [
    {
      id: '1',
      siteId: 'site1',
      groupName: 'Header Navigation',
      tagDetails: [
        {
          id: '1',
          pageTagId: '1',
          name: 'Home',
          order: 0,
          url: '/',
          createdAt: '2024-03-20T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z',
        },
        {
          id: '2',
          pageTagId: '1',
          name: 'About',
          order: 1,
          url: '/about',
          createdAt: '2024-03-20T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z',
        },
        {
          id: '3',
          pageTagId: '1',
          name: 'Contact',
          order: 2,
          url: '/contact',
          createdAt: '2024-03-20T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z',
        },
      ],
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
    {
      id: '2',
      siteId: 'site1',
      groupName: 'Footer Links',
      tagDetails: [
        {
          id: '4',
          pageTagId: '2',
          name: 'Privacy Policy',
          order: 0,
          url: '/privacy',
          createdAt: '2024-03-20T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z',
        },
        {
          id: '5',
          pageTagId: '2',
          name: 'Terms of Service',
          order: 1,
          url: '/terms',
          createdAt: '2024-03-20T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z',
        },
      ],
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
  ],
};

export function usePageTags(siteId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: pageTags, isLoading } = useQuery<PageTag[]>({
    queryKey: ['page-tags', siteId],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_PAGE_TAGS[siteId] || [];
    },
    enabled: !!siteId,
  });

  const createPageTag = useMutation({
    mutationFn: async (data: PageTagInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newPageTag: PageTag = {
        id: Date.now().toString(),
        siteId,
        groupName: data.groupName,
        tagDetails: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_PAGE_TAGS[siteId] = [...(MOCK_PAGE_TAGS[siteId] || []), newPageTag];
      return newPageTag;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Page tag created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create page tag',
      });
    },
  });

  const updatePageTag = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PageTagInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const pageTagIndex = MOCK_PAGE_TAGS[siteId]?.findIndex(pt => pt.id === id);
      if (pageTagIndex === -1) throw new Error('Page tag not found');
      
      const updatedPageTag = {
        ...MOCK_PAGE_TAGS[siteId][pageTagIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      MOCK_PAGE_TAGS[siteId][pageTagIndex] = updatedPageTag;
      return updatedPageTag;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Page tag updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update page tag',
      });
    },
  });

  const deletePageTag = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      MOCK_PAGE_TAGS[siteId] = MOCK_PAGE_TAGS[siteId]?.filter(pt => pt.id !== id) || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Page tag deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete page tag',
      });
    },
  });

  const createTagDetail = useMutation({
    mutationFn: async ({ pageTagId, data }: { pageTagId: string; data: TagDetailInput }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const pageTagIndex = MOCK_PAGE_TAGS[siteId]?.findIndex(pt => pt.id === pageTagId);
      if (pageTagIndex === -1) throw new Error('Page tag not found');

      const newTagDetail: TagDetail = {
        id: Date.now().toString(),
        pageTagId,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      MOCK_PAGE_TAGS[siteId][pageTagIndex].tagDetails.push(newTagDetail);
      return newTagDetail;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Tag detail created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create tag detail',
      });
    },
  });

  const updateTagDetail = useMutation({
    mutationFn: async ({ id, pageTagId, data }: { id: string; pageTagId: string; data: Partial<TagDetailInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const pageTagIndex = MOCK_PAGE_TAGS[siteId]?.findIndex(pt => pt.id === pageTagId);
      if (pageTagIndex === -1) throw new Error('Page tag not found');

      const tagDetailIndex = MOCK_PAGE_TAGS[siteId][pageTagIndex].tagDetails.findIndex(td => td.id === id);
      if (tagDetailIndex === -1) throw new Error('Tag detail not found');

      const updatedTagDetail = {
        ...MOCK_PAGE_TAGS[siteId][pageTagIndex].tagDetails[tagDetailIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      MOCK_PAGE_TAGS[siteId][pageTagIndex].tagDetails[tagDetailIndex] = updatedTagDetail;
      return updatedTagDetail;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Tag detail updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update tag detail',
      });
    },
  });

  const deleteTagDetail = useMutation({
    mutationFn: async ({ id, pageTagId }: { id: string; pageTagId: string }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const pageTagIndex = MOCK_PAGE_TAGS[siteId]?.findIndex(pt => pt.id === pageTagId);
      if (pageTagIndex === -1) throw new Error('Page tag not found');

      MOCK_PAGE_TAGS[siteId][pageTagIndex].tagDetails = 
        MOCK_PAGE_TAGS[siteId][pageTagIndex].tagDetails.filter(td => td.id !== id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-tags', siteId] });
      toast({
        title: 'Success',
        description: 'Tag detail deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete tag detail',
      });
    },
  });

  return {
    pageTags,
    isLoading,
    createPageTag: createPageTag.mutate,
    isCreating: createPageTag.isPending,
    updatePageTag: updatePageTag.mutate,
    isUpdating: updatePageTag.isPending,
    deletePageTag: deletePageTag.mutate,
    isDeleting: deletePageTag.isPending,
    createTagDetail: createTagDetail.mutate,
    isCreatingDetail: createTagDetail.isPending,
    updateTagDetail: updateTagDetail.mutate,
    isUpdatingDetail: updateTagDetail.isPending,
    deleteTagDetail: deleteTagDetail.mutate,
    isDeletingDetail: deleteTagDetail.isPending,
  };
}