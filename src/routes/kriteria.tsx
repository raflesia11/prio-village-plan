import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { kriteria } from "@/lib/mock-data";

export const Route = createFileRoute("/kriteria")({
  head: () => ({
    meta: [
      { title: "Data Kriteria SAW — SPK Pembangunan Desa" },
      {
        name: "description",
        content:
          "Kriteria dan bobot penilaian SAW: tingkat kerusakan, dampak masyarakat, penduduk terdampak, manfaat, dan biaya.",
      },
      { property: "og:title", content: "Data Kriteria SAW — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Atur kriteria benefit/cost dan bobot untuk perhitungan prioritas pembangunan.",
      },
    ],
  }),
  component: KriteriaPage,
});

function KriteriaPage() {
  const total = kriteria.reduce((s, k) => s + k.bobot, 0);

  return (
    <AppShell>
      <PageHeader
        title="Data Kriteria SAW"
        description={`Total bobot ${total}% — bobot keseluruhan harus 100%.`}
        action={
          <Button onClick={() => toast.info("Form tambah kriteria (demo tampilan).")}>
            <Plus className="size-4" /> Tambah Kriteria
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Kriteria</th>
              <th className="px-4 py-3">Bobot</th>
              <th className="px-4 py-3">Jenis</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kriteria.map((k) => (
              <tr key={k.kode} className="border-t">
                <td className="px-4 py-3">{k.no}</td>
                <td className="px-4 py-3 font-mono font-semibold text-primary">{k.kode}</td>
                <td className="px-4 py-3 font-medium">{k.nama}</td>
                <td className="px-4 py-3">{k.bobot}%</td>
                <td className="px-4 py-3">{k.jenis}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Ubah"
                      onClick={() => toast.info("Ubah kriteria (demo).")}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Hapus"
                      onClick={() => toast.error("Kriteria dihapus (demo).")}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Button asChild variant="outline">
          <Link to="/penilaian">Lanjut ke Input Penilaian Alternatif</Link>
        </Button>
      </div>
    </AppShell>
  );
}
