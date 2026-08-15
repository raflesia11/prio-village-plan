import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { daftarDusun } from "@/lib/mock-data";

export const Route = createFileRoute("/daftar")({
  head: () => ({
    meta: [
      { title: "Daftar Akun Masyarakat — SPK Pembangunan Desa" },
      {
        name: "description",
        content: "Buat akun masyarakat untuk mengirim pengaduan infrastruktur desa secara online.",
      },
      { property: "og:title", content: "Daftar Akun Masyarakat — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Registrasi warga desa untuk menyampaikan usulan dan pengaduan pembangunan.",
      },
    ],
  }),
  component: DaftarPage,
});

function DaftarPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Daftar Akun Masyarakat</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Lengkapi data diri untuk dapat mengirim pengaduan pembangunan desa.
        </p>
        <form
          className="space-y-4 rounded-xl border bg-card p-6 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Pendaftaran terkirim, menunggu verifikasi admin desa.");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input id="nama" placeholder="Masukkan nama lengkap" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nik">NIK</Label>
            <Input id="nik" placeholder="16 digit NIK" />
          </div>
          <div className="space-y-2">
            <Label>Dusun</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-- Pilih Dusun --" />
              </SelectTrigger>
              <SelectContent>
                {daftarDusun.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">Username</Label>
            <Input id="user" placeholder="Username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input id="pw" type="password" placeholder="Password" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              Daftar
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Batal</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
