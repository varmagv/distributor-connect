import { Badge } from "@/components/ui/badge";
import type { Status, ActivityStatus, Disposition } from "@/data/sample";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Active: "bg-success/15 text-success border-success/20",
    "At Risk": "bg-warning/20 text-warning-foreground border-warning/30",
    Churning: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return <Badge variant="outline" className={cn("font-medium", map[status])}>{status}</Badge>;
}

export function ActivityBadge({ status }: { status: ActivityStatus }) {
  const map: Record<ActivityStatus, string> = {
    Planned: "bg-info/15 text-info border-info/30",
    Completed: "bg-success/15 text-success border-success/30",
    Missed: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return <Badge variant="outline" className={cn("font-medium", map[status])}>{status}</Badge>;
}

export function DispositionBadge({ disposition }: { disposition: Disposition }) {
  const map: Record<Disposition, string> = {
    Interested: "bg-success/15 text-success border-success/30",
    "Callback Requested": "bg-warning/20 text-warning-foreground border-warning/30",
    "Not Reachable": "bg-destructive/15 text-destructive border-destructive/30",
    "Meeting Scheduled": "bg-info/15 text-info border-info/30",
  };
  return <Badge variant="outline" className={cn("font-medium", map[disposition])}>{disposition}</Badge>;
}
