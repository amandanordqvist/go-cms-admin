'use client';

import { Input } from '@/components/ui/input';

interface PageFriendLinkSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PageFriendLinkSearch({ value, onChange }: PageFriendLinkSearchProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <Input
          placeholder="Search friend link groups..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
    </div>
  );
}