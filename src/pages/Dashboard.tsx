import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, TrendingDown, Gift, AlertTriangle, ShieldAlert,
  Send, ScanLine, Split, Flag, Sparkles, ArrowUpRight, Wallet
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { Link } from "react-router-dom";
import { transactions, weeklySpend, categorySpend } from "@/lib/sampleData";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Welcome back, Priya 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's a smart look at your money this month.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <QuickAction icon={Send} label="Send Money" />
          <QuickAction icon={ScanLine} label="Scan" />
          <QuickAction icon={Split} label="Split Bill" />
          <QuickAction icon={Flag} label="Report Fraud" tone="danger" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Monthly Spend" value="₹18,540" delta="+12% vs last month" trend="up" icon={Wallet} tone="primary" />
        <StatCard label="Cashback Earned" value="₹1,760" delta="+₹245 this week" trend="up" icon={Gift} tone="success" />
        <StatCard label="Hidden Charges Found" value="₹3,210" delta="6 subscriptions" trend="down" icon={AlertTriangle} tone="warning" />
        <StatCard label="Fraud Alerts" value="2 active" delta="Requires action" trend="up" icon={ShieldAlert} tone="danger" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Weekly Spending</h3>
              <p className="text-xs text-muted-foreground">Last 7 days · all accounts</p>
            </div>
            <Badge variant="secondary" className="rounded-full">+18%</Badge>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weeklySpend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-md)" }} formatter={(v: any) => [`₹${v}`, "Spent"]} />
              <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border-border/60 p-6 shadow-soft">
          <h3 className="font-semibold">By Category</h3>
          <p className="text-xs text-muted-foreground">This month</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categorySpend} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {categorySpend.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} formatter={(v: any) => `₹${v}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-2">
            {categorySpend.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  <span className="text-muted-foreground">{c.name}</span>
                </div>
                <span className="font-medium">₹{c.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent + Insights */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Recent Transactions</h3>
            <Button asChild variant="ghost" size="sm" className="rounded-full text-xs">
              <Link to="/transactions">View all <ArrowUpRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </div>
          <div className="space-y-1">
            {transactions.slice(0, 6).map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg">{t.logo}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{t.merchant}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.category} · {t.bank} · {t.app}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${t.amount > 0 ? "text-success" : "text-foreground"}`}>
                    {t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{t.date.split(" ")[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="relative overflow-hidden border-border/60 p-6 shadow-soft">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> AI Insights
            </div>
            <h3 className="mt-2 font-semibold">Smart suggestions for you</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <Insight tone="warning">Your gym charge increased ₹200. Consider reviewing.</Insight>
              <Insight tone="success">You'll save ₹650 by canceling unused News Plus subscription.</Insight>
              <Insight tone="primary">3 cashback offers expire this week — claim ₹245 now.</Insight>
              <Insight tone="danger">Unusual ₹1,499 to "MRCH-XYZ" needs your review.</Insight>
            </ul>
            <Button asChild variant="outline" size="sm" className="mt-5 w-full rounded-xl">
              <Link to="/leak-detector">Open Insights</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, trend, icon: Icon, tone }: { label: string; value: string; delta: string; trend: "up" | "down"; icon: any; tone: "primary" | "success" | "warning" | "danger" }) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
  };
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  return (
    <Card className="border-border/60 p-5 shadow-soft transition-all hover:shadow-elevated">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TrendIcon className={`h-4 w-4 ${trend === "up" ? "text-success" : "text-danger"}`} />
      </div>
      <div className="mt-4 text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{delta}</div>
    </Card>
  );
}

function QuickAction({ icon: Icon, label, tone }: { icon: any; label: string; tone?: "danger" }) {
  return (
    <Button variant="outline" size="sm" className={`h-10 rounded-xl ${tone === "danger" ? "border-danger/30 text-danger hover:bg-danger-soft hover:text-danger" : ""}`}>
      <Icon className="mr-1.5 h-4 w-4" /> {label}
    </Button>
  );
}

function Insight({ tone, children }: { tone: "primary" | "success" | "warning" | "danger"; children: React.ReactNode }) {
  const dots = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };
  return (
    <li className="flex gap-2.5">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dots[tone]}`} />
      <span className="text-foreground/90">{children}</span>
    </li>
  );
}
