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
import { useFriendLinks, FriendLink, FriendLinkPosition } from '@/hooks/use-friend-links';

const friendLinkSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL'),
  logoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  position: z.enum(['TOP', 'BOTTOM']),
  order: z.number().int().min(0),
});

type FriendLinkFormData = z.infer<typeof friendLinkSchema>;

interface FriendLinkDialogProps {
  type: 'add' | 'edit';
  friendLink: FriendLink | null;
  open: boolean;
  onClose: () => void;
  siteId: string;
}

const positions: { label: string; value: FriendLinkPosition }[] = [
  { label: 'Top', value: 'TOP' },
  { label: 'Bottom', value: 'BOTTOM' },
];

export function FriendLinkDialog({
  type,
  friendLink,
  open,
  onClose,
  siteId,
}: FriendLinkDialogProps) {
  const { createFriendLink, updateFriendLink, isCreating, isUpdating } = useFriendLinks(siteId);
  const isEditing = type === 'edit';

  const form = useForm<FriendLinkFormData>({
    resolver: zodResolver(friendLinkSchema),
    defaultValues: {
      name: '',
      url: '',
      logoUrl: '',
      position: 'TOP',
      order: 0,
    },
  });

  useEffect(() => {
    if (friendLink && isEditing) {
      form.reset({
        name: friendLink.name,
        url: friendLink.url,
        logoUrl: friendLink.logoUrl || '',
        position: friendLink.position,
        order: friendLink.order,
      });
    } else {
      form.reset();
    }
  }, [friendLink, isEditing, form]);

  const onSubmit = async (data: FriendLinkFormData) => {
    try {
      if (isEditing && friendLink) {
        await updateFriendLink({ id: friendLink.id, data });
      } else {
        await createFriendLink(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save friend link:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Friend Link' : 'Add New Friend Link'}
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
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {positions.map(position => (
                        <SelectItem key={position.value} value={position.value}>
                          {position.label}
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