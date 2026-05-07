import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge, DispositionBadge } from "@/components/status-badges";
import { ACTIVITIES, AUM_TREND, CALL_LOGS, DISTRIBUTORS, PRODUCT_MIX, RMS, SIP_TREND, fmtCr } from "@/data/sample";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip as RTooltip, CartesianGrid, Legend,
} from "recharts";
import { ArrowLeft, Calendar, IndianRupee, Repeat, Clock } from "lucide-react";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"];

export default function Distributor360() {
  const { id } = useParams();
  const d = DISTRIBUTORS.find((x) => x.id === id);
  if (!d) return <p className="p-6">Distributor not found.</p>;
  const rm = RMS.find((r) => r.id === d.rmId);
  const upcoming = ACTIVITIES.filter((a) => a.distributorId === d.id && a.status === "Planned").slice(0, 2);
  const calls = CALL_LOGS.filter((c) => c.distributorId === d.id).slice(0, 3);

  const kpis = [
    { label: "AUM", value: fmtCr(d.aum), icon: IndianRupee },
    { label: "Net Sales", value: fmtCr(d.netSales), icon: IndianRupee },
    { label: "Active SIPs", value: d.sips, icon: Repeat },
    { label: "Last Visit", value: `${d.lastContactDays} days ago`, icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="gap-1 -ml-2">
        <Link to="/distributors"><ArrowLeft className="h-4 w-4" /> Back to Directory</Link>
      </Button>

      <Card>
        <CardContent className="flex flex-wrap items-start justify-between gap-4 p-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{d.name}</h1>
              <StatusBadge status={d.status} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-mono">{d.arn}</span> · {d.city} · RM: {rm?.name}
            </p>
          </div>
          <Button>Schedule Activity</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{k.value}</p>
                </div>
                <div className="rounded-md bg-primary/5 p-2 text-primary"><k.icon className="h-5 w-5" /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">AUM Trend (6 months)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={AUM_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <RTooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="aum" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">SIP Registrations</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SIP_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <RTooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="sips" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Product Mix</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PRODUCT_MIX} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {PRODUCT_MIX.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Legend />
                <RTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Upcoming Activities</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 && <p className="text-sm text-muted-foreground">No upcoming activities.</p>}
            {upcoming.map((a) => (
              <div key={a.id} className="rounded-md border p-3">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium">{a.type}</p>
                  <Badge variant="outline" className="text-[10px]"><Calendar className="mr-1 h-3 w-3" />{new Date(a.date).toLocaleDateString("en-IN")}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{a.location}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recent Call Logs</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {calls.length === 0 && <p className="text-sm text-muted-foreground">No calls logged.</p>}
            {calls.map((c) => (
              <div key={c.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{c.dateTime}</p>
                  <span className="text-xs text-muted-foreground">{c.duration}</span>
                </div>
                <div className="mt-2"><DispositionBadge disposition={c.disposition} /></div>
                {c.notes && <p className="mt-2 text-xs">{c.notes}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
