import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { daftarDusun, kategoriPengaduan } from "@/lib/mock-data";

export const Route = createFileRoute("/pengaduan/baru")({
  head: () => ({
    meta: [
      { title: "Form Pengaduan Masyarakat — SPK Pembangunan Desa" },
      {
        name: "description",
        content: "Formulir pengaduan kerusakan infrastruktur desa lengkap dengan lokasi dan foto bukti.",
      },
      { property: "og:title", content: "Form Pengaduan Masyarakat — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Kirim pengaduan infrastruktur desa: jalan, drainase, jembatan, talud, lampu jalan.",
      },
    ],
  }),
  component: FormPengaduan,
});

function FormPengaduan() {
  return (
    <AppShell>
      <PageHeader
        title="Form Pengaduan Masyarakat"
        description="Isi data pengaduan selengkap mungkin agar mudah diverifikasi."
        action={
          <Button asChild variant="outline">
            <Link to="/pengaduan">Kembali</Link>
          </Button>
        }
      />

      <form
        className="max-w-3xl space-y-5 rounded-xl border bg-card p-5 shadow-card sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Pengaduan berhasil disimpan (demo tampilan).");
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="judul">Judul Pengaduan</Label>
            <Input id="judul" placeholder="Masukkan judul pengaduan" />
          </div>
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-- Pilih Kategori --" />
              </SelectTrigger>
              <SelectContent>
                {kategoriPengaduan.map((k) => (
                  <SelectItem key={k} value={k}>
                    {k}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="lokasi">Lokasi</Label>
            <Input id="lokasi" placeholder="Masukkan lokasi (RT/RW, patokan)" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea id="deskripsi" rows={5} placeholder="Tuliskan deskripsi pengaduan..." />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="foto">Upload Foto</Label>
            <label
              htmlFor="foto"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed bg-muted/40 px-4 py-6 text-sm text-muted-foreground transition-colors hover:bg-muted"
            >
              <Upload className="size-5" />
              Pilih file foto kerusakan (JPG/PNG, maks. 2MB)
            </label>
            <input id="foto" type="file" accept="image/*" className="hidden" />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button asChild variant="outline">
            <Link to="/pengaduan">Batal</Link>
          </Button>
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </AppShell>
  );
}
