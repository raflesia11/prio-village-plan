import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  MessageSquareWarning,
  Building2,
  SlidersHorizontal,
  Calculator,
  FileBarChart,
  Users,
  LogOut,
  Menu,
  ChevronDown,
  Trophy,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard };

const adminNav: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pengaduan", label: "Pengaduan", icon: MessageSquareWarning },
  { to: "/alternatif", label: "Alternatif", icon: Building2 },
  { to: "/kriteria", label: "Kriteria", icon: SlidersHorizontal },
  { to: "/perhitungan", label: "Perhitungan SAW", icon: Calculator },
  { to: "/hasil", label: "Hasil Prioritas", icon: Trophy },
  { to: "/laporan", label: "Laporan", icon: FileBarChart },
  { to: "/user", label: "User", icon: Users },
];

const kepalaNav: NavItem[] = [
  { to: "/kepala-desa", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pengaduan", label: "Usulan", icon: MessageSquareWarning },
  { to: "/hasil", label: "Hasil Prioritas", icon: Trophy },
  { to: "/laporan", label: "Laporan", icon: FileBarChart },
];

export function AppShell({
  children,
  role = "Admin Desa",
}: {
  children: ReactNode;
  role?: "Admin Desa" | "Kepala Desa";
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = role === "Kepala Desa" ? kepalaNav : adminNav;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 bg-gradient-header px-4 text-sidebar-foreground shadow-elevated">
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 transition-colors hover:bg-sidebar-accent lg:hidden"
          aria-label="Buka menu"
        >
          <Menu className="size-5" />
        </button>
        <span className="truncate font-display text-sm font-bold uppercase tracking-widest sm:text-base">
          SPK Prioritas Pembangunan Desa
        </span>
        <div className="ml-auto flex items-center gap-2 rounded-full bg-sidebar-accent/60 px-3 py-1.5 text-xs font-semibold">
          {role}
          <ChevronDown className="size-3.5" />
        </div>
      </header>

      <div className="flex">
        <aside
          className={cn(
            "fixed inset-y-16 left-0 z-30 w-60 shrink-0 border-r border-sidebar-border bg-sidebar p-3 transition-transform lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="flex h-full flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    active &&
                      "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_0_var(--sidebar-primary)]",
                  )}
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/"
              className="mt-auto flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut className="size-4" /> Logout
            </Link>
          </nav>
        </aside>

        {open && (
          <div
            className="fixed inset-0 top-16 z-20 bg-foreground/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function BackButton({ to }: { to: string }) {
  return (
    <Button asChild variant="outline" size="sm">
      <Link to={to}>Kembali</Link>
    </Button>
  );
}
