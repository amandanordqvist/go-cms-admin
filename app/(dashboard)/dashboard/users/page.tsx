"use client";

import { DataTable } from "@/components/dashboard/users/data-table";
import { columns } from "@/components/dashboard/users/columns";

const data = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
  },
  // More mock data can be added here
];

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold tracking-tight mb-6">User Management</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}