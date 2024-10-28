'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export type AdvertisementType = 'BANNER' | 'ICON';

export interface Advertisement {
  id: string;
  siteId: string;
  title: string;
  imagePath: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
  order: number;
  type: AdvertisementType;
  createdAt: string;
  updatedAt: string;
}

export interface AdvertisementInput {
  title: string;
  imagePath: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
  order?: number;
  type: AdvertisementType;
}

// Mock data
const MOCK_ADVERTISEMENTS: Record<string, Advertisement[]> = {
  'site1': [
    {
      id: '1',
      siteId: 'site1',
      title: 'Summer Sale',
      imagePath: 'https://example.com/ads/summer-sale.jpg',
      linkUrl: 'https://example.com/summer-sale',
      startDate: '2024-03-20T00:00:00Z',
      endDate: '2024-04-20T00:00:00Z',
      order: 0,
      type: 'BANNER',
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
    {
      id: '2',
      siteId: 'site1',
      title: 'New Product',
      imagePath: 'https://example.com/ads/new-product.jpg',
      linkUrl: 'https://example.com/new-product',
      startDate: '2024-03-20T00:00:00Z',
      endDate: '2024-04-20T00:00:00Z',
      order: 1,
      type: 'ICON',
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
  ],
  'site2': [
    {
      id: '3',
      siteId: 'site2',
      title: 'Special Offer',
      imagePath: 'https://example.com/ads/special-offer.jpg',
      linkUrl: 'https://example.com/special-offer',
      startDate: '2024-03-20T00:00:00Z',
      endDate: '2024-04-20T00:00:00Z',
      order: 0,
      type: 'BANNER',
      createdAt: '2024-03-20T00:00:00Z',
      updatedAt: '2024-03-20T00:00:00Z',
    },
  ],
};

export function useAdvertisements(siteId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: advertisements, isLoading } = useQuery<Advertisement[]>({
    queryKey: ['advertisements', siteId],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ADVERTISEMENTS[siteId] || [];
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/advertisements`);
      // if (!response.ok) throw new Error('Failed to fetch advertisements');
      // return response.json();
    },
    enabled: !!siteId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: AdvertisementInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newAd: Advertisement = {
        id: Date.now().toString(),
        siteId,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_ADVERTISEMENTS[siteId] = [...(MOCK_ADVERTISEMENTS[siteId] || []), newAd];
      return newAd;
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/advertisements`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to create advertisement');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements', siteId] });
      toast({
        title: 'Success',
        description: 'Advertisement created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create advertisement',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AdvertisementInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const adIndex = MOCK_ADVERTISEMENTS[siteId]?.findIndex(a => a.id === id);
      if (adIndex === -1) throw new Error('Advertisement not found');
      
      const updatedAd = {
        ...MOCK_ADVERTISEMENTS[siteId][adIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      MOCK_ADVERTISEMENTS[siteId][adIndex] = updatedAd;
      return updatedAd;
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/advertisements/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to update advertisement');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements', siteId] });
      toast({
        title: 'Success',
        description: 'Advertisement updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update advertisement',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      MOCK_ADVERTISEMENTS[siteId] = MOCK_ADVERTISEMENTS[siteId]?.filter(a => a.id !== id) || [];
      
      // Real API call (commented out)
      // const response = await fetch(`/api/sites/${siteId}/advertisements/${id}`, {
      //   method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Failed to delete advertisement');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements', siteId] });
      toast({
        title: 'Success',
        description: 'Advertisement deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete advertisement',
      });
    },
  });

  return {
    advertisements,
    isLoading,
    createAdvertisement: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateAdvertisement: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteAdvertisement: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}