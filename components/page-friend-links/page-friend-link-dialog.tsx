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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePageFriendLinks, PageFriendLink } from '@/hooks/use-page-friend-links';
import { Plus, Trash2 } from 'lucide-react';

const linkDetailSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL'),
  order: z.number().int().min(0),
});

const pageFriendLinkSchema = z.object({
  groupName: z.string().min(1, 'Group name is required'),
  linkDetails: z.array(linkDetailSchema).min(1, 'At least one link is required'),
});

type PageFriendLinkFormData = z.infer<typeof pageFriendLinkSchema>;

interface PageFriendLinkDialogProps {
  type: 'add' | 'edit';
  pageFriendLink: PageFriendLink | null;
  open: boolean;
  onClose: () => void;
  siteId: string;
}

export function PageFriendLinkDialog({
  type,
  pageFriendLink,
  open,
  onClose,
  siteId,
}: PageFriendLinkDialogProps) {
  const { createPageFriendLink, updatePageFriendLink, isCreating, isUpdating } = usePageFriendLinks(siteId);
  const isEditing = type === 'edit';

  const form = useForm<PageFriendLinkFormData>({
    resolver: zodResolver(pageFriendLinkSchema),
    defaultValues: {
      groupName: '',
      linkDetails: [{ name: '', url: '', order: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'linkDetails',
  });

  useEffect(() => {
    if (pageFriendLink && isEditing) {
      form.reset({
        groupName: pageFriendLink.groupName,
        linkDetails: pageFriendLink.linkDetails.map(link => ({
          name: link.name,
          url: link.url,
          order: link.order,
        })),
      });
    } else {
      form.reset();
    }
  }, [pageFriendLink, isEditing, form]);

  const onSubmit = async (data: PageFriendLinkFormData) => {
    try {
      if (isEditing && pageFriendLink) {
        await updatePageFriendLink({ id: pageFriendLink.id, data });
      } else {
        await createPageFriendLink(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save page friend link:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Friend Link Group' : 'Add New Friend Link Group'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Links</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: '', url: '', order: fields.length })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name={`linkDetails.${index}.name`}
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
                      name={`linkDetails.${index}.url`}
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
                      name={`linkDetails.${index}.order`}
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