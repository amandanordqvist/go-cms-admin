"use client";

import { SiteSwitcher } from "@/components/dashboard/site-switcher";
import { UserNav } from "@/components/dashboard/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <SiteSwitcher />
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[300px] lg:w-[400px]"
          />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}