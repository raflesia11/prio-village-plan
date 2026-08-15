import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { alternatif } from "@/lib/mock-data";

export const Route = createFileRoute("/alternatif")({
  head: () => ({
    meta: [
      { title: "Data Alternatif Pembangunan — SPK Pembangunan Desa" },
      {
        name: "description",
        content:
          "Daftar alternatif pembangunan infrastruktur desa yang dinilai dengan metode SAW, dari pengaduan dan musrenbang.",
      },
      { property: "og:title", content: "Data Alternatif Pembangunan — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Kelola alternatif usulan pembangunan desa beserta sumber usulannya.",
      },
    ],
  }),
  component: AlternatifPage,
});

function AlternatifPage() {
  return (
    <AppShell>
      <PageHeader
        title="Data Alternatif Pembangunan"
        description="Alternatif yang akan dinilai pada perhitungan SAW."
        action={
          <Button onClick={() => toast.info("Form tambah alternatif (demo tampilan).")}>
            <Plus className="size-4" /> Tambah Alternatif
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Nama Pembangunan</th>
              <th className="px-4 py-3">Dusun</th>
              <th className="px-4 py-3">Sumber Usulan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {alternatif.map((a) => (
              <tr key={a.no} className="border-t">
                <td className="px-4 py-3">{a.no}</td>
                <td className="px-4 py-3 font-medium">{a.nama}</td>
                <td className="px-4 py-3">{a.dusun}</td>
                <td className="px-4 py-3">{a.sumber}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button asChild variant="ghost" size="icon" aria-label="Nilai alternatif">
                      <Link to="/penilaian">
                        <Pencil className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Hapus"
                      onClick={() => toast.error("Alternatif dihapus (demo).")}
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
    </AppShell>
  );
}
