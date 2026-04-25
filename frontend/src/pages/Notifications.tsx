import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldAlert, Gift, CalendarClock, CreditCard, Check, Bell } from "lucide-react";
import { notifications as initial } from "@/lib/sampleData";

const typeMeta: Record<string, { icon: any; tone: string; label: string }> = {
  fraud: { icon: ShieldAlert, tone: "danger", label: "Fraud" },
  cashback: { icon: Gift, tone: "success", label: "Cashback" },
  autodebit: { icon: CalendarClock, tone: "warning", label: "Auto-debit" },
  payment: { icon: CreditCard, tone: "primary", label: "Payment" },
};

export default function Notifications() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<string>("all");

  const visible = filter === "all" ? items : items.filter((i) => i.type === filter);
  const unread = items.filter((i) => !i.read).length;

  const markAll = () => setItems(items.map((i) => ({ ...i, read: true })));
  const markOne = (id: number) => setItems(items.map((i) => i.id === id ? { ...i, read: true } : i));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Notifications</h1>
            {unread > 0 && <Badge className="rounded-full bg-primary text-primary-foreground hover:bg-primary">{unread} new</Badge>}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Everything that needs your attention, in one feed.</p>
        </div>
        <Button onClick={markAll} variant="outline" className="rounded-xl">
          <Check className="mr-1 h-4 w-4" /> Mark all as read
        </Button>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="rounded-full bg-secondary p-1">
          <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
          <TabsTrigger value="fraud" className="rounded-full">Fraud</TabsTrigger>
          <TabsTrigger value="cashback" className="rounded-full">Cashback</TabsTrigger>
          <TabsTrigger value="autodebit" className="rounded-full">Auto-debit</TabsTrigger>
          <TabsTrigger value="payment" className="rounded-full">Payments</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="border-border/60 shadow-soft overflow-hidden">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground"><Bell className="h-5 w-5" /></div>
            <p className="mt-4 text-sm font-medium">You're all caught up</p>
            <p className="mt-1 text-xs text-muted-foreground">No notifications in this category.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {visible.map((n) => {
              const meta = typeMeta[n.type];
              const tones: Record<string, string> = {
                danger: "bg-danger-soft text-danger",
                success: "bg-success-soft text-success",
                warning: "bg-warning-soft text-warning",
                primary: "bg-primary-soft text-primary",
              };
              return (
                <li key={n.id} className={`flex gap-4 p-5 transition-colors hover:bg-secondary/40 ${!n.read ? "bg-primary-soft/30" : ""}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tones[meta.tone]}`}>
                    <meta.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{n.title}</span>
                          {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
                    </div>
                    {!n.read && (
                      <button onClick={() => markOne(n.id)} className="mt-2 text-xs font-medium text-primary hover:underline">Mark as read</button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
