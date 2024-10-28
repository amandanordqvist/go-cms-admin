'use client';

import { PermissionList } from "@/components/permissions/permission-list";

export default function PermissionsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Permissions</h1>
      <PermissionList />
    </div>
  );
}