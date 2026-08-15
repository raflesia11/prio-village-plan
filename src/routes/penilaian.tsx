import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { alternatif, kriteria } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/penilaian")({
  head: () => ({
    meta: [
      { title: "Input Penilaian Alternatif — SPK Pembangunan Desa" },
      {
        name: "description",
        content: "Beri nilai setiap alternatif pembangunan pada tiap kriteria sebelum perhitungan SAW.",
      },
      { property: "og:title", content: "Input Penilaian Alternatif — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Penilaian alternatif pembangunan desa dengan skala 1-5 per kriteria.",
      },
    ],
  }),
  component: PenilaianPage,
});

function PenilaianPage() {
  const [nilai, setNilai] = useState<number[]>([4, 4, 4, 3, 3]);

  return (
    <AppShell>
      <PageHeader
        title="Penilaian Alternatif"
        description="Skala 1 (sangat rendah) sampai 5 (sangat tinggi)."
        action={
          <Button asChild variant="outline">
            <Link to="/alternatif">Kembali</Link>
          </Button>
        }
      />

      <div className="max-w-3xl space-y-5 rounded-xl border bg-card p-5 shadow-card">
        <div className="max-w-sm space-y-2">
          <p className="text-sm font-medium">Alternatif</p>
          <Select defaultValue={alternatif[0]?.nama}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {alternatif.map((a) => (
                <SelectItem key={a.no} value={a.nama}>
                  {a.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Kriteria</th>
                <th className="px-4 py-3">Bobot</th>
                <th className="px-4 py-3">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {kriteria.map((k, idx) => (
                <tr key={k.kode} className="border-t">
                  <td className="px-4 py-3">{k.no}</td>
                  <td className="px-4 py-3 font-medium">{k.nama}</td>
                  <td className="px-4 py-3">{k.bobot}%</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-label={`Nilai ${n} untuk ${k.nama}`}
                          onClick={() =>
                            setNilai((prev) => prev.map((v, i) => (i === idx ? n : v)))
                          }
                        >
                          <Star
                            className={cn(
                              "size-5 transition-colors",
                              n <= (nilai[idx] ?? 0)
                                ? "fill-warning text-warning"
                                : "text-muted-foreground/40",
                            )}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">{nilai[idx]}/5</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline" asChild>
            <Link to="/perhitungan">Lihat Perhitungan</Link>
          </Button>
          <Button onClick={() => toast.success("Nilai alternatif disimpan (demo).")}>
            Simpan Nilai
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
