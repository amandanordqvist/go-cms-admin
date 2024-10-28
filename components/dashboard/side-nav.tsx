'use client';

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Video,
  Users,
  Settings,
  Tags,
  Link2,
  BarChart3,
  ShieldCheck,
  Globe,
  ImageIcon,
  BookOpen,
  Comic,
  FileText,
  Link,
} from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useSites } from "@/hooks/use-site";

interface NavItem {
  title: string;
  href?: string;
  icon?: any;
  items?: NavItem[];
  siteSpecific?: boolean;
}

export function SideNav() {
  const pathname = usePathname();
  const { currentSite } = useSites();

  const getMenuItems = (): NavItem[] => {
    // Base menu items (always shown)
    const baseItems: NavItem[] = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Content",
        items: [
          {
            title: "Videos",
            href: "/dashboard/videos",
            icon: Video,
          },
          {
            title: "Novels",
            href: "/dashboard/novels",
            icon: BookOpen,
          },
          {
            title: "Pictures",
            href: "/dashboard/pictures",
            icon: ImageIcon,
          },
          {
            title: "Comics",
            href: "/dashboard/comics",
            icon: Comic,
          },
        ],
      },
      {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: Tags,
      },
    ];

    // Site-specific menu items
    const siteItems: NavItem[] = [
      {
        title: "Site Management",
        items: [
          {
            title: "Categories",
            href: currentSite?.id === 'global' 
              ? "/dashboard/site-categories"
              : `/dashboard/sites/${currentSite?.id}/categories`,
            icon: Tags,
            siteSpecific: true,
          },
          {
            title: "Page Tags",
            href: currentSite?.id === 'global'
              ? "/dashboard/page-tags"
              : `/dashboard/sites/${currentSite?.id}/page-tags`,
            icon: FileText,
            siteSpecific: true,
          },
          {
            title: "Friend Links",
            href: currentSite?.id === 'global'
              ? "/dashboard/friend-links"
              : `/dashboard/sites/${currentSite?.id}/friend-links`,
            icon: Link2,
            siteSpecific: true,
          },
          {
            title: "Page Friend Links",
            href: currentSite?.id === 'global'
              ? "/dashboard/page-friend-links"
              : `/dashboard/sites/${currentSite?.id}/page-friend-links`,
            icon: Link,
            siteSpecific: true,
          },
          {
            title: "Tags",
            href: currentSite?.id === 'global'
              ? "/dashboard/tags"
              : `/dashboard/sites/${currentSite?.id}/tags`,
            icon: Tags,
            siteSpecific: true,
          },
          {
            title: "Advertisements",
            href: currentSite?.id === 'global'
              ? "/dashboard/advertisements"
              : `/dashboard/sites/${currentSite?.id}/advertisements`,
            icon: BarChart3,
            siteSpecific: true,
          },
        ],
      },
    ];

    // System settings (always shown)
    const systemItems: NavItem[] = [
      {
        title: "System",
        items: [
          {
            title: "Roles & Permissions",
            href: "/dashboard/roles",
            icon: ShieldCheck,
          },
          {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
          },
        ],
      },
    ];

    return [...baseItems, ...siteItems, ...systemItems];
  };

  const renderNavItem = (item: NavItem) => {
    // Skip site-specific items when no site is selected
    if (item.siteSpecific && !currentSite) {
      return null;
    }

    if (item.href && item.icon) {
      const Icon = item.icon;
      return (
        <NextLink
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <Icon className="h-4 w-4" />
          {item.title}
        </NextLink>
      );
    }

    if (item.items) {
      const visibleItems = item.items.filter(subItem => 
        !subItem.siteSpecific || currentSite
      );

      if (visibleItems.length === 0) {
        return null;
      }

      return (
        <div key={item.title} className="space-y-1">
          <div className="px-3 py-1.5 text-sm font-semibold text-foreground/70">
            {item.title}
          </div>
          <div className="space-y-1">
            {visibleItems.map((subItem) => {
              const SubIcon = subItem.icon;
              return (
                <NextLink
                  key={subItem.href}
                  href={subItem.href || "#"}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors pl-6",
                    pathname === subItem.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {SubIcon && <SubIcon className="h-4 w-4" />}
                  {subItem.title}
                </NextLink>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <nav className="w-64 min-h-[calc(100vh-4rem)] border-r px-3 py-4 bg-background">
      <div className="space-y-4">
        {getMenuItems().map((item) => renderNavItem(item))}
      </div>
    </nav>
  );
}