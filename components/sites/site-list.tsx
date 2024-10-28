'use client';

import { useState } from 'react';
import { useSitesManagement } from '@/hooks/use-sites-management';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SiteDialog } from './site-dialog';
import { SiteTable } from './site-table';
import { SiteSearch } from './site-search';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';

export function SiteList() {
  const { sites, isLoading, createSite, updateSite, deleteSite } = useSitesManagement();
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState<any>(null);

  const handleAdd = () => {
    setSelectedSite(null);
    setDialogType('add');
  };

  const handleEdit = (site: any) => {
    setSelectedSite(site);
    setDialogType('edit');
  };

  const handleDelete = (site: any) => {
    setSiteToDelete(site);
    setShowDeleteDialog(true);
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedSite(null);
  };

  const handleSave = async (data: any) => {
    try {
      if (dialogType === 'edit' && selectedSite) {
        await updateSite({ id: selectedSite.id, data });
      } else {
        await createSite(data);
      }
      handleClose();
    } catch (error) {
      console.error('Failed to save site:', error);
    }
  };

  const confirmDelete = async () => {
    if (siteToDelete) {
      await deleteSite(siteToDelete.id);
      setShowDeleteDialog(false);
      setSiteToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredSites = sites?.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.domain.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Site
        </Button>
      </div>

      <SiteSearch value={searchTerm} onChange={setSearchTerm} />

      <SiteTable
        data={filteredSites}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {dialogType && (
        <SiteDialog
          type={dialogType}
          site={selectedSite}
          open={!!dialogType}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete Site"
        description="This action cannot be undone. This will permanently delete the site and all associated data."
      />
    </div>
  );
}