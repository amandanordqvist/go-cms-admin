'use client';

import { useState } from 'react';
import { usePageTags } from '@/hooks/use-page-tags';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageTagDialog } from './page-tag-dialog';
import { PageTagTable } from './page-tag-table';
import { PageTagSearch } from './page-tag-search';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { usePageTagActions } from './use-page-tag-actions';

interface PageTagListProps {
  siteId: string;
}

export function PageTagList({ siteId }: PageTagListProps) {
  const { pageTags, isLoading } = usePageTags(siteId);
  const { handleSave, handleDelete } = usePageTagActions(siteId);
  
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedTag, setSelectedTag] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredTags = pageTags?.filter(tag =>
    tag.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={() => setDialogType('add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Page Tag Group
        </Button>
      </div>

      <PageTagSearch value={searchTerm} onChange={setSearchTerm} />

      <PageTagTable
        data={filteredTags}
        onEdit={(tag) => {
          setSelectedTag(tag);
          setDialogType('edit');
        }}
        onDelete={(tag) => {
          setTagToDelete(tag);
          setShowDeleteDialog(true);
        }}
      />

      {dialogType && (
        <PageTagDialog
          type={dialogType}
          pageTag={selectedTag}
          open={!!dialogType}
          onClose={() => {
            setDialogType(null);
            setSelectedTag(null);
          }}
          onSave={async (data) => {
            await handleSave(data, selectedTag);
            setDialogType(null);
            setSelectedTag(null);
          }}
          isLoading={isLoading}
        />
      )}

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={async () => {
          if (tagToDelete) {
            await handleDelete(tagToDelete.id);
            setShowDeleteDialog(false);
            setTagToDelete(null);
          }
        }}
        title="Delete Page Tag Group"
        description="This action cannot be undone. This will permanently delete the page tag group and all its tags."
      />
    </div>
  );
}