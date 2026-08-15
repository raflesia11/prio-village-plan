import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Plus, Search } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pengaduan } from "@/lib/mock-data";

export const Route = createFileRoute("/pengaduan/")({
  head: () => ({
    meta: [
      { title: "Data Pengaduan Masyarakat — SPK Pembangunan Desa" },
      {
        name: "description",
        content: "Daftar pengaduan infrastruktur dari masyarakat desa beserta status verifikasinya.",
      },
      { property: "og:title", content: "Data Pengaduan Masyarakat — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Kelola dan verifikasi pengaduan infrastruktur warga desa.",
      },
    ],
  }),
  component: PengaduanPage,
});

function PengaduanPage() {
  return (
    <AppShell>
      <PageHeader
        title="Data Pengaduan Masyarakat"
        description="Kelola, verifikasi, dan tindak lanjuti pengaduan warga."
        action={
          <Button asChild>
            <Link to="/pengaduan/baru">
              <Plus className="size-4" /> Tambah Pengaduan
            </Link>
          </Button>
        }
      />

      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <p className="text-sm text-muted-foreground">Menampilkan 1 - 4 dari 4 data</p>
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Cari pengaduan..." className="pl-9" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Judul Pengaduan</th>
                <th className="px-4 py-3">Dusun</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pengaduan.map((p, i) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{p.judul}</td>
                  <td className="px-4 py-3">{p.dusun}</td>
                  <td className="px-4 py-3">{p.tanggal}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Button asChild variant="ghost" size="icon" aria-label="Lihat detail">
                      <Link to="/pengaduan/$id" params={{ id: p.id }}>
                        <Eye className="size-4" />
                      </Link>
                    </Button>
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
