import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DISTRIBUTORS, RMS, fmtCr } from "@/data/sample";
import { StatusBadge } from "@/components/status-badges";
import { Search } from "lucide-react";

export const Route = createFileRoute("/distributors/")({
  head: () => ({ meta: [{ title: "Distributor Directory — AMC Connect" }] }),
  component: Directory,
});

function Directory() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");
  const [status, setStatus] = useState("all");
  const [aumRange, setAumRange] = useState("all");

  const cities = Array.from(new Set(DISTRIBUTORS.map((d) => d.city)));

  const filtered = DISTRIBUTORS.filter((d) => {
    if (q && !`${d.name} ${d.arn}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (city !== "all" && d.city !== city) return false;
    if (status !== "all" && d.status !== status) return false;
    if (aumRange === "low" && d.aum >= 20) return false;
    if (aumRange === "mid" && (d.aum < 20 || d.aum > 40)) return false;
    if (aumRange === "high" && d.aum <= 40) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Distributor Directory</h1>
        <p className="text-sm text-muted-foreground">{DISTRIBUTORS.length} distributors across your portfolio</p>
      </div>

      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or ARN" className="pl-9" />
          </div>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="At Risk">At Risk</SelectItem>
              <SelectItem value="Churning">Churning</SelectItem>
            </SelectContent>
          </Select>
          <Select value={aumRange} onValueChange={setAumRange}>
            <SelectTrigger><SelectValue placeholder="AUM Range" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All AUM</SelectItem>
              <SelectItem value="low">Below ₹20 Cr</SelectItem>
              <SelectItem value="mid">₹20–40 Cr</SelectItem>
              <SelectItem value="high">Above ₹40 Cr</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {filtered.map((d) => {
          const rm = RMS.find((r) => r.id === d.rmId);
          return (
            <Link key={d.id} to="/distributors/$id" params={{ id: d.id }}>
              <Card className="transition active:scale-[0.99]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{d.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{d.arn} · {d.city}</p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div><p className="text-muted-foreground">AUM</p><p className="font-semibold">{fmtCr(d.aum)}</p></div>
                    <div><p className="text-muted-foreground">Net Sales</p><p className={`font-semibold ${d.netSales < 0 ? "text-destructive" : ""}`}>{fmtCr(d.netSales)}</p></div>
                    <div><p className="text-muted-foreground">SIPs</p><p className="font-semibold">{d.sips}</p></div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">RM: {rm?.name}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">No distributors match the filters.</CardContent></Card>
        )}
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ARN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">AUM</TableHead>
                <TableHead className="text-right">Net Sales</TableHead>
                <TableHead className="text-right">SIPs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>RM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => {
                const rm = RMS.find((r) => r.id === d.rmId);
                return (
                  <TableRow key={d.id} className="cursor-pointer hover:bg-muted/40">
                    <TableCell className="font-mono text-xs">{d.arn}</TableCell>
                    <TableCell className="font-medium">
                      <Link to="/distributors/$id" params={{ id: d.id }} className="hover:underline">{d.name}</Link>
                    </TableCell>
                    <TableCell>{d.city}</TableCell>
                    <TableCell className="text-right">{fmtCr(d.aum)}</TableCell>
                    <TableCell className={`text-right ${d.netSales < 0 ? "text-destructive" : ""}`}>{fmtCr(d.netSales)}</TableCell>
                    <TableCell className="text-right">{d.sips}</TableCell>
                    <TableCell><StatusBadge status={d.status} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{rm?.name}</TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="py-12 text-center text-sm text-muted-foreground">No distributors match the filters.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
