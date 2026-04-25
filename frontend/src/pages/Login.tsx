import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Lock, ShieldCheck, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Branding */}
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(228_90%_70%/0.4),transparent_50%)]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold">PayZen</span>
          </Link>

          <div className="space-y-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3 w-3" /> Trusted by 1.2M+ users
              </div>
              <h2 className="text-balance text-4xl font-bold leading-tight">Your money, finally in focus.</h2>
              <p className="mt-3 max-w-md text-primary-foreground/90">Sign in to unlock unified UPI tracking, smart cashback, leak detection and instant fraud protection.</p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md">
              {[
                { v: "₹400Cr+", l: "Tracked" },
                { v: "1.2M+", l: "Users" },
                { v: "4.9★", l: "Rating" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <div className="text-xl font-bold">{s.v}</div>
                  <div className="text-xs text-primary-foreground/80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
            <ShieldCheck className="h-4 w-4" /> 256-bit encryption · Read-only · RBI compliant
          </div>
        </div>
      </div>

      {/* Auth */}
      <div className="flex items-center justify-center bg-background p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-in">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-hero">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">PayZen</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to continue to your dashboard.</p>

          <Tabs defaultValue="login" className="mt-8">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-secondary p-1">
              <TabsTrigger value="login" className="rounded-full">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <Card className="border-border/60 p-6 shadow-soft">
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">Email or Phone</Label>
                    <Input id="id" placeholder="you@payzen.app or +91 98765 43210" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pwd">Password</Label>
                      <button type="button" className="text-xs font-medium text-primary hover:underline">Forgot?</button>
                    </div>
                    <div className="relative">
                      <Input id="pwd" type={showPwd ? "text" : "password"} placeholder="••••••••" required className="h-11 rounded-xl pr-10" />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="h-11 w-full rounded-xl shadow-glow">
                    Continue <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" className="h-11 w-full rounded-xl">
                    Login with OTP
                  </Button>
                </form>

                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-2">
                  <SocialBtn label="Continue with Google" icon="G" />
                  <SocialBtn label="Continue with Apple" icon="" />
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-success-soft px-3 py-2 text-xs font-medium text-success">
                  <Lock className="h-3.5 w-3.5" /> Secured by 256-bit encryption
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <Card className="border-border/60 p-6 shadow-soft">
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Priya Sharma" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailS">Email</Label>
                    <Input id="emailS" type="email" placeholder="you@payzen.app" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneS">Phone</Label>
                    <Input id="phoneS" placeholder="+91 98765 43210" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pwdS">Create Password</Label>
                    <Input id="pwdS" type="password" placeholder="••••••••" required className="h-11 rounded-xl" />
                  </div>
                  <Button type="submit" className="h-11 w-full rounded-xl shadow-glow">
                    Create account <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </form>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  By signing up you agree to our <a href="#" className="text-primary hover:underline">Terms</a> & <a href="#" className="text-primary hover:underline">Privacy</a>.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function SocialBtn({ label, icon }: { label: string; icon: string }) {
  return (
    <Button type="button" variant="outline" className="h-11 w-full justify-center gap-2 rounded-xl">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">{icon}</span>
      {label}
    </Button>
  );
}
