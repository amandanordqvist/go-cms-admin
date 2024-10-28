'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useVideos } from '@/hooks/use-videos';
import { useCategories } from '@/hooks/use-categories';
import { Plus, Trash2 } from 'lucide-react';

const videoSourceSchema = z.object({
  playUrl: z.string().url('Must be a valid URL'),
  playerType: z.enum(['dplayer', 'youtube', 'vimeo']),
});

const videoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  coverUrl: z.string().url('Must be a valid URL'),
  categoryId: z.number(),
  isActive: z.boolean().default(true),
  sources: z.array(videoSourceSchema).min(1, 'At least one video source is required'),
});

type VideoFormData = z.infer<typeof videoSchema>;

interface VideoDialogProps {
  type: 'add' | 'edit' | null;
  video?: any;
  open: boolean;
  onClose: () => void;
}

const playerTypes = [
  { label: 'DPlayer', value: 'dplayer' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Vimeo', value: 'vimeo' },
];

export function VideoDialog({ type, video, open, onClose }: VideoDialogProps) {
  const { createVideo, updateVideo, isCreating, isUpdating } = useVideos();
  const { categories } = useCategories();
  const isEditing = type === 'edit';

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: '',
      description: '',
      coverUrl: '',
      categoryId: 1,
      isActive: true,
      sources: [{ playUrl: '', playerType: 'dplayer' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sources',
  });

  useEffect(() => {
    if (video && isEditing) {
      form.reset({
        title: video.title,
        description: video.description,
        coverUrl: video.coverUrl,
        categoryId: video.categoryId,
        isActive: video.isActive,
        sources: video.sources || [{ playUrl: '', playerType: 'dplayer' }],
      });
    } else {
      form.reset();
    }
  }, [video, isEditing, form]);

  const onSubmit = async (data: VideoFormData) => {
    try {
      if (isEditing && video) {
        await updateVideo({ id: video.id, data });
      } else {
        await createVideo(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save video:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Video' : 'Add New Video'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <FormDescription>
                      Enable to make this video publicly accessible
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Video Sources</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ playUrl: '', playerType: 'dplayer' })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Source
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name={`sources.${index}.playUrl`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`sources.${index}.playerType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Player Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select player" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {playerTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-8"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}