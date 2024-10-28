'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash, ArrowUpDown, ExternalLink, List } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageTag } from '@/hooks/use-page-tags';
import { useRouter } from 'next/navigation';

interface ColumnOptions {
  onEdit: (pageTag: PageTag) => void;
}

export const columns = ({ onEdit }: ColumnOptions): ColumnDef<PageTag>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: 'groupName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Group Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'tagDetails',
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.original.tagDetails.sort((a, b) => a.order - b.order);
        return (
          <div className="space-y-2">
            {tags.slice(0, 3).map((tag) => (
              <div key={tag.id} className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 flex items-center justify-center">
                  {tag.order}
                </Badge>
                <Badge variant="secondary" className="flex-1">
                  {tag.name}
                </Badge>
                {tag.url && (
                  <a
                    href={tag.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
            {tags.length > 3 && (
              <div className="text-sm text-muted-foreground">
                +{tags.length - 3} more tags...
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const pageTag = row.original;

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
              <DropdownMenuItem 
                onClick={() => router.push(`/dashboard/sites/${pageTag.siteId}/page-tags/${pageTag.id}`)}
              >
                <List className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(pageTag)}>
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
};