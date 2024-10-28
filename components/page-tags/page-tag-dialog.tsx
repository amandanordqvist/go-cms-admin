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
import { usePageTags, PageTag } from '@/hooks/use-page-tags';
import { Plus, Trash2 } from 'lucide-react';

const tagDetailSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  order: z.number().int().min(0),
});

const pageTagSchema = z.object({
  groupName: z.string().min(1, 'Group name is required'),
  tagDetails: z.array(tagDetailSchema).min(1, 'At least one tag is required'),
});

type PageTagFormData = z.infer<typeof pageTagSchema>;

interface PageTagDialogProps {
  type: 'add' | 'edit';
  pageTag: PageTag | null;
  open: boolean;
  onClose: () => void;
  siteId: string;
}

export function PageTagDialog({
  type,
  pageTag,
  open,
  onClose,
  siteId,
}: PageTagDialogProps) {
  const { createPageTag, updatePageTag, isCreating, isUpdating } = usePageTags(siteId);
  const isEditing = type === 'edit';

  const form = useForm<PageTagFormData>({
    resolver: zodResolver(pageTagSchema),
    defaultValues: {
      groupName: '',
      tagDetails: [{ name: '', url: '', order: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tagDetails',
  });

  useEffect(() => {
    if (pageTag && isEditing) {
      form.reset({
        groupName: pageTag.groupName,
        tagDetails: pageTag.tagDetails.map(tag => ({
          name: tag.name,
          url: tag.url || '',
          order: tag.order,
        })),
      });
    } else {
      form.reset();
    }
  }, [pageTag, isEditing, form]);

  const onSubmit = async (data: PageTagFormData) => {
    try {
      if (isEditing && pageTag) {
        await updatePageTag({ id: pageTag.id, data });
      } else {
        await createPageTag(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save page tag:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Page Tag Group' : 'Add New Page Tag Group'}
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
                <h3 className="text-lg font-medium">Tags</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: '', url: '', order: fields.length })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name={`tagDetails.${index}.name`}
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
                      name={`tagDetails.${index}.url`}
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
                      name={`tagDetails.${index}.order`}
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