'use client';

import { Input } from '@/components/ui/input';

interface SiteSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function SiteSearch({ value, onChange }: SiteSearchProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <Input
          placeholder="Search sites..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
    </div>
  );
}