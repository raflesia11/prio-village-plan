import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { grafikPengaduan, pengaduan, statusUsulan } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Admin — SPK Pembangunan Desa" },
      {
        name: "description",
        content:
          "Ringkasan pengaduan masyarakat, usulan pembangunan, dan status prioritas infrastruktur desa.",
      },
      { property: "og:title", content: "Dashboard Admin — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Statistik pengaduan dan status usulan prioritas pembangunan desa.",
      },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Total Pengaduan", value: 120 },
  { label: "Total Usulan", value: 45 },
  { label: "Prioritas Tinggi", value: 10 },
  { label: "Dipertimbangkan", value: 15 },
  { label: "Belum Prioritas", value: 20 },
];

const pieColors = ["var(--color-chart-1)", "var(--color-chart-3)", "var(--color-chart-5)"];

export function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-card p-4 text-center shadow-card">
      <p className="font-display text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function DashboardPage() {
  return (
    <AppShell>
      <PageHeader title="Dashboard" description="Ringkasan data pengaduan dan usulan pembangunan desa." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-card lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold">Grafik Pengaduan per Kategori</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grafikPengaduan}>
                <XAxis dataKey="kategori" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="jumlah" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-card">
          <h2 className="mb-4 text-base font-semibold">Status Usulan</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusUsulan} dataKey="nilai" nameKey="nama" innerRadius={45} outerRadius={70}>
                  {statusUsulan.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-2 text-xs">
            {statusUsulan.map((s, i) => (
              <li key={s.nama} className="flex items-center gap-2">
                <span
                  className="size-3 rounded-full"
                  style={{ background: pieColors[i % pieColors.length] }}
                />
                {s.nama}
                <span className="ml-auto font-semibold">{s.nilai}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-card p-4 shadow-card">
        <h2 className="mb-4 text-base font-semibold">Pengaduan Terbaru</h2>
        <div className="space-y-2">
          {pengaduan.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center gap-2 rounded-lg border border-border/70 px-3 py-2.5 text-sm"
            >
              <span className="font-medium">{p.judul}</span>
              <span className="text-xs text-muted-foreground">
                {p.dusun} · {p.tanggal}
              </span>
              <span className="ml-auto">
                <StatusBadge status={p.status} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
