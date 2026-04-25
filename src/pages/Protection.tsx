import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert, Lock, AlertOctagon, Phone, CheckCircle2, Clock, FileText, Fingerprint,
  Mail, Send, ShieldCheck, AlertTriangle, XCircle, ChevronUp, Copy
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { fraudAlerts } from "@/lib/sampleData";

type SuspiciousStatus = "Under Review" | "Marked Safe" | "Reported" | "Escalated";
type SuspiciousRow = {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  risk: "High" | "Medium" | "Low";
  status: SuspiciousStatus;
};

const initialSuspicious: SuspiciousRow[] = [
  { id: "S-9821", merchant: "MRCH-XYZ-9821", amount: 1499, date: "Apr 20, 2025", risk: "High", status: "Under Review" },
  { id: "S-9788", merchant: "INTL*GAMING-LDN", amount: 4220, date: "Apr 14, 2025", risk: "High", status: "Under Review" },
  { id: "S-9762", merchant: "Repeat Debit X3", amount: 240, date: "Apr 09, 2025", risk: "Medium", status: "Under Review" },
  { id: "S-9741", merchant: "QUICKPAY-UPI-7733", amount: 899, date: "Apr 05, 2025", risk: "Low", status: "Under Review" },
];

const recovery = [
  { step: "Reported", desc: "Complaint registered with PayZen", date: "Apr 21, 2025 · 10:42", done: true },
  { step: "Bank notified", desc: "HDFC dispute team alerted", date: "Apr 21, 2025 · 10:48", done: true },
  { step: "Account secured", desc: "Card frozen, UPI limits set", date: "Apr 21, 2025 · 11:05", done: true },
  { step: "Investigation", desc: "Bank reviewing transaction logs", date: "Apr 22, 2025", done: false, active: true },
  { step: "Refund / Resolution", desc: "Awaiting outcome", date: "Pending", done: false },
];

