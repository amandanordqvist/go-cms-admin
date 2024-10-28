"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  { id: 1, user: "John Doe", action: "logged in", time: "2 minutes ago" },
  { id: 2, user: "Jane Smith", action: "uploaded a video", time: "5 minutes ago" },
  { id: 3, user: "Mike Johnson", action: "updated profile", time: "10 minutes ago" },
  { id: 4, user: "Sarah Wilson", action: "commented", time: "15 minutes ago" },
  { id: 5, user: "Tom Brown", action: "liked a video", time: "20 minutes ago" },
];

export function RecentActivity() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ScrollArea className="h-[240px]">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}