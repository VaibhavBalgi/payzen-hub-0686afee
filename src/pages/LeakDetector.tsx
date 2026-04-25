import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Lightbulb, Ban, PieChart as PieIcon, ArrowUp, ArrowDown, Wallet } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts";
import { recurring } from "@/lib/sampleData";

const compareData = [
  { m: "Nov", subs: 1820, total: 14200 },
  { m: "Dec", subs: 1920, total: 16800 },
  { m: "Jan", subs: 2140, total: 15400 },
  { m: "Feb", subs: 2340, total: 17200 },
  { m: "Mar", subs: 2640, total: 18100 },
  { m: "Apr", subs: 3210, total: 18540 },
];

const spendBreakdown = [
  { name: "Food", value: 4820, color: "hsl(228 67% 54%)" },
  { name: "Shopping", value: 6420, color: "hsl(162 82% 40%)" },
  { name: "Bills", value: 3240, color: "hsl(228 90% 65%)" },
  { name: "Subscriptions", value: 3210, color: "hsl(41 100% 48%)" },
  { name: "Travel", value: 2180, color: "hsl(0 95% 65%)" },
  { name: "Merchant", value: 1480, color: "hsl(280 65% 60%)" },
  { name: "Others", value: 1190, color: "hsl(210 9% 60%)" },
];

const suggestions = [
  { title: "Cancel News Plus", saving: 99, reason: "Not opened in 60 days" },
  { title: "Downgrade Netflix to Standard", saving: 250, reason: "You watch on 1 device only" },
  { title: "Switch to annual Spotify", saving: 348, reason: "Save 16% with yearly billing" },
  { title: "Review Gym Membership", saving: 200, reason: "Cost rose ₹200 last month" },
];

export default function LeakDetector() {
  const monthlyLoss = recurring.reduce((s, r) => s + (r.frequency === "Monthly" ? r.amount : r.amount / 3), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Leak Detector</h1>
        <p className="mt-1 text-sm text-muted-foreground">Catch hidden recurring charges silently draining your account.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-1 relative overflow-hidden border-0 p-6 text-primary-foreground bg-gradient-to-br from-warning to-warning/80 shadow-glow">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
          <AlertTriangle className="h-7 w-7" />
          <div className="mt-4 text-xs font-medium text-primary-foreground/90">Hidden monthly loss</div>
          <div className="mt-1 text-3xl font-bold">₹{Math.round(monthlyLoss).toLocaleString()}</div>
          <div className="mt-2 text-xs text-primary-foreground/85">{recurring.length} active subscriptions</div>
        </Card>
        <Card className="border-border/60 p-6 shadow-soft md:col-span-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-danger" />
            <h3 className="font-semibold">Rising cost alerts</h3>
          </div>
          <div className="mt-4 space-y-3">
            <RiseAlert service="Gym Membership" from={1299} to={1499} pct={15} />
            <RiseAlert service="Cloud Storage Pro" from={399} to={499} pct={25} />
          </div>
        </Card>
      </div>

      <Card className="border-border/60 shadow-soft overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-semibold">Recurring charges</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Frequency</th>
                <th className="px-6 py-3 font-medium">Next Debit</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {recurring.map((r) => (
                <tr key={r.service} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-6 py-3 font-medium">{r.service}</td>
                  <td className="px-6 py-3 font-semibold">₹{r.amount}</td>
                  <td className="px-6 py-3 text-muted-foreground">{r.frequency}</td>
                  <td className="px-6 py-3 text-muted-foreground">{r.next}</td>
                  <td className="px-6 py-3"><StatusPill status={r.status} /></td>
                  <td className="px-6 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs">Manage</Button>
                      <Button size="sm" variant="outline" className="h-8 rounded-lg border-danger/30 text-danger text-xs hover:bg-danger-soft hover:text-danger">
                        <Ban className="mr-1 h-3 w-3" /> Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Spending distribution analytics */}
      <Card className="border-border/60 p-6 shadow-soft">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <PieIcon className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold">Spending distribution</h3>
              <p className="text-xs text-muted-foreground">Where your money went this month</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={spendBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
                  {spendBreakdown.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} formatter={(v: any) => `₹${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatTile icon={ArrowUp} tone="danger" label="Highest spending" value={spendBreakdown[0] && [...spendBreakdown].sort((a,b)=>b.value-a.value)[0].name} sub={`₹${[...spendBreakdown].sort((a,b)=>b.value-a.value)[0].value.toLocaleString()}`} />
              <StatTile icon={ArrowDown} tone="success" label="Lowest spending" value={[...spendBreakdown].sort((a,b)=>a.value-b.value)[0].name} sub={`₹${[...spendBreakdown].sort((a,b)=>a.value-b.value)[0].value.toLocaleString()}`} />
              <StatTile icon={Wallet} tone="primary" label="Total monthly spend" value={`₹${spendBreakdown.reduce((s,c)=>s+c.value,0).toLocaleString()}`} sub="Across all categories" />
              <StatTile icon={AlertTriangle} tone="warning" label="Hidden recurring loss" value={`₹${Math.round(recurring.reduce((s, r) => s + (r.frequency === "Monthly" ? r.amount : r.amount / 3), 0)).toLocaleString()}`} sub={`${recurring.length} subscriptions`} />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {spendBreakdown.map((c) => (
                <div key={c.name} className="flex items-center gap-2 rounded-lg bg-secondary/40 px-2.5 py-1.5 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="ml-auto font-semibold">₹{c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 p-6 shadow-soft">
          <h3 className="font-semibold">Subscriptions vs total spend</h3>
          <p className="text-xs text-muted-foreground">Last 6 months</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={compareData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} formatter={(v: any) => `₹${v}`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="subs" stroke="hsl(var(--warning))" strokeWidth={2.5} dot={{ r: 4 }} name="Subscriptions" />
              <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} name="Total spend" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border-border/60 p-6 shadow-soft">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-xs font-medium text-success">
            <Lightbulb className="h-3 w-3" /> Savings suggestions
          </div>
          <ul className="mt-3 space-y-3">
            {suggestions.map((s) => (
              <li key={s.title} className="rounded-xl border border-border bg-secondary/40 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <Badge className="rounded-full bg-success-soft text-success hover:bg-success-soft">+₹{s.saving}/mo</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.reason}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function RiseAlert({ service, from, to, pct }: { service: string; from: number; to: number; pct: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-danger/20 bg-danger-soft/40 p-3">
      <div>
        <div className="text-sm font-semibold">{service}</div>
        <div className="text-xs text-muted-foreground">₹{from} → ₹{to} per month</div>
      </div>
      <Badge className="rounded-full bg-danger-soft text-danger hover:bg-danger-soft">+{pct}%</Badge>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-success-soft text-success",
    Rising: "bg-danger-soft text-danger",
    Forgotten: "bg-warning-soft text-warning",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${map[status]}`}>{status}</span>;
}
