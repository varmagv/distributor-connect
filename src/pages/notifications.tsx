import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NOTIFICATIONS, type Notification } from "@/data/sample";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ArrowRight } from "lucide-react";

const ICONS = {
  alert: { icon: AlertCircle, color: "text-destructive bg-destructive/10" },
  warning: { icon: AlertTriangle, color: "text-warning-foreground bg-warning/20" },
  success: { icon: CheckCircle2, color: "text-success bg-success/10" },
  info: { icon: Info, color: "text-info bg-info/10" },
} as const;

export default function Notifications() {
  const [list, setList] = useState<Notification[]>(NOTIFICATIONS);
  const toggle = (id: string) => setList(list.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  const filterFor = (tab: "All" | "Alerts" | "System") =>
    tab === "All" ? list : list.filter((n) => n.category === tab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications & Alerts</h1>
        <p className="text-sm text-muted-foreground">Critical signals and system updates from your portfolio.</p>
      </div>

      <Tabs defaultValue="All">
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Alerts">Alerts</TabsTrigger>
          <TabsTrigger value="System">System</TabsTrigger>
        </TabsList>
        {(["All", "Alerts", "System"] as const).map((t) => (
          <TabsContent key={t} value={t} className="space-y-3">
            {filterFor(t).map((n) => {
              const meta = ICONS[n.level];
              const Icon = meta.icon;
              return (
                <Card key={n.id} className={n.read ? "opacity-60" : ""}>
                  <CardContent className="flex flex-wrap items-start gap-3 p-4">
                    <div className={`rounded-md p-2 ${meta.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.timestamp} · {n.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Read</span>
                        <Switch checked={n.read} onCheckedChange={() => toggle(n.id)} />
                      </div>
                      {n.distributorId && (
                        <Button asChild size="sm" variant="outline" className="gap-1">
                          <Link to={`/distributors/${n.distributorId}`}>
                            Take Action <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
