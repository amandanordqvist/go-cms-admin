'use client';

import { useState } from 'react';
import { usePageFriendLinks } from '@/hooks/use-page-friend-links';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageFriendLinkDialog } from './page-friend-link-dialog';
import { PageFriendLinkTable } from './page-friend-link-table';
import { PageFriendLinkSearch } from './page-friend-link-search';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { usePageFriendLinkActions } from './use-page-friend-link-actions';

interface PageFriendLinkListProps {
  siteId: string;
}

export function PageFriendLinkList({ siteId }: PageFriendLinkListProps) {
  const { pageFriendLinks, isLoading } = usePageFriendLinks(siteId);
  const { handleSave, handleDelete } = usePageFriendLinkActions(siteId);
  
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredLinks = pageFriendLinks?.filter(link =>
    link.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={() => setDialogType('add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Friend Link Group
        </Button>
      </div>

      <PageFriendLinkSearch value={searchTerm} onChange={setSearchTerm} />

      <PageFriendLinkTable
        data={filteredLinks}
        onEdit={(link) => {
          setSelectedLink(link);
          setDialogType('edit');
        }}
        onDelete={(link) => {
          setLinkToDelete(link);
          setShowDeleteDialog(true);
        }}
      />

      {dialogType && (
        <PageFriendLinkDialog
          type={dialogType}
          pageFriendLink={selectedLink}
          open={!!dialogType}
          onClose={() => {
            setDialogType(null);
            setSelectedLink(null);
          }}
          onSave={async (data) => {
            await handleSave(data, selectedLink);
            setDialogType(null);
            setSelectedLink(null);
          }}
          isLoading={isLoading}
        />
      )}

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={async () => {
          if (linkToDelete) {
            await handleDelete(linkToDelete.id);
            setShowDeleteDialog(false);
            setLinkToDelete(null);
          }
        }}
        title="Delete Friend Link Group"
        description="This action cannot be undone. This will permanently delete the friend link group and all its links."
      />
    </div>
  );
}