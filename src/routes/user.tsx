import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/user")({
  head: () => ({
    meta: [
      { title: "Manajemen User — SPK Pembangunan Desa" },
      {
        name: "description",
        content: "Kelola akun admin desa, kepala desa, dan masyarakat pada sistem pendukung keputusan.",
      },
      { property: "og:title", content: "Manajemen User — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Daftar pengguna sistem beserta peran dan status akunnya.",
      },
    ],
  }),
  component: UserPage,
});

const users = [
  { no: 1, nama: "Slamet Riyadi", username: "admindesa", peran: "Admin Desa", status: "Aktif" },
  { no: 2, nama: "H. Suparman", username: "kepaladesa", peran: "Kepala Desa", status: "Aktif" },
  { no: 3, nama: "Ahmad", username: "ahmad", peran: "Masyarakat", status: "Aktif" },
  { no: 4, nama: "Rina", username: "rina", peran: "Masyarakat", status: "Pending" },
];

function UserPage() {
  return (
    <AppShell>
      <PageHeader
        title="Manajemen User"
        description="Verifikasi akun warga dan atur hak akses pengguna."
        action={
          <Button onClick={() => toast.info("Form tambah user (demo tampilan).")}>
            <Plus className="size-4" /> Tambah User
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Peran</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.no} className="border-t">
                <td className="px-4 py-3">{u.no}</td>
                <td className="px-4 py-3 font-medium">{u.nama}</td>
                <td className="px-4 py-3 font-mono text-xs">{u.username}</td>
                <td className="px-4 py-3">{u.peran}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Ubah"
                      onClick={() => toast.info("Ubah user (demo).")}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Hapus"
                      onClick={() => toast.error("User dihapus (demo).")}
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
