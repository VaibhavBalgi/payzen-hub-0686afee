import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft, ScanLine, CheckCircle2, ShieldCheck, Delete,
  ShoppingBag, Utensils, Receipt, Plane, Send, Film, Repeat, Store, MoreHorizontal, Download,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Step = "scan" | "bank" | "category" | "pin" | "success";

const banks = [
  { id: "hdfc", name: "HDFC Bank", nickname: "Salary Account", masked: "•••• 4521" },
  { id: "icici", name: "ICICI Bank", nickname: "Savings", masked: "•••• 8830" },
  { id: "sbi", name: "State Bank of India", nickname: "Joint Account", masked: "•••• 1247" },
  { id: "axis", name: "Axis Bank", nickname: "Spending", masked: "•••• 6092" },
];

const categories = [
  { id: "Merchant", icon: Store },
  { id: "Food", icon: Utensils },
  { id: "Shopping", icon: ShoppingBag },
  { id: "Bills", icon: Receipt },
  { id: "Travel", icon: Plane },
  { id: "Transfer", icon: Send },
  { id: "Entertainment", icon: Film },
  { id: "Subscription", icon: Repeat },
  { id: "Others", icon: MoreHorizontal },
];

const merchant = { name: "Brew & Bites Cafe", upi: "brewbites@hdfcbank", amount: 487 };

