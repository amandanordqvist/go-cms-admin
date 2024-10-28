'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-config';
import { useToast } from '@/hooks/use-toast';

export type FriendLinkPosition = 'TOP' | 'BOTTOM';

export interface FriendLink {
  id: string;
  name: string;
  url: string;
  logoUrl?: string | null;
  order: number;
  position: FriendLinkPosition;
  siteId: string;
}

interface CreateFriendLinkData {
  name: string;
  url: string;
  logoUrl?: string;
  order: number;
  position: FriendLinkPosition;
}

interface UpdateFriendLinkParams {
  id: string;
  data: Partial<CreateFriendLinkData>;
}

// Mock data for development
const MOCK_FRIEND_LINKS: FriendLink[] = [
  {
    id: '1',
    name: 'Example Site 1',
    url: 'https://example1.com',
    logoUrl: 'https://example1.com/logo.png',
    order: 1,
    position: 'TOP',
    siteId: 'site1',
  },
  {
    id: '2',
    name: 'Example Site 2',
    url: 'https://example2.com',
    logoUrl: null,
    order: 2,
    position: 'BOTTOM',
    siteId: 'site1',
  },
];

export function useFriendLinks(siteId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: friendLinks, isLoading } = useQuery({
    queryKey: ['friendLinks', siteId],
    queryFn: async () => {
      // Simulated API call
      // In production, use: return fetchApi(`/api/sites/${siteId}/friend-links`);
      return MOCK_FRIEND_LINKS.filter(link => link.siteId === siteId);
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateFriendLinkData) => {
      // Simulated API call
      // In production, use: return fetchApi(`/api/sites/${siteId}/friend-links`, {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      // });
      return {
        ...data,
        id: Math.random().toString(),
        siteId,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendLinks', siteId] });
      toast({
        title: 'Success',
        description: 'Friend link created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create friend link',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: UpdateFriendLinkParams) => {
      // Simulated API call
      // In production, use: return fetchApi(`/api/sites/${siteId}/friend-links/${id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(data),
      // });
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendLinks', siteId] });
      toast({
        title: 'Success',
        description: 'Friend link updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update friend link',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulated API call
      // In production, use: return fetchApi(`/api/sites/${siteId}/friend-links/${id}`, {
      //   method: 'DELETE',
      // });
      return { id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendLinks', siteId] });
      toast({
        title: 'Success',
        description: 'Friend link deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete friend link',
      });
    },
  });

  return {
    friendLinks,
    isLoading,
    createFriendLink: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateFriendLink: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteFriendLink: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}