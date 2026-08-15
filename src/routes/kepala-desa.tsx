import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { hasilPrioritas } from "@/lib/mock-data";

export const Route = createFileRoute("/kepala-desa")({
  head: () => ({
    meta: [
      { title: "Dashboard Kepala Desa — SPK Pembangunan Desa" },
      {
        name: "description",
        content:
          "Ringkasan prioritas pembangunan desa dan sebaran lokasi usulan untuk pengambilan keputusan kepala desa.",
      },
      { property: "og:title", content: "Dashboard Kepala Desa — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Grafik prioritas pembangunan dan peta lokasi usulan warga desa.",
      },
    ],
  }),
  component: KepalaDesaPage,
});

const stats = [
  { label: "Total Pengaduan", value: 120 },
  { label: "Total Usulan", value: 45 },
  { label: "Prioritas Tinggi", value: 10 },
  { label: "Total Pembangunan", value: 35 },
];

const pins = [
  { top: "22%", left: "30%" },
  { top: "55%", left: "18%" },
  { top: "40%", left: "62%" },
  { top: "70%", left: "72%" },
];

function KepalaDesaPage() {
  const chartData = hasilPrioritas.map((h) => ({ nama: h.nama, persen: h.persen }));

  return (
    <AppShell role="Kepala Desa">
      <PageHeader
        title="Dashboard Kepala Desa"
        description="Pantau hasil prioritas pembangunan dan sebaran usulan."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 text-center shadow-card">
            <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-4 shadow-card">
          <h2 className="mb-4 text-base font-semibold">Grafik Prioritas Pembangunan</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 32 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="nama" width={150} fontSize={11} tickLine={false} axisLine={false} />
                <Bar dataKey="persen" radius={[0, 6, 6, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={`var(--color-chart-${(i % 5) + 1})`} />
                  ))}
                  <LabelList dataKey="persen" position="right" formatter={(v: number) => `${v}%`} fontSize={11} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-card">
          <h2 className="mb-4 text-base font-semibold">Peta Lokasi Usulan</h2>
          <div className="relative h-72 overflow-hidden rounded-lg border bg-muted">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            {pins.map((p, i) => (
              <MapPin
                key={i}
                className="absolute size-7 -translate-x-1/2 -translate-y-full fill-primary text-primary-foreground"
                style={{ top: p.top, left: p.left }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Peringkat</th>
              <th className="px-4 py-3">Pembangunan</th>
              <th className="px-4 py-3">Nilai</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {hasilPrioritas.map((h) => (
              <tr key={h.no} className="border-t">
                <td className="px-4 py-3 font-semibold text-primary">{h.peringkat}</td>
                <td className="px-4 py-3 font-medium">{h.nama}</td>
                <td className="px-4 py-3">{h.nilai.toFixed(3)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={h.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
