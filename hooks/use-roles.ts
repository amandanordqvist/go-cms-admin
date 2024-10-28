'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface RoleInput {
  name: string;
  description: string;
  permissionIds?: string[];
}

// Mock data
const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: [
      { id: '1', name: 'user:create', description: 'Create users' },
      { id: '2', name: 'user:read', description: 'Read users' },
      { id: '3', name: 'user:update', description: 'Update users' },
      { id: '4', name: 'user:delete', description: 'Delete users' },
    ],
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Content management access',
    permissions: [
      { id: '5', name: 'content:create', description: 'Create content' },
      { id: '6', name: 'content:read', description: 'Read content' },
      { id: '7', name: 'content:update', description: 'Update content' },
    ],
  },
];

export function useRoles() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: roles, isLoading } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ROLES;
      
      // Real API call (commented out)
      // const response = await fetch('/api/roles');
      // if (!response.ok) throw new Error('Failed to fetch roles');
      // return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: RoleInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newRole: Role = {
        id: Date.now().toString(),
        ...data,
        permissions: [],
      };
      MOCK_ROLES.push(newRole);
      return newRole;
      
      // Real API call (commented out)
      // const response = await fetch('/api/roles', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to create role');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: 'Success',
        description: 'Role created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create role',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<RoleInput> }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const roleIndex = MOCK_ROLES.findIndex(r => r.id === id);
      if (roleIndex === -1) throw new Error('Role not found');
      
      const updatedRole = {
        ...MOCK_ROLES[roleIndex],
        ...data,
      };
      MOCK_ROLES[roleIndex] = updatedRole;
      return updatedRole;
      
      // Real API call (commented out)
      // const response = await fetch(`/api/roles/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to update role');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: 'Success',
        description: 'Role updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update role',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = MOCK_ROLES.findIndex(r => r.id === id);
      if (index > -1) {
        MOCK_ROLES.splice(index, 1);
      }
      
      // Real API call (commented out)
      // const response = await fetch(`/api/roles/${id}`, {
      //   method: 'DELETE',
      // });
      // if (!response.ok) throw new Error('Failed to delete role');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: 'Success',
        description: 'Role deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete role',
      });
    },
  });

  const assignPermissionsMutation = useMutation({
    mutationFn: async ({ roleId, permissionIds }: { roleId: string; permissionIds: string[] }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const roleIndex = MOCK_ROLES.findIndex(r => r.id === roleId);
      if (roleIndex === -1) throw new Error('Role not found');
      
      // Update permissions
      MOCK_ROLES[roleIndex].permissions = permissionIds.map(id => ({
        id,
        name: `permission:${id}`,
        description: `Permission ${id}`,
      }));
      
      // Real API call (commented out)
      // const response = await fetch(`/api/roles/${roleId}/permissions`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ permissionIds }),
      // });
      // if (!response.ok) throw new Error('Failed to assign permissions');
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: 'Success',
        description: 'Permissions assigned successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to assign permissions',
      });
    },
  });

  return {
    roles,
    isLoading,
    createRole: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateRole: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteRole: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    assignPermissions: assignPermissionsMutation.mutate,
    isAssigningPermissions: assignPermissionsMutation.isPending,
  };
}