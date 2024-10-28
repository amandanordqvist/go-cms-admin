'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Role } from '@/hooks/use-roles';

interface RoleViewProps {
  role: Role;
  open: boolean;
  onClose: () => void;
}

export function RoleView({ role, open, onClose }: RoleViewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Role Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p className="text-lg">{role.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="text-base">{role.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Permissions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <Badge key={permission.id} variant="secondary">
                      {permission.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}