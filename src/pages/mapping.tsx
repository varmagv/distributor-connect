import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DISTRIBUTORS, RMS } from "@/data/sample";
import { toast } from "sonner";

export default function Mapping() {
  const [reassign, setReassign] = useState<string | null>(null);
  const [target, setTarget] = useState(RMS[0].id);

  const summary = [
    { label: "Total Distributors", value: DISTRIBUTORS.length },
    { label: "Mapped", value: DISTRIBUTORS.length },
    { label: "Unmapped", value: 0 },
    { label: "Multi-branch", value: 2 },
  ];
  const allocation = RMS.map((r) => ({ rm: r, count: DISTRIBUTORS.filter((d) => d.rmId === r.id).length }));
  const max = Math.max(...allocation.map((a) => a.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">RM ↔ Distributor Mapping</h1>
        <p className="text-sm text-muted-foreground">Manage assignments and reallocate distributors.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {summary.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-2xl font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">RM Allocation</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {allocation.map((a) => (
            <div key={a.rm.id} className="flex items-center gap-4">
              <div className="w-40 text-sm font-medium">{a.rm.name}</div>
              <div className="flex-1">
                <div className="h-7 rounded-md bg-muted">
                  <div
                    className="flex h-full items-center justify-end rounded-md bg-primary px-2 text-xs font-medium text-primary-foreground"
                    style={{ width: `${(a.count / max) * 100}%` }}
                  >
                    {a.count}
                  </div>
                </div>
              </div>
              <div className="w-24 text-right text-xs text-muted-foreground">{a.rm.role}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distributor</TableHead><TableHead>ARN</TableHead><TableHead>City</TableHead>
                <TableHead>Assigned RM</TableHead><TableHead>Type</TableHead><TableHead>Effective Date</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DISTRIBUTORS.map((d) => {
                const rm = RMS.find((r) => r.id === d.rmId);
                return (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell className="font-mono text-xs">{d.arn}</TableCell>
                    <TableCell>{d.city}</TableCell>
                    <TableCell>{rm?.name}</TableCell>
                    <TableCell>
                      <Badge variant={d.assignmentType === "Primary" ? "default" : "secondary"}>{d.assignmentType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{d.effectiveDate}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => setReassign(d.id)}>Reassign</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!reassign} onOpenChange={(o) => !o && setReassign(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reassign Distributor</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Select the new Relationship Manager.</p>
            <Select value={target} onValueChange={setTarget}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {RMS.map((r) => <SelectItem key={r.id} value={r.id}>{r.name} — {r.role}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReassign(null)}>Cancel</Button>
            <Button onClick={() => { setReassign(null); toast.success("Reassignment requested"); }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
