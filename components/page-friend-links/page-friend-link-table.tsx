'use client';

import { DataTable } from '@/components/ui/data-table';
import { columns } from './page-friend-link-columns';

interface PageFriendLinkTableProps {
  data: any[];
  onEdit: (link: any) => void;
  onDelete: (link: any) => void;
}

export function PageFriendLinkTable({ data, onEdit, onDelete }: PageFriendLinkTableProps) {
  return (
    <DataTable
      columns={columns({ onEdit, onDelete })}
      data={data}
      searchKey="groupName"
    />
  );
}