'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export interface Site {
  id: string;
  name: string;
  domain: string;
  title?: string;
  keywords?: string;
  description?: string;
  googleAnalyticsId?: string;
  matomoSiteId?: string;
  matomoUrl?: string;
  contactEmail?: string;
  telegramId?: string;
  copyright?: string;
  imageCdnUrl?: string;
  maintenanceMode: boolean;
  maintenanceMsg?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteInput {
  name: string;
  domain: string;
  title?: string;
  keywords?: string;
  description?: string;
  googleAnalyticsId?: string;
  matomoSiteId?: string;
  matomoUrl?: string;
  contactEmail?: string;
  telegramId?: string;
  copyright?: string;
  imageCdnUrl?: string;
  maintenanceMode?: boolean;
  maintenanceMsg?: string;
}

// Mock data
const MOCK_SITES: Site[] = [
  {
    id: 'site1',
    name: 'Main Site',
    domain: 'example.com',
    title: 'Example Site',
    keywords: 'example, site, keywords',
    description: 'An example site description',
    maintenanceMode: false,
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
  {
    id: 'site2',
    name: 'Blog',
    domain: 'blog.example.com',
    title: 'Example Blog',
    keywords: 'blog, example, keywords',
    description: 'An example blog description',
    maintenanceMode: false,
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
];

export function useSitesManagement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: sites, isLoading } = useQuery<Site[]>({
    queryKey: ['sites-management'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_SITES;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: SiteInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newSite: Site = {
        id: Date.now().toString(),
        ...data,
        maintenanceMode: data.maintenanceMode || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_SITES.push(newSite);
      return newSite;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites-management'] });
      toast({
        title: 'Success',
        description: 'Site created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create site',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SiteInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const siteIndex = MOCK_SITES.findIndex(s => s.id === id);
      if (siteIndex === -1) throw new Error('Site not found');
      
      const updatedSite = {
        ...MOCK_SITES[siteIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      MOCK_SITES[siteIndex] = updatedSite;
      return updatedSite;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites-management'] });
      toast({
        title: 'Success',
        description: 'Site updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update site',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = MOCK_SITES.findIndex(s => s.id === id);
      if (index > -1) {
        MOCK_SITES.splice(index, 1);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites-management'] });
      toast({
        title: 'Success',
        description: 'Site deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete site',
      });
    },
  });

  return {
    sites,
    isLoading,
    createSite: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateSite: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteSite: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}