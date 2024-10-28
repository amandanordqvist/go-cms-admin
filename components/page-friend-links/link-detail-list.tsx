'use client';

import { useState } from 'react';
import { usePageFriendLinks, LinkDetail } from '@/hooks/use-page-friend-links';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { LinkDetailDialog } from './link-detail-dialog';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './link-detail-columns';
import { Input } from '@/components/ui/input';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';

interface LinkDetailListProps {
  siteId: string;
  groupId: string;
  linkDetails: LinkDetail[];
}

export function LinkDetailList({ siteId, groupId, linkDetails }: LinkDetailListProps) {
  const { createLinkDetail, updateLinkDetail, deleteLinkDetail } = usePageFriendLinks(siteId);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedLink, setSelectedLink] = useState<LinkDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<LinkDetail | null>(null);

  const handleAdd = () => {
    setSelectedLink(null);
    setDialogType('add');
  };

  const handleEdit = (link: LinkDetail) => {
    setSelectedLink(link);
    setDialogType('edit');
  };

  const handleDelete = (link: LinkDetail) => {
    setLinkToDelete(link);
    setShowDeleteDialog(true);
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedLink(null);
  };

  const handleSave = async (data: any) => {
    try {
      if (dialogType === 'edit' && selectedLink) {
        await updateLinkDetail({ id: selectedLink.id, groupId, data });
      } else {
        await createLinkDetail({ ...data, groupId });
      }
      handleClose();
    } catch (error) {
      console.error('Failed to save link:', error);
    }
  };

  const confirmDelete = async () => {
    if (linkToDelete) {
      await deleteLinkDetail({ id: linkToDelete.id, groupId });
      setShowDeleteDialog(false);
      setLinkToDelete(null);
    }
  };

  const filteredLinks = linkDetails.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <DataTable
        columns={columns({ onEdit: handleEdit, onDelete: handleDelete })}
        data={filteredLinks}
        searchKey="name"
      />

      {dialogType && (
        <LinkDetailDialog
          type={dialogType}
          link={selectedLink}
          open={!!dialogType}
          onClose={handleClose}
          onSave={handleSave}
          siteId={siteId}
          groupId={groupId}
        />
      )}

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete Link"
        description="This action cannot be undone. This will permanently delete the link."
      />
    </div>
  );
}