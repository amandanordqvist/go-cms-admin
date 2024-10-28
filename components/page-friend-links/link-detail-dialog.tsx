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
import { LinkDetail } from '@/hooks/use-page-friend-links';

const linkDetailSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL'),
  order: z.number().int().min(0),
});

type LinkDetailFormData = z.infer<typeof linkDetailSchema>;

interface LinkDetailDialogProps {
  type: 'add' | 'edit';
  link: LinkDetail | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: LinkDetailFormData) => Promise<void>;
  siteId: string;
  groupId: string;
}

export function LinkDetailDialog({
  type,
  link,
  open,
  onClose,
  onSave,
  siteId,
  groupId,
}: LinkDetailDialogProps) {
  const isEditing = type === 'edit';

  const form = useForm<LinkDetailFormData>({
    resolver: zodResolver(linkDetailSchema),
    defaultValues: {
      name: '',
      url: '',
      order: 0,
    },
  });

  useEffect(() => {
    if (link && isEditing) {
      form.reset({
        name: link.name,
        url: link.url,
        order: link.order,
      });
    } else {
      form.reset({
        name: '',
        url: '',
        order: 0,
      });
    }
  }, [link, isEditing, form]);

  const onSubmit = async (data: LinkDetailFormData) => {
    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Failed to save link:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Link' : 'Add New Link'}
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
                  <FormLabel>URL</FormLabel>
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
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}