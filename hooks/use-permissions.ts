'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface PermissionInput {
  name: string;
  description: string;
}

// Mock data
const MOCK_PERMISSIONS: Permission[] = [
  { id: '1', name: 'user:create', description: 'Create users' },
  { id: '2', name: 'user:read', description: 'Read users' },
  { id: '3', name: 'user:update', description: 'Update users' },
  { id: '4', name: 'user:delete', description: 'Delete users' },
  { id: '5', name: 'content:create', description: 'Create content' },
  { id: '6', name: 'content:read', description: 'Read content' },
  { id: '7', name: 'content:update', description: 'Update content' },
  { id: '8', name: 'content:delete', description: 'Delete content' },
];

export function usePermissions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: permissions, isLoading } = useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_PERMISSIONS;
      
      // Real API call (commented out)
      // const response = await fetch('/api/permissions');
      // if (!response.ok) throw new Error('Failed to fetch permissions');
      // return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: PermissionInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newPermission: Permission = {
        id: Date.now().toString(),
        ...data,
      };
      MOCK_PERMISSIONS.push(newPermission);
      return newPermission;
      
      // Real API call (commented out)
      // const response = await fetch('/api/permissions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to create permission');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      toast({
        title: 'Success',
        description: 'Permission created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create permission',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PermissionInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const permissionIndex = MOCK_PERMISSIONS.findIndex(p => p.id === id);
      if (permissionIndex === -1) throw new Error('Permission not found');
      
      const updatedPermission = {
        ...MOCK_PERMISSIONS[permissionIndex],
        ...data,
      };
      MOCK_PERMISSIONS[permissionIndex] = updatedPermission;
      return updatedPermission;
      
      // Real API call (commented out)
      // const response = await fetch(`/api/permissions/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to update permission');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      toast({
        title: 'Success',
        description: 'Permission updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update permission',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = MOCK_PERMISSIONS.findIndex(p => p.id === id);
      if (index > -1) {
        MOCK_PERMISSIONS.splice(index, 1);
      }
      
      // Real API call (commented out)
      // const response = await fetch(`/api/permissions/${id}`, {
      //   method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Failed to delete permission');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      toast({
        title: 'Success',
        description: 'Permission deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete permission',
      });
    },
  });

  return {
    permissions,
    isLoading,
    createPermission: createMutation.mutate,
    isCreating: createMutation.isPending,
    updatePermission: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deletePermission: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}