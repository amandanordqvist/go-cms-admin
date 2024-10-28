'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryViewProps {
  category: any;
  open: boolean;
  onClose: () => void;
}

export function CategoryView({ category, open, onClose }: CategoryViewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p className="text-lg">{category.name}</p>
              </div>
              {category.url && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">URL</h3>
                  <p className="text-base">{category.url}</p>
                </div>
              )}
              <div className="flex gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                  <Badge variant="outline">{category.type}</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <Badge variant={category.isActive ? 'default' : 'secondary'}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Order</h3>
                  <p>{category.order}</p>
                </div>
              </div>
              {category.parentId && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Parent Category</h3>
                  <p>{category.parentId}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                <p>{new Date(category.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Updated At</h3>
                <p>{new Date(category.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}