export default function Protection() {
  const [reportOpen, setReportOpen] = useState(false);
  const [suspicious, setSuspicious] = useState<SuspiciousRow[]>(initialSuspicious);
  const [escalateRow, setEscalateRow] = useState<SuspiciousRow | null>(null);

  const setStatus = (id: string, status: SuspiciousStatus, msg: string) => {
    setSuspicious(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast({ title: msg });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <ReportPanel
        open={reportOpen}
        onOpenChange={setReportOpen}
        rows={suspicious}
        onMarkSafe={(r) => setStatus(r.id, "Marked Safe", `${r.merchant} marked safe`)}
        onReport={(r) => setStatus(r.id, "Reported", `Fraud reported for ${r.merchant}`)}
        onEscalate={(r) => setEscalateRow(r)}
      />
      <EscalateDialog row={escalateRow} onClose={() => setEscalateRow(null)} onSent={(r) => {
        setStatus(r.id, "Escalated", "Complaint email sent successfully");
        setEscalateRow(null);
      }} />
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
          <Button onClick={() => setReportOpen(true)} variant="outline" className="mt-4 w-full rounded-xl">Open Report</Button>
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

function statusTone(s: SuspiciousStatus): string {
  if (s === "Marked Safe") return "bg-success-soft text-success";
  if (s === "Reported") return "bg-warning-soft text-warning";
  if (s === "Escalated") return "bg-primary-soft text-primary";
  return "bg-secondary text-muted-foreground";
}

function ReportPanel({
  open, onOpenChange, rows, onMarkSafe, onReport, onEscalate,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  rows: SuspiciousRow[];
  onMarkSafe: (r: SuspiciousRow) => void;
  onReport: (r: SuspiciousRow) => void;
  onEscalate: (r: SuspiciousRow) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl p-0 overflow-hidden gap-0">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-danger" /> Suspicious transactions
          </DialogTitle>
          <DialogDescription>Review flagged activity and take action immediately.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          {/* Mobile cards */}
          <div className="space-y-3 p-4 md:hidden">
            {rows.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold">{r.merchant}</div>
                    <div className="text-xs text-muted-foreground">{r.date} · {r.id}</div>
                  </div>
                  <RiskBadge risk={r.risk} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-bold">₹{r.amount.toLocaleString()}</div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusTone(r.status)}`}>{r.status}</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs" onClick={() => onMarkSafe(r)} disabled={r.status === "Marked Safe"}>
                    <ShieldCheck className="mr-1 h-3 w-3" /> Safe
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 rounded-lg border-danger/30 text-danger text-xs hover:bg-danger-soft hover:text-danger" onClick={() => onReport(r)} disabled={r.status === "Reported"}>
                    <AlertTriangle className="mr-1 h-3 w-3" /> Report
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs" onClick={() => onEscalate(r)}>
                    <ChevronUp className="mr-1 h-3 w-3" /> Escalate
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Merchant</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Risk</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                    <td className="px-6 py-3">
                      <div className="font-medium">{r.merchant}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">{r.id}</div>
                    </td>
                    <td className="px-6 py-3 font-semibold">₹{r.amount.toLocaleString()}</td>
                    <td className="px-6 py-3 text-muted-foreground">{r.date}</td>
                    <td className="px-6 py-3"><RiskBadge risk={r.risk} /></td>
                    <td className="px-6 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusTone(r.status)}`}>{r.status}</span></td>
                    <td className="px-6 py-3">
                      <div className="flex justify-end gap-1.5">
                        <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs" onClick={() => onMarkSafe(r)} disabled={r.status === "Marked Safe"}>
                          <ShieldCheck className="mr-1 h-3 w-3" /> Mark Safe
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 rounded-lg border-danger/30 text-danger text-xs hover:bg-danger-soft hover:text-danger" onClick={() => onReport(r)} disabled={r.status === "Reported"}>
                          <AlertTriangle className="mr-1 h-3 w-3" /> Report Fraud
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs" onClick={() => onEscalate(r)}>
                          <ChevronUp className="mr-1 h-3 w-3" /> Escalate
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EscalateDialog({ row, onClose, onSent }: { row: SuspiciousRow | null; onClose: () => void; onSent: (r: SuspiciousRow) => void }) {
  const [reason, setReason] = useState("Unauthorized transaction. I did not authorize this debit and request immediate investigation.");
  const authority = "authority@payzen-support.com";
  const userName = "Priya Sharma";

  if (!row) return null;
  const subject = `URGENT: Fraud escalation — Case ${row.id} (₹${row.amount.toLocaleString()})`;
  const body = `To: ${authority}
From: ${userName} <priya@payzen.app>
Subject: ${subject}

Dear Authority,

I am writing to escalate a suspicious transaction on my PayZen-linked account that requires urgent review.

Customer: ${userName}
Case ID: ${row.id}
Merchant: ${row.merchant}
Amount: ₹${row.amount.toLocaleString()}
Date: ${row.date}
Risk Level: ${row.risk}
Urgency: HIGH — immediate action requested

Complaint reason:
${reason}

Please investigate and respond within 24 hours.

Regards,
${userName}`;

  return (
    <Dialog open={!!row} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" /> Email higher authority
          </DialogTitle>
          <DialogDescription>An auto-generated complaint email will be sent to PayZen support.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label className="text-xs">To</Label>
            <div className="mt-1 flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm">
              <span className="font-mono">{authority}</span>
              <button onClick={() => { navigator.clipboard.writeText(authority); toast({ title: "Copied" }); }} className="text-muted-foreground hover:text-foreground">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div>
            <Label className="text-xs">Subject</Label>
            <Input readOnly value={subject} className="mt-1 rounded-lg" />
          </div>
          <div>
            <Label className="text-xs">Complaint reason</Label>
            <Textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="mt-1 rounded-lg" />
          </div>
          <div>
            <Label className="text-xs">Preview</Label>
            <pre className="mt-1 max-h-40 overflow-auto rounded-lg border border-border bg-secondary/40 p-3 text-[11px] whitespace-pre-wrap font-mono">{body}</pre>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" className="rounded-xl" onClick={onClose}>Cancel</Button>
          <Button className="rounded-xl" onClick={() => onSent(row)}>
            <Send className="mr-1.5 h-4 w-4" /> Send Mail to Higher Authority
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
