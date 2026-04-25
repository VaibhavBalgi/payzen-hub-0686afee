import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Wallet, Check, ShieldCheck, Lock, EyeOff, Plus, ArrowRight, Building2 } from "lucide-react";

const apps = [
  { name: "Google Pay", color: "bg-blue-500", icon: "G" },
  { name: "PhonePe", color: "bg-purple-600", icon: "Pe" },
  { name: "Paytm", color: "bg-sky-500", icon: "P" },
  { name: "BHIM", color: "bg-orange-500", icon: "B" },
  { name: "Amazon Pay", color: "bg-amber-500", icon: "A" },
  { name: "Other UPI", color: "bg-slate-500", icon: "+" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiId, setUpiId] = useState("priya@okhdfcbank");
  const [verifying, setVerifying] = useState(false);
  const [connected, setConnected] = useState<string[]>(["Google Pay", "PhonePe"]);
  const [banks, setBanks] = useState(["HDFC Bank ••4521", "ICICI Bank ••8912"]);
  const [consent, setConsent] = useState(true);

  const verify = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setUpiVerified(true); }, 800);
  };

  const toggleApp = (name: string) =>
    setConnected((c) => c.includes(name) ? c.filter((x) => x !== name) : [...c, name]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-hero shadow-glow">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">PayZen</span>
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">Skip for now</Link>
        </div>
      </header>

      <div className="container max-w-3xl py-10">
        {/* Steps */}
        <div className="mb-10 flex items-center justify-center gap-2 text-sm">
          <Step n={1} label="Login" done />
          <Connector done />
          <Step n={2} label="Connect Accounts" active />
          <Connector />
          <Step n={3} label="Dashboard" />
        </div>

        <div className="text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">Connect your payment world</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Securely link your UPI ID, payment apps, and bank accounts. Read-only — we'll never move your money.</p>
        </div>

        <div className="mt-10 space-y-6">
          {/* UPI */}
          <Card className="border-border/60 p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Step A · Enter your UPI ID</h3>
                <p className="text-sm text-muted-foreground">We'll verify it and pull your linked transactions.</p>
              </div>
              {upiVerified && <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-3 py-1 text-xs font-medium text-success"><Check className="h-3 w-3" /> Verified</span>}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input value={upiId} onChange={(e) => setUpiId(e.target.value)} className="h-11 flex-1 rounded-xl" placeholder="yourname@upi" />
              <Button onClick={verify} disabled={verifying || upiVerified} className="h-11 rounded-xl">
                {upiVerified ? <><Check className="mr-1 h-4 w-4" /> Verified</> : verifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </Card>

          {/* Apps */}
          <Card className="border-border/60 p-6 shadow-soft">
            <h3 className="font-semibold">Step B · Connect Payment Apps</h3>
            <p className="text-sm text-muted-foreground">Tap to connect. You can add more anytime.</p>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
              {apps.map((app) => {
                const isConnected = connected.includes(app.name);
                return (
                  <button
                    key={app.name}
                    onClick={() => toggleApp(app.name)}
                    className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition-all hover:shadow-soft ${isConnected ? "border-success/30 bg-success-soft/40" : "border-border bg-card"}`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${app.color} text-sm font-bold text-white`}>{app.icon}</div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{app.name}</div>
                      <div className={`text-xs ${isConnected ? "text-success" : "text-muted-foreground"}`}>
                        {isConnected ? "Connected" : "Tap to connect"}
                      </div>
                    </div>
                    {isConnected && <Check className="h-4 w-4 shrink-0 text-success" />}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Banks */}
          <Card className="border-border/60 p-6 shadow-soft">
            <h3 className="font-semibold">Step C · Connect Bank Accounts</h3>
            <div className="mt-4 space-y-2">
              {banks.map((b) => (
                <div key={b} className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{b}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-success"><Check className="h-3 w-3" /> Linked</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full rounded-xl" onClick={() => setBanks([...banks, "Axis Bank ••2210"])}>
              <Plus className="mr-1 h-4 w-4" /> Add another bank
            </Button>
          </Card>

          {/* Consent */}
          <Card className="border-border/60 bg-primary-soft/40 p-6 shadow-soft">
            <div className="flex gap-3">
              <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(!!v)} className="mt-1" />
              <Label htmlFor="consent" className="text-sm leading-relaxed text-foreground">
                I agree to PayZen securely processing my read-only transaction data to provide tracking, insights, fraud alerts and reward management. Data is encrypted end-to-end and never sold.
              </Label>
            </div>
          </Card>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3">
            <TrustBadge icon={Lock} label="Encrypted" />
            <TrustBadge icon={EyeOff} label="Privacy First" />
            <TrustBadge icon={ShieldCheck} label="Secure Access" />
          </div>

          {/* CTA */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button asChild variant="outline" className="h-12 rounded-xl sm:flex-1">
              <Link to="/dashboard">Skip for Now</Link>
            </Button>
            <Button onClick={() => navigate("/dashboard")} disabled={!consent} className="h-12 rounded-xl shadow-glow sm:flex-1">
              Continue to Dashboard <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ n, label, done, active }: { n: number; label: string; done?: boolean; active?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${done ? "bg-success text-success-foreground" : active ? "bg-primary text-primary-foreground shadow-glow" : "bg-secondary text-muted-foreground"}`}>
        {done ? <Check className="h-4 w-4" /> : n}
      </div>
      <span className={`hidden sm:inline ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{label}</span>
    </div>
  );
}

function Connector({ done }: { done?: boolean }) {
  return <div className={`h-px w-8 sm:w-16 ${done ? "bg-success" : "bg-border"}`} />;
}

function TrustBadge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-3 text-xs font-medium text-muted-foreground">
      <Icon className="h-4 w-4 text-success" /> {label}
    </div>
  );
}
