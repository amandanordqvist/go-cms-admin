'use client';

import { useCallback } from 'react';
import { usePageTags } from '@/hooks/use-page-tags';

export function usePageTagActions(siteId: string) {
  const { createPageTag, updatePageTag, deletePageTag } = usePageTags(siteId);

  const handleSave = useCallback(async (data: any, selectedTag: any | null) => {
    if (selectedTag) {
      await updatePageTag({ id: selectedTag.id, data });
    } else {
      await createPageTag({ ...data, siteId });
    }
  }, [createPageTag, updatePageTag, siteId]);

  const handleDelete = useCallback(async (id: string) => {
    await deletePageTag(id);
  }, [deletePageTag]);

  return {
    handleSave,
    handleDelete,
  };
}