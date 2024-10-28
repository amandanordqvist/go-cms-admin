'use client';

import { Category } from '@/hooks/use-categories';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface CategoryTreeProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onView: (category: Category) => void;
  level?: number;
}

export function CategoryTree({ categories, onEdit, onView, level = 0 }: CategoryTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCategory = (category: Category) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expanded[category.id];

    return (
      <div key={category.id} className="border-b last:border-b-0">
        <div className={`flex items-center gap-2 p-2 hover:bg-muted/50 ${level > 0 ? 'pl-8' : ''}`}>
          {hasChildren && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => toggleExpand(category.id)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          {!hasChildren && <div className="w-6" />}
          <div className="flex-1 flex items-center gap-2">
            <span>{category.name}</span>
            <Badge variant={category.isActive ? 'default' : 'secondary'}>
              {category.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <Badge variant="outline">{category.type}</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(category)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(category)}>
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
        </div>
        {hasChildren && isExpanded && (
          <CategoryTree
            categories={category.children}
            onEdit={onEdit}
            onView={onView}
            level={level + 1}
          />
        )}
      </div>
    );
  };

  return <div className="divide-y">{categories.map(renderCategory)}</div>;
}