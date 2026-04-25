import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, Receipt, Gift, AlertTriangle, ShieldCheck, User,
  Bell, Search, Wallet, Menu, X, LogOut, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/leak-detector", label: "Leak Detector", icon: AlertTriangle },
  { to: "/protection", label: "Protection", icon: ShieldCheck },
  { to: "/profile", label: "Profile", icon: User },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile overlay */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden" />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-hero shadow-glow">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">PayZen</span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`
              }
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-2xl gradient-hero p-4 text-primary-foreground">
            <div className="text-sm font-semibold">Upgrade to Pro</div>
            <div className="mt-1 text-xs text-primary-foreground/85">AI insights, unlimited alerts.</div>
            <Button size="sm" variant="secondary" className="mt-3 h-8 w-full rounded-lg text-xs">
              Upgrade
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur lg:px-8">
          <button onClick={() => setOpen(true)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search transactions, merchants..." className="h-10 rounded-xl pl-9" />
          </div>
          <div className="flex-1 md:hidden" />
          <button onClick={() => navigate("/notifications")} className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-xl p-1 pr-3 hover:bg-secondary">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-sm font-semibold text-primary">PS</div>
              <div className="hidden text-left md:block">
                <div className="text-sm font-semibold leading-tight">Priya Sharma</div>
                <div className="text-xs leading-tight text-muted-foreground">priya@payzen.app</div>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/notifications")}>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/")} className="text-danger focus:text-danger">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="min-h-[calc(100vh-4rem)] flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
