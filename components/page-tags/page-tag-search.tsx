'use client';

import { Input } from '@/components/ui/input';

interface PageTagSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PageTagSearch({ value, onChange }: PageTagSearchProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <Input
          placeholder="Search page tags..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
    </div>
  );
}