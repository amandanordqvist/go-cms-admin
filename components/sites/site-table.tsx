'use client';

import { DataTable } from '@/components/ui/data-table';
import { columns } from './site-columns';
import { Site } from '@/hooks/use-sites-management';

interface SiteTableProps {
  data: Site[];
  onEdit: (site: Site) => void;
  onDelete: (site: Site) => void;
}

export function SiteTable({ data, onEdit, onDelete }: SiteTableProps) {
  return (
    <DataTable
      columns={columns({ onEdit, onDelete })}
      data={data}
      searchKey="name"
    />
  );
}