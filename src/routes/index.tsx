import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  CartesianGrid,
} from "recharts";
import { ACTIVITIES, DISTRIBUTORS, fmtCr, RMS } from "@/data/sample";
import { ActivityBadge } from "@/components/status-badges";
import { AlertTriangle, CalendarCheck, ClipboardList, IndianRupee, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AMC Connect" },
      { name: "description", content: "RM dashboard for distributor engagement" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const planned = ACTIVITIES.filter((a) => a.status === "Planned");
  const completedThisWeek = 11;
  const totalAUM = DISTRIBUTORS.reduce((s, d) => s + d.aum, 0);

  const top5 = [...DISTRIBUTORS].sort((a, b) => b.aum - a.aum).slice(0, 5)
    .map((d) => ({ name: d.name.split(" ")[0], aum: d.aum }));

  const feed = [...ACTIVITIES].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 5);

  const nudges = [
    { title: "Finwise Advisory AUM dropped 12%", body: "Schedule a visit this week to address concerns.", id: "d5" },
    { title: "Prudent Wealth Mgmt", body: "3 pending SIP registrations to follow up.", id: "d8" },
    { title: "Kapoor Investments", body: "Not contacted in 28 days — outreach overdue.", id: "d3" },
  ];

  const kpis = [
    { label: "Today's Planned", value: 3, icon: CalendarCheck, hint: "activities scheduled" },
    { label: "Completed This Week", value: completedThisWeek, icon: ClipboardList, hint: "across portfolio" },
    { label: "Pending Follow-ups", value: 4, icon: AlertTriangle, hint: "needs attention" },
    { label: "Total AUM Managed", value: fmtCr(totalAUM), icon: IndianRupee, hint: "across 18 distributors" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Good morning, {RMS[0].name}</h1>
        <p className="text-sm text-muted-foreground">{dateStr}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{k.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
                </div>
                <div className="rounded-md bg-primary/5 p-2 text-primary">
                  <k.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Top 5 Distributors by AUM</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top5}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <RTooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="aum" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-accent" /> Alerts & Nudges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nudges.map((n, i) => (
              <div key={i} className="rounded-md border border-accent/30 bg-accent/5 p-3">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
                <Link to="/distributors/$id" params={{ id: n.id }} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  Take action <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative space-y-4 border-l border-border pl-5">
            {feed.map((a) => {
              const d = DISTRIBUTORS.find((x) => x.id === a.distributorId);
              return (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[26px] mt-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{d?.name}</p>
                      <p className="text-xs text-muted-foreground">{a.type} · {new Date(a.date).toLocaleDateString("en-IN")}</p>
                    </div>
                    <ActivityBadge status={a.status} />
                  </div>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      <Button asChild variant="link" className="px-0 text-primary">
        <Link to="/planner">Open Activity Planner →</Link>
      </Button>
    </div>
  );
}
