import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Wallet, Gift, ShieldCheck, AlertTriangle, Sparkles, BarChart3,
  ArrowRight, Check, Star, Zap, Lock, TrendingUp, Eye
} from "lucide-react";

const features = [
  { icon: Wallet, title: "Unified UPI Tracking", desc: "All your transactions from GPay, PhonePe, Paytm, BHIM in one clean view." },
  { icon: Gift, title: "Cashback Manager", desc: "Never miss a reward — see what's available, what expires, and what's claimed." },
  { icon: AlertTriangle, title: "Leak Detector", desc: "Spot hidden recurring charges and forgotten subscriptions silently draining your account." },
  { icon: ShieldCheck, title: "Fraud Protection", desc: "Real-time alerts, emergency freeze, and guided recovery if something looks off." },
  { icon: Sparkles, title: "AI Insights", desc: "Plain-English explanations of cryptic UPI descriptions and smart spending nudges." },
  { icon: BarChart3, title: "Beautiful Analytics", desc: "Charts, categories, and trends that actually help you understand your money." },
];

const benefits = [
  "Save ₹3,000+ per month by catching hidden charges",
  "Claim every cashback before it expires",
  "Decode confusing UPI merchant names instantly",
  "Freeze accounts in seconds during fraud",
  "Bank-grade encryption, read-only access",
  "Works with every Indian bank and UPI app",
];

const testimonials = [
  { name: "Priya Sharma", role: "Product Designer, Bangalore", quote: "PayZen found ₹2,400 in subscriptions I forgot about. Paid for itself in week one.", avatar: "PS" },
  { name: "Rahul Mehta", role: "Founder, FinEdge", quote: "Finally I can see all my GPay, PhonePe and bank txns in one dashboard. Magic.", avatar: "RM" },
  { name: "Anjali Iyer", role: "CA, Mumbai", quote: "The fraud alert caught a suspicious debit before I even noticed. Lifesaver.", avatar: "AI" },
];

const faqs = [
  { q: "Is PayZen safe to use?", a: "Yes. We use bank-grade encryption, read-only access, and never store your UPI PIN or passwords. You stay in control." },
  { q: "Which banks and UPI apps work?", a: "All major Indian banks and every UPI app — Google Pay, PhonePe, Paytm, BHIM, Amazon Pay, and more." },
  { q: "How does the leak detector work?", a: "PayZen scans your transaction history for recurring debits, identifies forgotten subscriptions, and flags rising costs." },
  { q: "Will PayZen access my money?", a: "No. PayZen only reads your transaction data. We can never move money or change anything in your accounts." },
  { q: "Is there a free plan?", a: "Yes. Core tracking, fraud alerts, and the leak detector are free forever. Premium unlocks advanced AI insights." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-hero shadow-glow">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">PayZen</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Stories</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-sm font-medium text-foreground hover:text-primary md:inline-flex">Sign in</Link>
            <Button asChild size="sm" className="rounded-full shadow-glow">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-soft" />
        <div className="absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Now with AI-powered transaction insights
            </div>
            <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Control Every <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Rupee</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Track payments, save rewards, stop hidden charges, and stay protected from fraud — all in one premium UPI command center.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8 shadow-glow">
                <Link to="/login">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Bank-grade encryption</span>
              <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> Read-only access</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Free forever plan</span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative mx-auto mt-16 max-w-5xl animate-slide-up">
            <div className="absolute inset-x-12 -bottom-6 h-24 rounded-full bg-primary/20 blur-3xl" />
            <Card className="relative overflow-hidden border-border/60 p-2 shadow-elevated">
              <div className="rounded-xl bg-gradient-to-br from-secondary to-background p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <DemoStat label="Monthly Spend" value="₹18,540" trend="+12%" tone="primary" />
                  <DemoStat label="Cashback Earned" value="₹1,760" trend="+₹245" tone="success" />
                  <DemoStat label="Hidden Charges Blocked" value="₹3,210" trend="6 found" tone="warning" />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
                  <Card className="md:col-span-3 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold">Weekly Spending</span>
                      <span className="text-xs text-muted-foreground">Last 7 days</span>
                    </div>
                    <div className="flex h-32 items-end gap-2">
                      {[40, 60, 35, 75, 50, 90, 65].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-primary-glow opacity-80 transition-all hover:opacity-100" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </Card>
                  <Card className="md:col-span-2 p-5">
                    <span className="mb-3 block text-sm font-semibold">Recent</span>
                    <div className="space-y-3">
                      {[{m:"Swiggy",a:"-₹428"},{m:"Salary",a:"+₹84,500"},{m:"Netflix",a:"-₹649"}].map((t,i)=>(
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t.m}</span>
                          <span className={t.a.startsWith("+") ? "font-semibold text-success" : "font-medium"}>{t.a}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Everything your money needs</h2>
          <p className="mt-4 text-lg text-muted-foreground">Six powerful tools, one beautiful dashboard.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} className="group relative overflow-hidden border-border/60 p-7 transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="border-y border-border bg-secondary/40 py-24">
        <div className="container grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Built to save you serious money</h2>
            <p className="mt-4 text-lg text-muted-foreground">PayZen users typically uncover ₹3,000–₹8,000 in monthly leaks within their first week.</p>
            <ul className="mt-8 space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-10 rounded-full shadow-glow">
              <Link to="/login">Start saving free <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <BenefitCard icon={TrendingUp} value="₹4,820" label="Avg. monthly savings" tone="success" />
            <BenefitCard icon={Zap} value="< 30s" label="Setup time" tone="primary" />
            <BenefitCard icon={ShieldCheck} value="99.9%" label="Fraud detection" tone="warning" />
            <BenefitCard icon={Star} value="4.9★" label="App store rating" tone="primary" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Loved by money-smart Indians</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-border/60 p-7 shadow-soft">
              <div className="mb-3 flex gap-0.5 text-warning">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-foreground">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">{t.avatar}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border bg-secondary/40 py-24">
        <div className="container max-w-3xl">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Questions, answered</h2>
          </div>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24">
        <Card className="relative overflow-hidden border-0 p-12 text-center text-primary-foreground gradient-hero shadow-elevated md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative text-balance text-3xl font-bold md:text-5xl">Ready to control every rupee?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/90">Join 1.2M+ users tracking ₹400Cr+ in transactions every month.</p>
          <Button asChild size="lg" variant="secondary" className="relative mt-8 rounded-full px-10">
            <Link to="/login">Get Started Free <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                <Wallet className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">PayZen</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Smart UPI management for modern India.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Dashboard", "Security", "Pricing"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold">{col.title}</div>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2025 PayZen. All rights reserved. Made with care in India.
        </div>
      </footer>
    </div>
  );
}

function DemoStat({ label, value, trend, tone }: { label: string; value: string; trend: string; tone: "primary" | "success" | "warning" }) {
  const tones = {
    primary: "text-primary bg-primary-soft",
    success: "text-success bg-success-soft",
    warning: "text-warning bg-warning-soft",
  };
  return (
    <Card className="p-5">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <div className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>{trend}</div>
    </Card>
  );
}

function BenefitCard({ icon: Icon, value, label, tone }: { icon: any; value: string; label: string; tone: "primary" | "success" | "warning" }) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
  };
  return (
    <Card className="border-border/60 p-6 shadow-soft">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </Card>
  );
}
