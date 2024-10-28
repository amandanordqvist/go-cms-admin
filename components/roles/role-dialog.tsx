'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTabs,
  DialogTab,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useRoles, Role } from '@/hooks/use-roles';
import { usePermissions } from '@/hooks/use-permissions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const roleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleDialogProps {
  type: 'add' | 'edit';
  role: Role | null;
  open: boolean;
  onClose: () => void;
}

export function RoleDialog({ type, role, open, onClose }: RoleDialogProps) {
  const { createRole, updateRole, assignPermissions, isCreating, isUpdating } = useRoles();
  const { permissions } = usePermissions();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const isEditing = type === 'edit';

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (role && isEditing) {
      form.reset({
        name: role.name,
        description: role.description,
      });
      setSelectedPermissions(role.permissions.map(p => p.id));
    } else {
      form.reset();
      setSelectedPermissions([]);
    }
  }, [role, isEditing, form]);

  const onSubmit = async (data: RoleFormData) => {
    try {
      if (isEditing && role) {
        await updateRole({ id: role.id, data });
        if (selectedPermissions.length > 0) {
          await assignPermissions({
            roleId: role.id,
            permissionIds: selectedPermissions,
          });
        }
      } else {
        const newRole = await createRole(data);
        if (selectedPermissions.length > 0) {
          await assignPermissions({
            roleId: newRole.id,
            permissionIds: selectedPermissions,
          });
        }
      }
      onClose();
    } catch (error) {
      console.error('Failed to save role:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Role' : 'Add New Role'}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Role Details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating || isUpdating}>
                    {isCreating || isUpdating ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="permissions">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {permissions?.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-3 space-y-0">
                    <Checkbox
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        setSelectedPermissions(prev =>
                          checked
                            ? [...prev, permission.id]
                            : prev.filter(id => id !== permission.id)
                        );
                      }}
                    />
                    <div className="space-y-1 leading-none">
                      <p className="font-medium">{permission.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}