'use client';

import { DataTable } from '@/components/ui/data-table';
import { columns } from './page-tag-columns';

interface PageTagTableProps {
  data: any[];
  onEdit: (tag: any) => void;
  onDelete: (tag: any) => void;
}

export function PageTagTable({ data, onEdit, onDelete }: PageTagTableProps) {
  return (
    <DataTable
      columns={columns({ onEdit, onDelete })}
      data={data}
      searchKey="groupName"
    />
  );
}