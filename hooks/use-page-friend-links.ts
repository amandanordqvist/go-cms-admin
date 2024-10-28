'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export interface LinkDetail {
  id: string;
  name: string;
  order: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageFriendLink {
  id: string;
  siteId: string;
  groupName: string;
  linkDetails: LinkDetail[];
  createdAt: string;
  updatedAt: string;
}

export interface PageFriendLinkInput {
  groupName: string;
  linkDetails: {
    name: string;
    order: number;
    url: string;
  }[];
}

// Mock data
const MOCK_PAGE_FRIEND_LINKS: Record<string, PageFriendLink[]> = {
  'site1': [
    {
      id: '1',
      siteId: 'site1',
      groupName: 'Partner Sites',
      linkDetails: [
        {
          id: '1',
          name: 'Partner A',
          order: 0,
          url: 'https://partner-a.com',
          createdAt: '2024-03-20T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z',
        },
        {
          id: '2',
          name: 'Partner B',
          order: 1,
          url: 'https://partner-b.com',
          createdAt: '2024-03-20T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z',
        },
      ],
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
  ],
};

export function usePageFriendLinks(siteId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: pageFriendLinks, isLoading } = useQuery<PageFriendLink[]>({
    queryKey: ['page-friend-links', siteId],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_PAGE_FRIEND_LINKS[siteId] || [];
    },
    enabled: !!siteId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: PageFriendLinkInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newPageFriendLink: PageFriendLink = {
        id: Date.now().toString(),
        siteId,
        ...data,
        linkDetails: data.linkDetails.map((detail, index) => ({
          id: `${Date.now()}-${index}`,
          ...detail,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_PAGE_FRIEND_LINKS[siteId] = [...(MOCK_PAGE_FRIEND_LINKS[siteId] || []), newPageFriendLink];
      return newPageFriendLink;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-friend-links', siteId] });
      toast({
        title: 'Success',
        description: 'Page friend link created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create page friend link',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PageFriendLinkInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const pageFriendLinkIndex = MOCK_PAGE_FRIEND_LINKS[siteId]?.findIndex(pfl => pfl.id === id);
      if (pageFriendLinkIndex === -1) throw new Error('Page friend link not found');
      
      const updatedPageFriendLink = {
        ...MOCK_PAGE_FRIEND_LINKS[siteId][pageFriendLinkIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      MOCK_PAGE_FRIEND_LINKS[siteId][pageFriendLinkIndex] = updatedPageFriendLink;
      return updatedPageFriendLink;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-friend-links', siteId] });
      toast({
        title: 'Success',
        description: 'Page friend link updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update page friend link',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      MOCK_PAGE_FRIEND_LINKS[siteId] = MOCK_PAGE_FRIEND_LINKS[siteId]?.filter(pfl => pfl.id !== id) || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-friend-links', siteId] });
      toast({
        title: 'Success',
        description: 'Page friend link deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete page friend link',
      });
    },
  });

  return {
    pageFriendLinks,
    isLoading,
    createPageFriendLink: createMutation.mutate,
    isCreating: createMutation.isPending,
    updatePageFriendLink: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deletePageFriendLink: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}