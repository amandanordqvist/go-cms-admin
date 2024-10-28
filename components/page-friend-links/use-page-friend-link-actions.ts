'use client';

import { useCallback } from 'react';
import { usePageFriendLinks } from '@/hooks/use-page-friend-links';

export function usePageFriendLinkActions(siteId: string) {
  const { createPageFriendLink, updatePageFriendLink, deletePageFriendLink } = usePageFriendLinks(siteId);

  const handleSave = useCallback(async (data: any, selectedLink: any | null) => {
    if (selectedLink) {
      await updatePageFriendLink({ id: selectedLink.id, data });
    } else {
      await createPageFriendLink({ ...data, siteId });
    }
  }, [createPageFriendLink, updatePageFriendLink, siteId]);

  const handleDelete = useCallback(async (id: string) => {
    await deletePageFriendLink(id);
  }, [deletePageFriendLink]);

  return {
    handleSave,
    handleDelete,
  };
}