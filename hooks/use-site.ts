'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useQuery } from '@tanstack/react-query';

export interface Site {
  id: string;
  name: string;
  domain: string;
  title?: string;
  description?: string;
  keywords?: string;
  imageCdnUrl?: string;
  maintenanceMode: boolean;
  maintenanceMsg?: string;
}

interface SiteStore {
  currentSite: Site | null;
  setCurrentSite: (site: Site | null) => void;
}

export const useSiteStore = create<SiteStore>()(
  persist(
    (set) => ({
      currentSite: null,
      setCurrentSite: (site) => set({ currentSite: site }),
    }),
    {
      name: 'site-storage',
    }
  )
);

// Mock data for development
const MOCK_SITES: Site[] = [
  {
    id: 'global',
    name: 'Global',
    domain: '*',
    maintenanceMode: false,
  },
  {
    id: 'site1',
    name: 'Main Site',
    domain: 'example.com',
    title: 'Example Site',
    maintenanceMode: false,
  },
  {
    id: 'site2',
    name: 'Blog',
    domain: 'blog.example.com',
    title: 'Example Blog',
    maintenanceMode: false,
  },
];

export function useSites() {
  const { currentSite, setCurrentSite } = useSiteStore();

  const { data: sites, isLoading } = useQuery<Site[]>({
    queryKey: ['sites'],
    queryFn: async () => {
      // Simulate API call in development
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_SITES;
      
      // Real API call (commented out)
      // const response = await fetch('/api/sites');
      // if (!response.ok) throw new Error('Failed to fetch sites');
      // return response.json();
    },
  });

  return {
    sites,
    isLoading,
    currentSite,
    setCurrentSite,
  };
}