export default function ScanPayDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [step, setStep] = useState<Step>("scan");
  const [scanned, setScanned] = useState(false);
  const [bank, setBank] = useState(banks[0].id);
  const [category, setCategory] = useState("Merchant");
  const [otherCat, setOtherCat] = useState("");
  const [pin, setPin] = useState("");
  const [txnId] = useState(() => "TXN" + Math.floor(Math.random() * 9_000_000 + 1_000_000));

  // Reset on close
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("scan"); setScanned(false); setPin(""); setCategory("Merchant"); setOtherCat("");
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Auto-detect QR after delay
  useEffect(() => {
    if (open && step === "scan" && !scanned) {
      const t = setTimeout(() => setScanned(true), 2200);
      return () => clearTimeout(t);
    }
  }, [open, step, scanned]);

  const selectedBank = banks.find(b => b.id === bank)!;
  const finalCategory = category === "Others" ? (otherCat.trim() || "Others") : category;
  const now = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  const back = () => {
    if (step === "bank") setStep("scan");
    else if (step === "category") setStep("bank");
    else if (step === "pin") setStep("category");
  };

  const pressKey = (k: string) => {
    if (k === "del") setPin(p => p.slice(0, -1));
    else if (pin.length < 6) setPin(p => p + k);
  };

  const pay = () => {
    if (pin.length < 4) {
      toast({ title: "Enter your UPI PIN", description: "PIN must be 4 to 6 digits.", variant: "destructive" });
      return;
    }
    setStep("success");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl gap-0">
        {/* Header */}
        <DialogHeader className="flex-row items-center gap-2 space-y-0 border-b border-border px-4 py-3">
          {step !== "scan" && step !== "success" && (
            <button onClick={back} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div className="flex-1">
            <DialogTitle className="text-base">
              {step === "scan" && "Scan QR to Pay"}
              {step === "bank" && "Select Bank Account"}
              {step === "category" && "Payment Category"}
              {step === "pin" && "Confirm Payment"}
              {step === "success" && "Payment Successful"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Step {step === "scan" ? 1 : step === "bank" ? 2 : step === "category" ? 3 : step === "pin" ? 4 : 5} of 5
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {step === "scan" && (
            <div className="space-y-4 animate-fade-in">
              <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl bg-gradient-to-br from-foreground to-foreground/80">
                {/* viewfinder corners */}
                <div className="absolute left-4 top-4 h-8 w-8 rounded-tl-xl border-l-4 border-t-4 border-primary-foreground" />
                <div className="absolute right-4 top-4 h-8 w-8 rounded-tr-xl border-r-4 border-t-4 border-primary-foreground" />
                <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b-4 border-l-4 border-primary-foreground" />
                <div className="absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b-4 border-r-4 border-primary-foreground" />
                {!scanned && (
                  <>
                    <div className="absolute inset-x-8 top-1/2 h-0.5 animate-pulse bg-primary-glow shadow-glow" />
                    <ScanLine className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-primary-foreground/40" />
                  </>
                )}
                {scanned && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-success/90 text-success-foreground animate-fade-in">
                    <CheckCircle2 className="h-14 w-14" />
                    <div className="mt-2 font-semibold">QR detected</div>
                    <div className="mt-1 text-xs opacity-90">{merchant.upi}</div>
                  </div>
                )}
              </div>
              <p className="text-center text-xs text-muted-foreground">
                {scanned ? "Verify merchant and continue" : "Align the QR code within the frame"}
              </p>
              {scanned && (
                <div className="rounded-xl border border-border bg-secondary/40 p-3">
                  <div className="text-xs text-muted-foreground">Paying to</div>
                  <div className="font-semibold">{merchant.name}</div>
                  <div className="text-xs text-muted-foreground">{merchant.upi}</div>
                  <div className="mt-2 text-2xl font-bold">₹{merchant.amount}</div>
                </div>
              )}
              <Button disabled={!scanned} onClick={() => setStep("bank")} className="w-full rounded-xl">
                Continue
              </Button>
            </div>
          )}

          {step === "bank" && (
            <div className="space-y-3 animate-fade-in">
              <RadioGroup value={bank} onValueChange={setBank} className="space-y-2">
                {banks.map((b) => (
                  <Label
                    key={b.id}
                    htmlFor={b.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
                      bank === b.id ? "border-primary bg-primary-soft" : "border-border hover:bg-secondary/40"
                    }`}
                  >
                    <RadioGroupItem value={b.id} id={b.id} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{b.name}</div>
                      <div className="text-xs text-muted-foreground">{b.nickname} · {b.masked}</div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              <Button onClick={() => setStep("category")} className="w-full rounded-xl">Continue</Button>
            </div>
          )}

          {step === "category" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-3 gap-2">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const active = category === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all ${
                        active ? "border-primary bg-primary-soft text-primary" : "border-border hover:bg-secondary/40"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {c.id}
                    </button>
                  );
                })}
              </div>
              {category === "Others" && (
                <Input
                  placeholder="Enter payment type"
                  value={otherCat}
                  onChange={(e) => setOtherCat(e.target.value)}
                  className="rounded-xl"
                />
              )}
              <Button onClick={() => setStep("pin")} className="w-full rounded-xl">Continue to Pay</Button>
            </div>
          )}

          {step === "pin" && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-xl border border-border bg-secondary/40 p-3 text-sm">
                <Row k="Paying to" v={merchant.name} />
                <Row k="UPI ID" v={merchant.upi} />
                <Row k="From" v={`${selectedBank.name} ${selectedBank.masked}`} />
                <Row k="Category" v={finalCategory} />
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-xl font-bold">₹{merchant.amount}</span>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" /> Enter UPI PIN
                </div>
                <div className="flex justify-center gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={`flex h-11 w-9 items-center justify-center rounded-lg border text-xl ${
                      pin.length > i ? "border-primary bg-primary-soft" : "border-border bg-card"
                    }`}>
                      {pin[i] ? "•" : ""}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["1","2","3","4","5","6","7","8","9","",0,"del"].map((k, i) => (
                  k === "" ? <div key={i} /> :
                  <button
                    key={i}
                    onClick={() => pressKey(String(k))}
                    className="flex h-11 items-center justify-center rounded-xl border border-border bg-card text-base font-semibold hover:bg-secondary transition-colors"
                  >
                    {k === "del" ? <Delete className="h-4 w-4" /> : k}
                  </button>
                ))}
              </div>

              <Button onClick={pay} className="w-full rounded-xl">Pay ₹{merchant.amount}</Button>
            </div>
          )}

          {step === "success" && (
            <div className="space-y-4 text-center animate-fade-in">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-soft text-success">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div>
                <div className="text-lg font-bold">Payment Done</div>
                <div className="text-3xl font-bold mt-1">₹{merchant.amount}</div>
                <div className="text-xs text-muted-foreground mt-1">paid to {merchant.name}</div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-3 text-left text-sm">
                <Row k="Transaction ID" v={txnId} mono />
                <Row k="From" v={`${selectedBank.name} ${selectedBank.masked}`} />
                <Row k="Category" v={finalCategory} />
                <Row k="Date & Time" v={now} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => toast({ title: "Receipt downloaded", description: `Receipt for ${txnId} saved.` })}
                >
                  <Download className="mr-1.5 h-4 w-4" /> Receipt
                </Button>
                <Button className="rounded-xl" onClick={() => onOpenChange(false)}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-muted-foreground">{k}</span>
      <span className={`text-sm font-medium ${mono ? "font-mono text-xs" : ""}`}>{v}</span>
    </div>
  );
}
