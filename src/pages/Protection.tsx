import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert, Lock, AlertOctagon, Phone, CheckCircle2, Clock, FileText, Fingerprint
} from "lucide-react";
import { fraudAlerts } from "@/lib/sampleData";

const recovery = [
  { step: "Reported", desc: "Complaint registered with PayZen", date: "Apr 21, 2025 · 10:42", done: true },
  { step: "Bank notified", desc: "HDFC dispute team alerted", date: "Apr 21, 2025 · 10:48", done: true },
  { step: "Account secured", desc: "Card frozen, UPI limits set", date: "Apr 21, 2025 · 11:05", done: true },
  { step: "Investigation", desc: "Bank reviewing transaction logs", date: "Apr 22, 2025", done: false, active: true },
  { step: "Refund / Resolution", desc: "Awaiting outcome", date: "Pending", done: false },
];

export default function Protection() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Protection Center</h1>
        <p className="mt-1 text-sm text-muted-foreground">Act fast. Stay safe. We've got your back.</p>
      </div>

      {/* Emergency actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden border-danger/30 bg-danger-soft/30 p-6 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger text-danger-foreground shadow-glow">
              <Lock className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Emergency Freeze</h3>
              <p className="mt-1 text-sm text-muted-foreground">Instantly freeze all linked accounts and UPI activity.</p>
            </div>
          </div>
          <Button className="mt-4 w-full rounded-xl bg-danger text-danger-foreground hover:bg-danger/90">
            <Lock className="mr-1.5 h-4 w-4" /> Freeze All Accounts
          </Button>
        </Card>

        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning-soft text-warning">
              <AlertOctagon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Report unauthorized transaction</h3>
              <p className="mt-1 text-sm text-muted-foreground">File a dispute and start the recovery process.</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full rounded-xl">Open Report</Button>
        </Card>
      </div>

      {/* Suspicious table */}
      <Card className="border-border/60 shadow-soft overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-danger" />
            <h3 className="font-semibold">Suspicious activity</h3>
          </div>
          <Badge className="rounded-full bg-danger-soft text-danger hover:bg-danger-soft">{fraudAlerts.filter(a => a.status === "Under Review").length} active</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-medium">Case ID</th>
                <th className="px-6 py-3 font-medium">Merchant</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Risk</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {fraudAlerts.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{a.id}</td>
                  <td className="px-6 py-3 font-medium">{a.merchant}</td>
                  <td className="px-6 py-3 font-semibold">₹{a.amount.toLocaleString()}</td>
                  <td className="px-6 py-3 text-muted-foreground">{a.date}</td>
                  <td className="px-6 py-3"><RiskBadge risk={a.risk} /></td>
                  <td className="px-6 py-3 text-muted-foreground">{a.status}</td>
                  <td className="px-6 py-3 text-right">
                    <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs">Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recovery timeline */}
        <Card className="lg:col-span-2 border-border/60 p-6 shadow-soft">
          <h3 className="font-semibold">Guided recovery · Case F-2241</h3>
          <p className="text-xs text-muted-foreground">Track your dispute from report to resolution.</p>
          <ol className="mt-6 space-y-5">
            {recovery.map((r, i) => (
              <li key={r.step} className="relative flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${r.done ? "bg-success text-success-foreground" : r.active ? "bg-primary text-primary-foreground shadow-glow animate-pulse-soft" : "bg-secondary text-muted-foreground"}`}>
                    {r.done ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-4 w-4" />}
                  </div>
                  {i < recovery.length - 1 && <div className={`mt-1 w-px flex-1 ${r.done ? "bg-success" : "bg-border"}`} />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{r.step}</span>
                    {r.active && <Badge className="rounded-full bg-primary-soft text-primary hover:bg-primary-soft text-[10px]">In progress</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">{r.desc}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.date}</div>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        {/* Complaint tracker + bank support */}
        <div className="space-y-4">
          <Card className="border-border/60 p-6 shadow-soft">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Complaint tracker</h3>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { id: "F-2241", state: "In progress", tone: "primary" },
                { id: "F-2235", state: "Resolved", tone: "success" },
                { id: "F-2228", state: "Dismissed", tone: "muted" },
              ].map((c) => (
                <div key={c.id} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    c.tone === "primary" ? "bg-primary-soft text-primary" :
                    c.tone === "success" ? "bg-success-soft text-success" :
                    "bg-secondary text-muted-foreground"
                  }`}>{c.state}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-border/60 p-6 shadow-soft">
            <h3 className="font-semibold">Bank support</h3>
            <div className="mt-3 space-y-2">
              <BankSupport bank="HDFC Bank" phone="1800 202 6161" />
              <BankSupport bank="ICICI Bank" phone="1800 1080" />
              <BankSupport bank="NPCI UPI" phone="1800 120 1740" />
            </div>
          </Card>
        </div>
      </div>

      {/* Tips & verification */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-border/60 p-6 shadow-soft">
          <h3 className="font-semibold">Safety tips</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>• Never share your UPI PIN — not even with bank staff.</li>
            <li>• Verify every QR code before scanning at merchants.</li>
            <li>• Enable transaction alerts on every linked bank account.</li>
            <li>• Use unique PINs for each UPI app and rotate quarterly.</li>
            <li>• Avoid public WiFi when authorizing payments.</li>
          </ul>
        </Card>

        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-success" />
            <h3 className="font-semibold">Verification</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Strengthen your account with extra security layers.</p>
          <div className="mt-4 space-y-2">
            <VerifyRow label="Phone number" status="Verified" tone="success" />
            <VerifyRow label="Email address" status="Verified" tone="success" />
            <VerifyRow label="Aadhaar e-KYC" status="Pending" tone="warning" />
            <VerifyRow label="Two-factor auth" status="Enabled" tone="success" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const map: Record<string, string> = {
    High: "bg-danger-soft text-danger",
    Medium: "bg-warning-soft text-warning",
    Low: "bg-secondary text-muted-foreground",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${map[risk]}`}>{risk}</span>;
}

function BankSupport({ bank, phone }: { bank: string; phone: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2.5 text-sm">
      <span className="font-medium">{bank}</span>
      <a href={`tel:${phone}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
        <Phone className="h-3 w-3" /> {phone}
      </a>
    </div>
  );
}

function VerifyRow({ label, status, tone }: { label: string; status: string; tone: "success" | "warning" }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2.5">
      <span className="text-sm font-medium">{label}</span>
      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tone === "success" ? "bg-success-soft text-success" : "bg-warning-soft text-warning"}`}>{status}</span>
    </div>
  );
}
