'use client';

import { RoleList } from "@/components/roles/role-list";

export default function RolesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Roles & Permissions</h1>
      <RoleList />
    </div>
  );
}