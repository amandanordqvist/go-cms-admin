'use client';

import { useState } from 'react';
import { useAdvertisements, Advertisement } from '@/hooks/use-advertisements';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AdvertisementDialog } from './advertisement-dialog';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './advertisement-columns';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdvertisementListProps {
  siteId: string;
}

export function AdvertisementList({ siteId }: AdvertisementListProps) {
  const { advertisements, isLoading } = useAdvertisements(siteId);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const handleAdd = () => {
    setSelectedAd(null);
    setDialogType('add');
  };

  const handleEdit = (ad: Advertisement) => {
    setSelectedAd(ad);
    setDialogType('edit');
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedAd(null);
  };

  const filteredAds = advertisements?.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || ad.type === typeFilter;
    return matchesSearch && matchesType;
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
          Add Advertisement
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search advertisements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="BANNER">Banner</SelectItem>
            <SelectItem value="ICON">Icon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns({ onEdit: handleEdit })}
        data={filteredAds}
        searchKey="title"
      />

      {dialogType && (
        <AdvertisementDialog
          type={dialogType}
          advertisement={selectedAd}
          open={!!dialogType}
          onClose={handleClose}
          siteId={siteId}
        />
      )}
    </div>
  );
}