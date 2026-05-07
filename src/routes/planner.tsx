import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ActivityBadge } from "@/components/status-badges";
import { ACTIVITIES, ACTIVITY_TYPES, DISTRIBUTORS, PRODUCTS, type Activity } from "@/data/sample";
import { Plus, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "Activity Planner — AMC Connect" }] }),
  component: Planner,
});

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function Planner() {
  const [activities, setActivities] = useState<Activity[]>(ACTIVITIES);
  const [date, setDate] = useState<Date>(new Date());
  const [openCreate, setOpenCreate] = useState(false);
  const [logFor, setLogFor] = useState<Activity | null>(null);

  const dayActivities = activities.filter((a) => sameDay(new Date(a.date), date));
  const activityDays = activities.map((a) => new Date(a.date));

  const [form, setForm] = useState({
    distributorId: DISTRIBUTORS[0].id,
    type: ACTIVITY_TYPES[0],
    location: "",
    notes: "",
    products: [] as string[],
  });

  const addActivity = () => {
    const newA: Activity = {
      id: `a${Date.now()}`,
      distributorId: form.distributorId,
      type: form.type,
      date: date.toISOString(),
      location: form.location || "TBD",
      products: form.products,
      notes: form.notes,
      status: "Planned",
    };
    setActivities([newA, ...activities]);
    setOpenCreate(false);
    setForm({ ...form, location: "", notes: "", products: [] });
    toast.success("Activity scheduled");
  };

  const completeActivity = (outcome: "Positive" | "Neutral" | "Negative", summary: string) => {
    if (!logFor) return;
    setActivities(activities.map((a) => a.id === logFor.id ? { ...a, status: "Completed", outcome, notes: summary || a.notes } : a));
    setLogFor(null);
    toast.success("Activity logged");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Activity Planner</h1>
          <p className="text-sm text-muted-foreground">Plan field visits and log post-meeting outcomes.</p>
        </div>
        <Sheet open={openCreate} onOpenChange={setOpenCreate}>
          <SheetTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Create Activity</Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto sm:max-w-md">
            <SheetHeader>
              <SheetTitle>New Activity</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 px-4 py-4">
              <div className="space-y-2">
                <Label>Distributor</Label>
                <Select value={form.distributorId} onValueChange={(v) => setForm({ ...form, distributorId: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {DISTRIBUTORS.map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.arn} — {d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Activity Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ACTIVITY_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input value={date.toLocaleDateString("en-IN")} readOnly />
                <p className="text-xs text-muted-foreground">Pick date from calendar on the left.</p>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Office address or city" />
              </div>
              <div className="space-y-2">
                <Label>Products to Discuss</Label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCTS.map((p) => {
                    const sel = form.products.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm({ ...form, products: sel ? form.products.filter((x) => x !== p) : [...form.products, p] })}
                        className={`rounded-full border px-3 py-1 text-xs transition ${sel ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes / Agenda</Label>
                <Textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
            <SheetFooter>
              <Button onClick={addActivity}>Schedule Activity</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
        <Card>
          <CardContent className="p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              modifiers={{ hasActivity: activityDays }}
              modifiersClassNames={{ hasActivity: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-accent" }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              <Badge variant="secondary" className="ml-2">{dayActivities.length} activities</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dayActivities.length === 0 && (
              <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                No activities for this day. Click "Create Activity" to schedule one.
              </div>
            )}
            {dayActivities.map((a) => {
              const d = DISTRIBUTORS.find((x) => x.id === a.distributorId)!;
              return (
                <div key={a.id} className="rounded-lg border bg-card p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{d.name} <span className="ml-1 text-xs text-muted-foreground">{d.arn}</span></p>
                      <p className="text-xs text-muted-foreground">{a.type}</p>
                    </div>
                    <ActivityBadge status={a.status} />
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.location}</span>
                    <span>{new Date(a.date).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}</span>
                  </div>
                  {a.products.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {a.products.map((p) => <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>)}
                    </div>
                  )}
                  {a.status === "Planned" && (
                    <Button size="sm" variant="outline" className="mt-3 gap-1" onClick={() => setLogFor(a)}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Mark Complete
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <PostVisitDialog activity={logFor} onClose={() => setLogFor(null)} onSubmit={completeActivity} />
    </div>
  );
}

function PostVisitDialog({
  activity,
  onClose,
  onSubmit,
}: {
  activity: Activity | null;
  onClose: () => void;
  onSubmit: (outcome: "Positive" | "Neutral" | "Negative", summary: string) => void;
}) {
  const [summary, setSummary] = useState("");
  const [next, setNext] = useState("");
  const [outcome, setOutcome] = useState<"Positive" | "Neutral" | "Negative">("Positive");

  return (
    <Dialog open={!!activity} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post-Visit Log</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Discussion Summary</Label>
            <Textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Products Discussed</Label>
            <Input placeholder="e.g. HDFC Flexi Cap, SBI Bluechip" />
          </div>
          <div className="space-y-2">
            <Label>Next Steps</Label>
            <Textarea rows={2} value={next} onChange={(e) => setNext(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Outcome</Label>
            <Select value={outcome} onValueChange={(v) => setOutcome(v as "Positive" | "Neutral" | "Negative")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Positive">Positive</SelectItem>
                <SelectItem value="Neutral">Neutral</SelectItem>
                <SelectItem value="Negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(outcome, summary)}>Save Log</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
