import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CALL_LOGS, DISTRIBUTORS, RMS, TODAYS_QUEUE } from "@/data/sample";
import { DispositionBadge } from "@/components/status-badges";
import { Phone, PhoneCall } from "lucide-react";
import { toast } from "sonner";

export default function VRM() {
  const vrm = RMS.find((r) => r.role === "VRM")!;
  const queue = TODAYS_QUEUE.map((id) => DISTRIBUTORS.find((d) => d.id === id)!);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">VRM Call Center</h1>
        <p className="text-sm text-muted-foreground">{vrm.name} · {vrm.count} distributors covered remotely</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PhoneCall className="h-4 w-4 text-accent" /> Today's Call Queue
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {queue.map((d) => (
            <div key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="font-medium">{d.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{d.arn} · {d.city}</p>
              </div>
              <Button size="sm" className="gap-1" onClick={() => toast("Initiating call via dialer...")}>
                <Phone className="h-3.5 w-3.5" /> Call Now
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Call Log History</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distributor</TableHead><TableHead>Date & Time</TableHead><TableHead>Duration</TableHead>
                <TableHead>Disposition</TableHead><TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CALL_LOGS.map((c) => {
                const d = DISTRIBUTORS.find((x) => x.id === c.distributorId);
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{d?.name}</TableCell>
                    <TableCell className="text-sm">{c.dateTime}</TableCell>
                    <TableCell className="text-sm">{c.duration}</TableCell>
                    <TableCell><DispositionBadge disposition={c.disposition} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.notes || "—"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
