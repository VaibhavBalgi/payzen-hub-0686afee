import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { transactions } from "@/lib/sampleData";

const PAGE = 8;

export default function Transactions() {
  const [q, setQ] = useState("");
  const [bank, setBank] = useState("all");
  const [app, setApp] = useState("all");
  const [cat, setCat] = useState("all");
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let r = transactions.filter((t) =>
      (q === "" || t.merchant.toLowerCase().includes(q.toLowerCase()) || t.raw.toLowerCase().includes(q.toLowerCase())) &&
      (bank === "all" || t.bank === bank) &&
      (app === "all" || t.app === app) &&
      (cat === "all" || t.category === cat)
    );
    r = [...r].sort((a, b) => sortDesc ? b.amount - a.amount : a.amount - b.amount);
    return r;
  }, [q, bank, app, cat, sortDesc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const slice = filtered.slice((page - 1) * PAGE, page * PAGE);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Transactions</h1>
          <p className="mt-1 text-sm text-muted-foreground">All your UPI activity, decoded and searchable.</p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-1 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Card className="border-border/60 p-5 shadow-soft">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search merchant, UPI description..." className="h-11 rounded-xl pl-9" />
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
            <FilterSelect label="Bank" value={bank} onChange={setBank} options={["all", "HDFC", "ICICI"]} />
            <FilterSelect label="App" value={app} onChange={setApp} options={["all", "GPay", "PhonePe", "Paytm", "BHIM", "Bank", "Auto-debit"]} />
            <FilterSelect label="Category" value={cat} onChange={setCat} options={["all", "Food", "Shopping", "Travel", "Subscription", "Utilities", "Income", "Groceries", "Other"]} />
            <FilterSelect label="Date" value="all" onChange={() => {}} options={["all", "Today", "Last 7 days", "Last 30 days"]} />
            <FilterSelect label="Status" value="all" onChange={() => {}} options={["all", "Success", "Pending", "Flagged"]} />
          </div>
        </div>
      </Card>

      <Card className="border-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Merchant</th>
                <th className="px-5 py-3 font-medium">UPI Description</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">
                  <button onClick={() => setSortDesc(!sortDesc)} className="inline-flex items-center gap-1 hover:text-foreground">
                    Amount <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Bank</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {slice.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-muted-foreground">No transactions match your filters.</td></tr>
              ) : slice.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 transition-colors hover:bg-secondary/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-base">{t.logo}</div>
                      <span className="font-medium">{t.merchant}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{t.raw}</td>
                  <td className="px-5 py-3"><Badge variant="secondary" className="rounded-full font-normal">{t.category}</Badge></td>
                  <td className={`px-5 py-3 font-semibold ${t.amount > 0 ? "text-success" : ""}`}>{t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toLocaleString()}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.date}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.bank}</td>
                  <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <div>Showing {slice.length} of {filtered.length}</div>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" disabled={page === 1} onClick={() => setPage(page - 1)} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="px-2 font-medium text-foreground">{page} / {totalPages}</span>
            <Button size="icon" variant="ghost" disabled={page === totalPages} onClick={() => setPage(page + 1)} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 rounded-xl">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o} value={o}>{o === "all" ? `All ${label}s` : o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Success: "bg-success-soft text-success",
    Pending: "bg-warning-soft text-warning",
    Flagged: "bg-danger-soft text-danger",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${map[status] || "bg-secondary"}`}>{status}</span>;
}
