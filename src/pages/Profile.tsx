import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Building2, Smartphone, Bell, Lock, Moon, Eye, HelpCircle, LogOut, Pencil, Plus
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [notif, setNotif] = useState({ fraud: true, cashback: true, debit: true, marketing: false });

  const toggleDark = (v: boolean) => {
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Profile & Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account, security and preferences.</p>
      </div>

      {/* Profile card */}
      <Card className="relative overflow-hidden border-border/60 p-6 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-24 gradient-hero opacity-90" />
        <div className="relative flex flex-col items-start gap-5 pt-12 md:flex-row md:items-end">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-card bg-primary-soft text-3xl font-bold text-primary shadow-soft">PS</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Priya Sharma</h2>
            <div className="text-sm text-muted-foreground">priya@payzen.app · +91 98765 43210</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className="rounded-full bg-success-soft text-success hover:bg-success-soft">Verified</Badge>
              <Badge variant="secondary" className="rounded-full">Pro Member</Badge>
            </div>
          </div>
          <Button variant="outline" className="rounded-xl">
            <Pencil className="mr-1 h-4 w-4" /> Edit profile
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Banks */}
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Linked bank accounts</h3>
            <Button size="sm" variant="ghost" className="rounded-full text-xs"><Plus className="mr-1 h-3 w-3" /> Add</Button>
          </div>
          <div className="mt-4 space-y-2">
            {["HDFC Bank ••4521", "ICICI Bank ••8912"].map((b) => (
              <div key={b} className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><Building2 className="h-4 w-4" /></div>
                  <span className="text-sm font-medium">{b}</span>
                </div>
                <Badge className="rounded-full bg-success-soft text-success hover:bg-success-soft">Active</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Apps */}
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Connected apps</h3>
            <Button size="sm" variant="ghost" className="rounded-full text-xs"><Plus className="mr-1 h-3 w-3" /> Add</Button>
          </div>
          <div className="mt-4 space-y-2">
            {["Google Pay", "PhonePe", "Paytm"].map((a) => (
              <div key={a} className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><Smartphone className="h-4 w-4" /></div>
                  <span className="text-sm font-medium">{a}</span>
                </div>
                <Button size="sm" variant="ghost" className="h-7 rounded-full text-xs">Disconnect</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Notification settings</h3>
          </div>
          <div className="mt-4 space-y-3">
            <ToggleRow label="Fraud alerts" desc="Real-time suspicious activity" checked={notif.fraud} onChange={(v) => setNotif({ ...notif, fraud: v })} />
            <ToggleRow label="Cashback reminders" desc="Before offers expire" checked={notif.cashback} onChange={(v) => setNotif({ ...notif, cashback: v })} />
            <ToggleRow label="Auto-debit reminders" desc="One day before charges" checked={notif.debit} onChange={(v) => setNotif({ ...notif, debit: v })} />
            <ToggleRow label="Marketing emails" desc="Tips, news and offers" checked={notif.marketing} onChange={(v) => setNotif({ ...notif, marketing: v })} />
          </div>
        </Card>

        {/* Security */}
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-success" />
            <h3 className="font-semibold">Security</h3>
          </div>
          <div className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Change password</Label>
              <Input type="password" placeholder="••••••••" className="h-10 rounded-xl" />
            </div>
            <ToggleRow label="Two-factor auth" desc="OTP on every login" checked={true} onChange={() => {}} />
            <ToggleRow label="Biometric login" desc="Fingerprint / Face ID" checked={true} onChange={() => {}} />
          </div>
        </Card>

        {/* Appearance & Privacy */}
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Appearance & Privacy</h3>
          </div>
          <div className="mt-4 space-y-3">
            <ToggleRow label="Dark mode" desc="Easier on the eyes" checked={dark} onChange={toggleDark} />
            <ToggleRow label="Hide balances" desc="Mask amounts in screenshots" checked={false} onChange={() => {}} />
            <ToggleRow label="Anonymous analytics" desc="Help us improve PayZen" checked={true} onChange={() => {}} />
          </div>
        </Card>

        {/* Help */}
        <Card className="border-border/60 p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Help & Support</h3>
          </div>
          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full justify-start rounded-xl">Contact support</Button>
            <Button variant="outline" className="w-full justify-start rounded-xl">Help center</Button>
            <Button variant="outline" className="w-full justify-start rounded-xl">Report an issue</Button>
          </div>
          <Button onClick={() => navigate("/")} variant="outline" className="mt-4 w-full justify-start rounded-xl border-danger/30 text-danger hover:bg-danger-soft hover:text-danger">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </Card>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl bg-secondary/40 p-3">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
