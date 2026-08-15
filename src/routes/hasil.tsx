import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { hasilPrioritas } from "@/lib/mock-data";

export const Route = createFileRoute("/hasil")({
  head: () => ({
    meta: [
      { title: "Hasil Prioritas Pembangunan — SPK Pembangunan Desa" },
      {
        name: "description",
        content:
          "Peringkat akhir prioritas pembangunan infrastruktur desa berdasarkan nilai preferensi metode SAW.",
      },
      { property: "og:title", content: "Hasil Prioritas Pembangunan — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Ranking usulan pembangunan desa: prioritas tinggi, dipertimbangkan, belum prioritas.",
      },
    ],
  }),
  component: HasilPage,
});

function HasilPage() {
  return (
    <AppShell>
      <PageHeader
        title="Hasil Prioritas Pembangunan"
        description="Urutan usulan berdasarkan nilai akhir perhitungan SAW."
      />

      <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Pembangunan</th>
              <th className="px-4 py-3">Nilai Akhir</th>
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
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-primary"
                        style={{ width: `${h.persen}%` }}
                      />
                    </div>
                    <span className="text-xs">{h.persen}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-primary">{h.peringkat}</td>
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
