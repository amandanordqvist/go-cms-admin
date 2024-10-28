'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TagDetail } from '@/hooks/use-page-tags';

const tagDetailSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  order: z.number().int().min(0),
});

type TagDetailFormData = z.infer<typeof tagDetailSchema>;

interface TagDetailDialogProps {
  type: 'add' | 'edit';
  tagDetail: TagDetail | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: TagDetailFormData) => Promise<void>;
  isLoading?: boolean;
}

export function TagDetailDialog({
  type,
  tagDetail,
  open,
  onClose,
  onSave,
  isLoading,
}: TagDetailDialogProps) {
  const isEditing = type === 'edit';

  const form = useForm<TagDetailFormData>({
    resolver: zodResolver(tagDetailSchema),
    defaultValues: {
      name: '',
      url: '',
      order: 0,
    },
  });

  useEffect(() => {
    if (tagDetail && isEditing) {
      form.reset({
        name: tagDetail.name,
        url: tagDetail.url || '',
        order: tagDetail.order,
      });
    } else {
      form.reset();
    }
  }, [tagDetail, isEditing, form]);

  const onSubmit = async (data: TagDetailFormData) => {
    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Failed to save tag detail:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Tag' : 'Add New Tag'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}