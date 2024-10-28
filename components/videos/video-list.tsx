'use client';

import { useState } from 'react';
import { useVideos } from '@/hooks/use-videos';
import { useCategories } from '@/hooks/use-categories';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Plus } from 'lucide-react';
import { columns } from './video-columns';
import { VideoDialog } from './video-dialog';
import { VideoView } from './video-view';

export function VideoList() {
  const { videos, isLoading } = useVideos();
  const { categories } = useCategories();
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleAdd = () => {
    setSelectedVideo(null);
    setDialogType('add');
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setDialogType('edit');
  };

  const handleView = (video) => {
    setSelectedVideo(video);
    setDialogType('view');
  };

  const handleClose = () => {
    setDialogType(null);
    setSelectedVideo(null);
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
        <div className="flex gap-2">
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns({ 
          onEdit: handleEdit, 
          onView: handleView,
          categories: categories || []
        })}
        data={videos || []}
        searchKey="title"
      />

      {dialogType && dialogType !== 'view' && (
        <VideoDialog
          type={dialogType}
          video={selectedVideo}
          open={dialogType === 'add' || dialogType === 'edit'}
          onClose={handleClose}
        />
      )}

      {dialogType === 'view' && selectedVideo && (
        <VideoView
          video={selectedVideo}
          open={dialogType === 'view'}
          onClose={handleClose}
        />
      )}
    </div>
  );
}