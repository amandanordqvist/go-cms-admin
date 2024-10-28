'use client';

import { useState } from 'react';
import { usePermissions, Permission } from '@/hooks/use-permissions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PermissionDialog } from './permission-dialog';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './permission-columns';

export function PermissionList() {
  const { permissions, isLoading } = usePermissions();
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  const handleAdd = () => {
    setSelectedPermission(null);
    setDialogType('add');
  };

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setDialogType('edit');
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedPermission(null);
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
          Add Permission
        </Button>
      </div>

      <DataTable
        columns={columns({ onEdit: handleEdit })}
        data={permissions || []}
        searchKey="name"
      />

      {dialogType && (
        <PermissionDialog
          type={dialogType}
          permission={selectedPermission}
          open={!!dialogType}
          onClose={handleClose}
        />
      )}
    </div>
  );
}