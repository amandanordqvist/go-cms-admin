'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Check, ChevronsUpDown, Globe, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSites } from '@/hooks/use-site';

export function SiteSwitcher() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { sites, currentSite, setCurrentSite } = useSites();

  // Handle site selection
  const onSelect = (siteId: string) => {
    const site = sites?.find(s => s.id === siteId);
    if (!site) return;

    setCurrentSite(site);
    setOpen(false);

    // Update URL if we're on a site-specific page
    if (pathname.includes('/dashboard/sites/')) {
      const newPath = site.id === 'global' 
        ? '/dashboard'
        : `/dashboard/sites/${site.id}`;
      router.push(newPath);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a site"
          className="w-[200px] justify-between"
        >
          <Globe className="mr-2 h-4 w-4" />
          {currentSite?.name || 'Global'}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search site..." />
            <CommandEmpty>No site found.</CommandEmpty>
            <CommandGroup heading="Sites">
              {sites?.map((site) => (
                <CommandItem
                  key={site.id}
                  onSelect={() => onSelect(site.id)}
                  className="text-sm"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentSite?.id === site.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {site.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  router.push('/dashboard/sites/new');
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Site
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}