'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, Edit, Trash, Play } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Category } from '@/hooks/use-categories';

interface Video {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  views: number;
  isActive: boolean;
  categoryId: number;
  createdAt: string;
}

interface ColumnOptions {
  onEdit: (video: Video) => void;
  onView: (video: Video) => void;
  categories: Category[];
}

export const columns = ({ onEdit, onView, categories }: ColumnOptions): ColumnDef<Video>[] => [
  {
    accessorKey: 'coverUrl',
    header: 'Cover',
    cell: ({ row }) => (
      <div className="relative w-24 h-16 group">
        <img
          src={row.original.coverUrl}
          alt={row.original.title}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
          <Play className="h-6 w-6 text-white" />
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.title}</p>
        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
          {row.original.description}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row }) => {
      const category = categories?.find(c => c.id === row.original.categoryId);
      return (
        <Badge variant="outline">
          {category?.name || 'Uncategorized'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'views',
    header: 'Views',
    cell: ({ row }) => (
      <span className="font-medium">
        {new Intl.NumberFormat().format(row.original.views)}
      </span>
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const video = row.original;

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
            <DropdownMenuItem onClick={() => onView(video)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(video)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
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