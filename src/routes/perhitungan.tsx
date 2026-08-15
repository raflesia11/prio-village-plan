import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { hasilPrioritas, kriteria, matriksKeputusan, normalisasi } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/perhitungan")({
  head: () => ({
    meta: [
      { title: "Perhitungan SAW — SPK Pembangunan Desa" },
      {
        name: "description",
        content:
          "Tahapan perhitungan metode Simple Additive Weighting: matriks keputusan, normalisasi, nilai preferensi, dan ranking.",
      },
      { property: "og:title", content: "Perhitungan SAW — SPK Pembangunan Desa" },
      {
        property: "og:description",
        content: "Proses perhitungan SAW untuk prioritas pembangunan infrastruktur desa.",
      },
    ],
  }),
  component: PerhitunganPage,
});

const steps = ["Matriks Keputusan", "Normalisasi", "Nilai Preferensi", "Ranking"];

function PerhitunganPage() {
  const [step, setStep] = useState(0);

  return (
    <AppShell>
      <PageHeader title="Perhitungan SAW" description="Ikuti tahapan perhitungan dari kiri ke kanan." />

      <div className="mb-5 flex flex-wrap gap-2 rounded-xl border bg-card p-2 shadow-card">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors sm:text-sm",
              step === i
                ? "bg-gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card p-4 shadow-card">
        <h2 className="mb-4 text-base font-semibold">{steps[step]}</h2>

        {step < 2 ? (
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Alternatif</th>
                {kriteria.map((k) => (
                  <th key={k.kode} className="px-4 py-3 text-center">
                    {k.kode}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(step === 0 ? matriksKeputusan : normalisasi).map((row) => (
                <tr key={row.alternatif} className="border-t">
                  <td className="px-4 py-3 font-medium">{row.alternatif}</td>
                  {row.nilai.map((v, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {step === 0 ? v : v.toFixed(3)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">{step === 3 ? "Peringkat" : "No"}</th>
                <th className="px-4 py-3">Alternatif</th>
                <th className="px-4 py-3">Nilai Preferensi (V)</th>
                {step === 3 && <th className="px-4 py-3">Status</th>}
              </tr>
            </thead>
            <tbody>
              {hasilPrioritas.map((h) => (
                <tr key={h.no} className="border-t">
                  <td className="px-4 py-3 font-semibold text-primary">
                    {step === 3 ? h.peringkat : h.no}
                  </td>
                  <td className="px-4 py-3 font-medium">{h.nama}</td>
                  <td className="px-4 py-3">{h.nilai.toFixed(3)}</td>
                  {step === 3 && (
                    <td className="px-4 py-3">
                      <StatusBadge status={h.status} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-5 flex justify-between gap-2 border-t pt-4">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            Sebelumnya
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>
              {step === 0 ? "Proses Normalisasi" : "Lanjut"}
            </Button>
          ) : (
            <Button asChild>
              <Link to="/hasil">Lihat Hasil Prioritas</Link>
            </Button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
