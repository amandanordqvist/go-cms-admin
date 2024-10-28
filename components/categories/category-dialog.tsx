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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories, CategoryType } from '@/hooks/use-categories';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  type: z.enum(['VIDEO', 'NOVEL', 'PICTURE', 'COMIC']),
  parentId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryDialogProps {
  type: 'add' | 'edit' | null;
  category?: any;
  open: boolean;
  onClose: () => void;
}

const categoryTypes: { label: string; value: CategoryType }[] = [
  { label: 'Video', value: 'VIDEO' },
  { label: 'Novel', value: 'NOVEL' },
  { label: 'Picture', value: 'PICTURE' },
  { label: 'Comic', value: 'COMIC' },
];

export function CategoryDialog({ type, category, open, onClose }: CategoryDialogProps) {
  const { categories, createCategory, updateCategory, isCreating, isUpdating } = useCategories();
  const isEditing = type === 'edit';

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      url: '',
      type: 'VIDEO',
      parentId: null,
      isActive: true,
      order: 0,
    },
  });

  useEffect(() => {
    if (category && isEditing) {
      form.reset({
        name: category.name,
        url: category.url || '',
        type: category.type,
        parentId: category.parentId || null,
        isActive: category.isActive,
        order: category.order,
      });
    } else {
      form.reset({
        name: '',
        url: '',
        type: 'VIDEO',
        parentId: null,
        isActive: true,
        order: 0,
      });
    }
  }, [category, isEditing, form]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEditing && category) {
        await updateCategory({ id: category.id, data });
      } else {
        await createCategory(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const getParentOptions = () => {
    const options: { label: string; value: string }[] = [];
    const addOption = (category: any, level = 0) => {
      options.push({
        label: '  '.repeat(level) + category.name,
        value: category.id,
      });
      if (category.children) {
        category.children.forEach((child: any) => addOption(child, level + 1));
      }
    };
    categories?.forEach(category => addOption(category));
    return options;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Category' : 'Add New Category'}
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
                      {categoryTypes.map(type => (
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
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      {getParentOptions().map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
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