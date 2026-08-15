import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { daftarDusun, hasilPrioritas } from "@/lib/mock-data";

export const Route = createFileRoute("/laporan")({
  head: () => ({
    meta: [
      { title: "Laporan Prioritas Pembangunan — SPK Pembangunan Desa" },
      {
        name: "description",
        content:
          "Laporan tahunan prioritas pembangunan infrastruktur desa per dusun, siap diekspor ke PDF.",
      },
      { property: "og:title", content: "Laporan Prioritas Pembangunan — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Rekap laporan prioritas pembangunan desa berdasarkan tahun dan dusun.",
      },
    ],
  }),
  component: LaporanPage,
});

function LaporanPage() {
  return (
    <AppShell>
      <PageHeader
        title="Laporan Prioritas Pembangunan"
        description="Filter data laporan lalu ekspor untuk musrenbang desa."
        action={
          <Button onClick={() => toast.success("Laporan diekspor ke PDF (demo).")}>
            <Download className="size-4" /> Export PDF
          </Button>
        }
      />

      <div className="rounded-xl border bg-card shadow-card">
        <div className="grid gap-4 border-b p-4 sm:grid-cols-2 lg:max-w-xl">
          <div className="space-y-2">
            <p className="text-sm font-medium">Pilih Tahun</p>
            <Select defaultValue="2026">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["2026", "2025", "2024"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Pilih Dusun</p>
            <Select defaultValue="Semua">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua</SelectItem>
                {daftarDusun.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Pembangunan</th>
                <th className="px-4 py-3">Nilai</th>
                <th className="px-4 py-3">Persentase</th>
                <th className="px-4 py-3">Peringkat</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {hasilPrioritas.map((h) => (
                <tr key={h.no} className="border-t">
                  <td className="px-4 py-3">{h.no}</td>
                  <td className="px-4 py-3 font-medium">{h.nama}</td>
                  <td className="px-4 py-3">{h.nilai.toFixed(3)}</td>
                  <td className="px-4 py-3">{h.persen}%</td>
                  <td className="px-4 py-3">{h.peringkat}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={h.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
