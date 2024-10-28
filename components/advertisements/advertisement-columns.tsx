'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Advertisement } from '@/hooks/use-advertisements';

interface ColumnOptions {
  onEdit: (ad: Advertisement) => void;
}

export const columns = ({ onEdit }: ColumnOptions): ColumnDef<Advertisement>[] => [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => new Date(row.original.endDate).toLocaleDateString(),
  },
  {
    accessorKey: 'order',
    header: 'Order',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ad = row.original;

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
            <DropdownMenuItem onClick={() => onEdit(ad)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(ad.linkUrl, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Link
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