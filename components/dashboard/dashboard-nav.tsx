'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}