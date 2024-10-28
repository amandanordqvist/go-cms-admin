'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FriendLink, FriendLinkPosition, useFriendLinks } from '@/hooks/use-friend-links';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface BulkActionBarProps {
  selectedLinks: FriendLink[];
  onClearSelection: () => void;
  siteId: string;
}

export function BulkActionBar({ selectedLinks, onClearSelection, siteId }: BulkActionBarProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { updateFriendLink, deleteFriendLink } = useFriendLinks(siteId);

  const handleUpdatePosition = async (position: FriendLinkPosition) => {
    try {
      await Promise.all(
        selectedLinks.map(link =>
          updateFriendLink({
            id: link.id,
            data: { position }
          })
        )
      );
      onClearSelection();
    } catch (error) {
      console.error('Failed to update positions:', error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedLinks.map(link => deleteFriendLink(link.id))
      );
      setShowDeleteDialog(false);
      onClearSelection();
    } catch (error) {
      console.error('Failed to delete links:', error);
    }
  };

  return (
    <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-4">
      <span className="text-sm font-medium">
        {selectedLinks.length} item{selectedLinks.length > 1 ? 's' : ''} selected
      </span>

      <Select onValueChange={handleUpdatePosition}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Update position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TOP">Move to Top</SelectItem>
          <SelectItem value="BOTTOM">Move to Bottom</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowDeleteDialog(true)}
      >
        Delete Selected
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearSelection}
      >
        Clear Selection
      </Button>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the selected friend links.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}