'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Permission } from '@/hooks/use-permissions';

interface PermissionViewProps {
  permission: Permission;
  open: boolean;
  onClose: () => void;
}

export function PermissionView({ permission, open, onClose }: PermissionViewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Permission Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p className="text-lg">{permission.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="text-base">{permission.description}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}