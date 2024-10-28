'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Role } from '@/hooks/use-roles';

interface ColumnOptions {
  onEdit: (role: Role) => void;
}

export const columns = ({ onEdit }: ColumnOptions): ColumnDef<Role>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.permissions.slice(0, 3).map((permission) => (
          <Badge key={permission.id} variant="secondary">
            {permission.name}
          </Badge>
        ))}
        {row.original.permissions.length > 3 && (
          <Badge variant="secondary">
            +{row.original.permissions.length - 3} more
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const role = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(role)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(role)}>
              <Shield className="mr-2 h-4 w-4" />
              Manage Permissions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];