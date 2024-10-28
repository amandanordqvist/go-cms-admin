'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-config';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export function VideoManagement() {
  const [page, setPage] = useState(1);

  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos', page],
    queryFn: () => fetchApi<Video[]>(`/api/videos?page=${page}`),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Video Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Video
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos?.map((video) => (
              <TableRow key={video.id}>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.status}</TableCell>
                <TableCell>
                  {new Date(video.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}