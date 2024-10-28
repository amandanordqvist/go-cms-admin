'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useCategories } from '@/hooks/use-categories';

interface VideoViewProps {
  video: any;
  open: boolean;
  onClose: () => void;
}

export function VideoView({ video, open, onClose }: VideoViewProps) {
  const { categories } = useCategories();
  const category = categories?.find(c => c.id === video.categoryId);

  const renderVideoPlayer = (source: any) => {
    switch (source.playerType) {
      case 'youtube':
        return (
          <iframe
            src={source.playUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      case 'vimeo':
        return (
          <iframe
            src={source.playUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        );
      default: // dplayer or others
        return (
          <video
            src={source.playUrl}
            controls
            className="w-full h-full"
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Video Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px]">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div>
                <img
                  src={video.coverUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                  <p className="text-lg">{video.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="text-base">{video.description}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                    <Badge variant="outline">
                      {category?.name || 'Uncategorized'}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge variant={video.isActive ? 'default' : 'secondary'}>
                      {video.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Views</h3>
                    <p>{video.views}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                  <p>{new Date(video.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview">
              {video.sources?.map((source: any, index: number) => (
                <div key={source.id} className="space-y-4">
                  <h3 className="text-sm font-medium">Source {index + 1}</h3>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    {renderVideoPlayer(source)}
                  </AspectRatio>
                  <div className="text-sm text-muted-foreground">
                    <p>Player Type: {source.playerType}</p>
                    <p>URL: {source.playUrl}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}