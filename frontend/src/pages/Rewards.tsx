import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, Clock, TrendingUp, Lightbulb } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { rewards as initialRewards } from "@/lib/sampleData";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const monthlyRewards = [
  { m: "Nov", v: 320 }, { m: "Dec", v: 480 }, { m: "Jan", v: 590 },
  { m: "Feb", v: 410 }, { m: "Mar", v: 720 }, { m: "Apr", v: 860 },
];

const claimedHistory = [
  { date: "Apr 22, 2025", source: "Google Pay", amount: 50, type: "Cashback" },
  { date: "Apr 18, 2025", source: "PhonePe", amount: 100, type: "Scratch card" },
  { date: "Apr 14, 2025", source: "HDFC Bank", amount: 240, type: "Reward points" },
  { date: "Apr 09, 2025", source: "Paytm", amount: 25, type: "Cashback" },
  { date: "Apr 02, 2025", source: "Google Pay", amount: 75, type: "Cashback" },
];

export default function Rewards() {
  const [rewards, setRewards] = useState(initialRewards);
  const totalSaved = 4820;
  const available = rewards.reduce((s, r) => s + r.amount, 0);
  const expiringSoon = rewards.filter((r) => new Date(r.expires) < new Date(2025, 4, 20));

  const claimAll = () => {
    if (rewards.length === 0) return;
    toast({ title: "All rewards claimed!", description: `₹${available} credited to your account.` });
    setRewards([]);
  };

  const claimReward = (app: string, amount: number) => {
    toast({ title: "Reward claimed!", description: `₹${amount} from ${app} credited.` });
    setRewards(rewards.filter((r) => r.app !== app));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Rewards & Cashback</h1>
        <p className="mt-1 text-sm text-muted-foreground">Every reward, in one place. Claim before they expire.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden border-0 p-6 text-primary-foreground gradient-hero shadow-glow">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <Gift className="h-7 w-7" />
          <div className="mt-4 text-xs font-medium text-primary-foreground/85">Total saved this year</div>
          <div className="mt-1 text-3xl font-bold">₹{totalSaved.toLocaleString()}</div>
        </Card>
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-soft text-success"><Sparkles className="h-5 w-5" /></div>
          <div className="mt-4 text-xs font-medium text-muted-foreground">Available cashback</div>
          <div className="mt-1 text-3xl font-bold">₹{available.toLocaleString()}</div>
          <Button size="sm" className="mt-3 rounded-full" onClick={claimAll} disabled={rewards.length === 0}>Claim all</Button>
        </Card>
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-soft text-warning"><Clock className="h-5 w-5" /></div>
          <div className="mt-4 text-xs font-medium text-muted-foreground">Expiring soon</div>
          <div className="mt-1 text-3xl font-bold">{expiringSoon.length} <span className="text-base font-medium text-muted-foreground">offers</span></div>
          <div className="mt-1 text-xs text-warning">Use before May 15</div>
        </Card>
      </div>

      <Card className="border-border/60 p-6 shadow-soft">
        <Tabs defaultValue="all">
          <TabsList className="rounded-full bg-secondary p-1">
            <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
            <TabsTrigger value="gpay" className="rounded-full">Google Pay</TabsTrigger>
            <TabsTrigger value="phonepe" className="rounded-full">PhonePe</TabsTrigger>
            <TabsTrigger value="paytm" className="rounded-full">Paytm</TabsTrigger>
            <TabsTrigger value="bank" className="rounded-full">Bank Offers</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {rewards.map((r) => <RewardCard key={r.app} r={r} onClaim={() => claimReward(r.app, r.amount)} />)}
            </div>
          </TabsContent>
          {["gpay", "phonepe", "paytm", "bank"].map((k, i) => (
            <TabsContent key={k} value={k} className="mt-5">
              {rewards[i] ? <RewardCard r={rewards[i]} onClaim={() => claimReward(rewards[i].app, rewards[i].amount)} /> : <div className="text-sm text-muted-foreground p-4 text-center">No active offers.</div>}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Rewards over time</h3>
            <Badge variant="secondary" className="rounded-full"><TrendingUp className="mr-1 h-3 w-3" />+22%</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyRewards} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} formatter={(v: any) => [`₹${v}`, "Earned"]} />
              <Bar dataKey="v" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border-border/60 p-6 shadow-soft">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-3 py-1 text-xs font-medium text-warning">
            <Lightbulb className="h-3 w-3" /> Reward Tips
          </div>
          <ul className="mt-3 space-y-3 text-sm">
            <li>Pay grocery bills via PhonePe to earn 2x scratch cards.</li>
            <li>Use HDFC card for travel — 5% reward on flights.</li>
            <li>Stack GPay offers + bank cashback for max savings.</li>
            <li>Claim expiring rewards every Sunday — set a reminder.</li>
          </ul>
        </Card>
      </div>

      <Card className="border-border/60 shadow-soft overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-semibold">Claimed History</h3>
          <Button variant="ghost" size="sm" className="rounded-full text-xs">View all</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {claimedHistory.map((h, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-6 py-3 text-muted-foreground">{h.date}</td>
                  <td className="px-6 py-3 font-medium">{h.source}</td>
                  <td className="px-6 py-3"><Badge variant="secondary" className="rounded-full font-normal">{h.type}</Badge></td>
                  <td className="px-6 py-3 text-right font-semibold text-success">+₹{h.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function RewardCard({ r, onClaim }: { r: any; onClaim: () => void }) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-soft">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-lg font-bold text-primary">
        {r.app[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{r.app}</div>
          <Badge variant="secondary" className="rounded-full text-[10px] font-normal">Expires {r.expires}</Badge>
        </div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">{r.offer}</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold">₹{r.amount}</div>
        <Button size="sm" className="mt-1 h-7 rounded-full text-xs" onClick={onClaim}>Claim</Button>
      </div>
    </div>
  );
}
