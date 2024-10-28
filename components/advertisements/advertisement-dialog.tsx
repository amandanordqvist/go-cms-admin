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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdvertisements, Advertisement, AdvertisementType } from '@/hooks/use-advertisements';

const advertisementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  imagePath: z.string().url('Must be a valid URL'),
  linkUrl: z.string().url('Must be a valid URL'),
  startDate: z.string(),
  endDate: z.string(),
  order: z.number().int().min(0),
  type: z.enum(['BANNER', 'ICON']),
});

type AdvertisementFormData = z.infer<typeof advertisementSchema>;

interface AdvertisementDialogProps {
  type: 'add' | 'edit';
  advertisement: Advertisement | null;
  open: boolean;
  onClose: () => void;
  siteId: string;
}

const adTypes: { label: string; value: AdvertisementType }[] = [
  { label: 'Banner', value: 'BANNER' },
  { label: 'Icon', value: 'ICON' },
];

export function AdvertisementDialog({
  type,
  advertisement,
  open,
  onClose,
  siteId,
}: AdvertisementDialogProps) {
  const { createAdvertisement, updateAdvertisement, isCreating, isUpdating } = useAdvertisements(siteId);
  const isEditing = type === 'edit';

  const form = useForm<AdvertisementFormData>({
    resolver: zodResolver(advertisementSchema),
    defaultValues: {
      title: '',
      imagePath: '',
      linkUrl: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      order: 0,
      type: 'BANNER',
    },
  });

  useEffect(() => {
    if (advertisement && isEditing) {
      form.reset({
        title: advertisement.title,
        imagePath: advertisement.imagePath,
        linkUrl: advertisement.linkUrl,
        startDate: new Date(advertisement.startDate).toISOString().split('T')[0],
        endDate: new Date(advertisement.endDate).toISOString().split('T')[0],
        order: advertisement.order,
        type: advertisement.type,
      });
    } else {
      form.reset();
    }
  }, [advertisement, isEditing, form]);

  const onSubmit = async (data: AdvertisementFormData) => {
    try {
      if (isEditing && advertisement) {
        await updateAdvertisement({ id: advertisement.id, data });
      } else {
        await createAdvertisement(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save advertisement:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Advertisement' : 'Add New Advertisement'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="imagePath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {adTypes.map(type => (
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