'use client';

import { useState } from 'react';
import { useRoles, Role } from '@/hooks/use-roles';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { RoleDialog } from './role-dialog';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './role-columns';

export function RoleList() {
  const { roles, isLoading } = useRoles();
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleAdd = () => {
    setSelectedRole(null);
    setDialogType('add');
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setDialogType('edit');
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedRole(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <DataTable
        columns={columns({ onEdit: handleEdit })}
        data={roles || []}
        searchKey="name"
      />

      {dialogType && (
        <RoleDialog
          type={dialogType}
          role={selectedRole}
          open={!!dialogType}
          onClose={handleClose}
        />
      )}
    </div>
  );
}