'use client';

import { useState } from 'react';
import { usePageTags, TagDetail } from '@/hooks/use-page-tags';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TagDetailDialog } from './tag-detail-dialog';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tag-detail-columns';
import { Input } from '@/components/ui/input';
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

interface TagDetailListProps {
  pageTagId: string;
  siteId: string;
}

export function TagDetailList({ pageTagId, siteId }: TagDetailListProps) {
  const { tagDetails, isLoading, createTagDetail, updateTagDetail, deleteTagDetail } = usePageTags(siteId);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedTag, setSelectedTag] = useState<TagDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<TagDetail | null>(null);

  const handleAdd = () => {
    setSelectedTag(null);
    setDialogType('add');
  };

  const handleEdit = (tag: TagDetail) => {
    setSelectedTag(tag);
    setDialogType('edit');
  };

  const handleDelete = (tag: TagDetail) => {
    setTagToDelete(tag);
    setShowDeleteDialog(true);
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedTag(null);
  };

  const handleSave = async (data: any) => {
    if (dialogType === 'edit' && selectedTag) {
      await updateTagDetail({ id: selectedTag.id, data });
    } else {
      await createTagDetail({ ...data, pageTagId });
    }
  };

  const confirmDelete = async () => {
    if (tagToDelete) {
      await deleteTagDetail(tagToDelete.id);
      setShowDeleteDialog(false);
      setTagToDelete(null);
    }
  };

  const filteredTags = tagDetails?.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <DataTable
        columns={columns({ onEdit: handleEdit, onDelete: handleDelete })}
        data={filteredTags}
        searchKey="name"
      />

      {dialogType && (
        <TagDetailDialog
          type={dialogType}
          tagDetail={selectedTag}
          open={!!dialogType}
          onClose={handleClose}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the tag.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
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