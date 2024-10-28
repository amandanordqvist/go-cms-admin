'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const MOCK_VIDEOS = [
  {
    id: '1',
    title: 'Introduction to Next.js',
    description: 'Learn the basics of Next.js framework',
    coverUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    views: 1200,
    isActive: true,
    createdAt: '2024-03-20T10:00:00Z',
    categoryId: 1,
    sources: [
      {
        id: '1',
        playUrl: 'https://example.com/video1.mp4',
        playerType: 'dplayer'
      }
    ]
  },
  // Add more mock videos as needed
];

export interface Video {
  id: string;
  title: string;
  description?: string;
  coverUrl: string;
  views: number;
  isActive: boolean;
  createdAt: string;
  categoryId: number;
  sources?: VideoSource[];
}

export interface VideoSource {
  id: string;
  playUrl: string;
  playerType: string;
}

export interface VideoInput {
  title: string;
  description?: string;
  coverUrl: string;
  isActive: boolean;
  categoryId?: number;
}

export function useVideos() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ['videos'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_VIDEOS;
      
      // Real API call (commented out)
      // const response = await fetch('/api/videos');
      // if (!response.ok) throw new Error('Failed to fetch videos');
      // return response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: VideoInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...data, id: Date.now().toString() };
      
      // Real API call (commented out)
      // const response = await fetch('/api/videos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) throw new Error('Failed to create video');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({
        title: 'Success',
        description: 'Video created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create video',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<VideoInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...data, id };
      
      // Real API call (commented out)
      // const response = await fetch(`/api/videos/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) throw new Error('Failed to update video');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({
        title: 'Success',
        description: 'Video updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update video',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Real API call (commented out)
      // const response = await fetch(`/api/videos/${id}`, {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error('Failed to delete video');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({
        title: 'Success',
        description: 'Video deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete video',
      });
    },
  });

  return {
    videos,
    isLoading,
    createVideo: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateVideo: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteVideo: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}