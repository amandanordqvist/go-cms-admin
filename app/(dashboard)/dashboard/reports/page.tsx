import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";

const columns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const data = [
  {
    date: "2024-03-20",
    type: "Daily Report",
    status: "Completed",
  },
  {
    date: "2024-03-19",
    type: "Weekly Summary",
    status: "Pending",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Reports</h1>
      
      <Card>
        <DataTable columns={columns} data={data} searchKey="type" />
      </Card>
    </div>
  );
}