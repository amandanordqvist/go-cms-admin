import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardOverview />
      <RecentActivity />
    </div>
  );
}