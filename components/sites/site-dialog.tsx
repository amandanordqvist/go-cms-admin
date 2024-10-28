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
  DialogTabs,
  DialogTab,
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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Site } from '@/hooks/use-sites-management';

const siteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  domain: z.string().min(1, 'Domain is required'),
  title: z.string().optional(),
  keywords: z.string().optional(),
  description: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  matomoSiteId: z.string().optional(),
  matomoUrl: z.string().url().optional().or(z.literal('')),
  contactEmail: z.string().email().optional().or(z.literal('')),
  telegramId: z.string().optional(),
  copyright: z.string().optional(),
  imageCdnUrl: z.string().url().optional().or(z.literal('')),
  maintenanceMode: z.boolean().default(false),
  maintenanceMsg: z.string().optional(),
});

type SiteFormData = z.infer<typeof siteSchema>;

interface SiteDialogProps {
  type: 'add' | 'edit';
  site: Site | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: SiteFormData) => Promise<void>;
}

export function SiteDialog({
  type,
  site,
  open,
  onClose,
  onSave,
}: SiteDialogProps) {
  const isEditing = type === 'edit';

  const form = useForm<SiteFormData>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      name: '',
      domain: '',
      maintenanceMode: false,
    },
  });

  useEffect(() => {
    if (site && isEditing) {
      form.reset({
        name: site.name,
        domain: site.domain,
        title: site.title,
        keywords: site.keywords,
        description: site.description,
        googleAnalyticsId: site.googleAnalyticsId,
        matomoSiteId: site.matomoSiteId,
        matomoUrl: site.matomoUrl,
        contactEmail: site.contactEmail,
        telegramId: site.telegramId,
        copyright: site.copyright,
        imageCdnUrl: site.imageCdnUrl,
        maintenanceMode: site.maintenanceMode,
        maintenanceMsg: site.maintenanceMsg,
      });
    } else {
      form.reset();
    }
  }, [site, isEditing, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Site' : 'Add New Site'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telegramId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="seo" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Keywords</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Separate keywords with commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <FormField
                  control={form.control}
                  name="googleAnalyticsId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Analytics ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="matomoSiteId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matomo Site ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="matomoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matomo URL</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <FormField
                  control={form.control}
                  name="copyright"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copyright</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageCdnUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image CDN URL</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maintenanceMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Maintenance Mode
                        </FormLabel>
                        <FormDescription>
                          Enable to show maintenance page to visitors
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

                <FormField
                  control={form.control}
                  name="maintenanceMsg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Save Changes' : 'Create Site'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}