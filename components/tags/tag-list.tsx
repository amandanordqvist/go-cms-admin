'use client';

import { useState } from 'react';
import { useSiteTags, Tag } from '@/hooks/use-site-tags';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TagDialog } from './tag-dialog';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tag-columns';

interface TagListProps {
  siteId: string;
}

export function TagList({ siteId }: TagListProps) {
  const { tags, isLoading } = useSiteTags(siteId);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const handleAdd = () => {
    setSelectedTag(null);
    setDialogType('add');
  };

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag);
    setDialogType('edit');
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedTag(null);
  };

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

      <DataTable
        columns={columns({ onEdit: handleEdit })}
        data={tags || []}
        searchKey="name"
      />

      {dialogType && (
        <TagDialog
          type={dialogType}
          tag={selectedTag}
          open={!!dialogType}
          onClose={handleClose}
          siteId={siteId}
        />
      )}
    </div>
  );
}