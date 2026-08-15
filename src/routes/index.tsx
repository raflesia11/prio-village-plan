import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock, User, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — SPK Prioritas Pembangunan Desa" },
      {
        name: "description",
        content:
          "Masuk ke Sistem Pendukung Keputusan penentuan skala prioritas pembangunan infrastruktur desa terintegrasi pengaduan masyarakat.",
      },
      { property: "og:title", content: "Login — SPK Prioritas Pembangunan Desa" },
      {
        property: "og:description",
        content: "Sistem Pendukung Keputusan prioritas pembangunan infrastruktur desa dengan metode SAW.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-gradient-header p-10 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3">
          <Landmark className="size-8 text-sidebar-primary" />
          <span className="font-display text-lg font-bold">Desa Sukamaju</span>
        </div>
        <div>
          <h1 className="max-w-md font-display text-4xl leading-tight font-bold">
            Menentukan prioritas pembangunan desa secara objektif
          </h1>
          <p className="mt-4 max-w-md text-sm text-sidebar-foreground/80">
            Pengaduan masyarakat, kriteria terukur, dan perhitungan metode SAW dalam satu sistem
            pendukung keputusan.
          </p>
        </div>
        <p className="text-xs text-sidebar-foreground/60">
          Simple Additive Weighting · Musrenbang Desa · 2026
        </p>
      </div>

      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-elevated">
              <Landmark className="size-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-lg leading-snug font-bold uppercase">
              Sistem Pendukung Keputusan
            </h2>
            <p className="mt-1 text-sm font-semibold text-primary">
              Prioritas Pembangunan Infrastruktur Desa
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Terintegrasi Pengaduan Masyarakat</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: role === "kepala" ? "/kepala-desa" : "/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="username" placeholder="Username" className="pl-9" defaultValue="admindesa" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="pl-9"
                  defaultValue="password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Masuk sebagai</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin Desa</SelectItem>
                  <SelectItem value="kepala">Kepala Desa</SelectItem>
                  <SelectItem value="masyarakat">Masyarakat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              LOGIN
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link to="/daftar" className="font-semibold text-primary underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
