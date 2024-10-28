'use client';

import { useState } from 'react';
import { useFriendLinks, FriendLink } from '@/hooks/use-friend-links';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FriendLinkDialog } from './friend-link-dialog';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './friend-link-columns';
import { BulkActionBar } from './bulk-action-bar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FriendLinkListProps {
  siteId: string;
}

export function FriendLinkList({ siteId }: FriendLinkListProps) {
  const { friendLinks, isLoading } = useFriendLinks(siteId);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedLink, setSelectedLink] = useState<FriendLink | null>(null);
  const [selectedLinks, setSelectedLinks] = useState<FriendLink[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');

  const handleAdd = () => {
    setSelectedLink(null);
    setDialogType('add');
  };

  const handleEdit = (link: FriendLink) => {
    setSelectedLink(link);
    setDialogType('edit');
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedLink(null);
  };

  const filteredLinks = friendLinks?.filter(link => {
    const matchesSearch = link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'all' || link.position === positionFilter;
    return matchesSearch && matchesPosition;
  }) || [];

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
          Add Friend Link
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search friend links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select
          value={positionFilter}
          onValueChange={setPositionFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            <SelectItem value="TOP">Top</SelectItem>
            <SelectItem value="BOTTOM">Bottom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedLinks.length > 0 && (
        <BulkActionBar
          selectedLinks={selectedLinks}
          onClearSelection={() => setSelectedLinks([])}
          siteId={siteId}
        />
      )}

      <DataTable
        columns={columns({ onEdit: handleEdit })}
        data={filteredLinks}
        searchKey="name"
        onRowSelection={setSelectedLinks}
      />

      {dialogType && (
        <FriendLinkDialog
          type={dialogType}
          friendLink={selectedLink}
          open={!!dialogType}
          onClose={handleClose}
          siteId={siteId}
        />
      )}
    </div>
  );
}