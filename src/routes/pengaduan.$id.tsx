import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { pengaduan } from "@/lib/mock-data";

export const Route = createFileRoute("/pengaduan/$id")({
  loader: ({ params }) => {
    const data = pengaduan.find((p) => p.id === params.id);
    if (!data) throw notFound();
    return { data };
  },
  head: ({ loaderData }) => {
    const judul = loaderData?.data.judul ?? "Verifikasi Pengaduan";
    return {
      meta: [
        { title: `${judul} — Verifikasi Pengaduan Desa` },
        {
          name: "description",
          content: `Detail dan verifikasi pengaduan "${judul}" pada sistem pendukung keputusan pembangunan desa.`,
        },
        { property: "og:title", content: `${judul} — Verifikasi Pengaduan Desa` },
        {
          property: "og:description",
          content: "Detail pengaduan masyarakat beserta foto bukti dan status verifikasi.",
        },
      ],
    };
  },
  component: VerifikasiPengaduan,
});

function VerifikasiPengaduan() {
  const { data } = Route.useLoaderData();

  const rows = [
    ["Judul", data.judul],
    ["Pelapor", data.pelapor],
    ["Tanggal", data.tanggal],
    ["Kategori", data.kategori],
    ["Lokasi", data.lokasi],
    ["Deskripsi", data.deskripsi],
  ];

  return (
    <AppShell>
      <PageHeader
        title="Verifikasi Pengaduan"
        description="Periksa bukti dan tentukan tindak lanjut pengaduan."
        action={
          <Button asChild variant="outline">
            <Link to="/pengaduan">Kembali</Link>
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex aspect-video items-center justify-center rounded-xl border bg-muted">
            <ImageIcon className="size-16 text-muted-foreground/50" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-video items-center justify-center rounded-lg border bg-muted"
              >
                <ImageIcon className="size-6 text-muted-foreground/50" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <dl className="space-y-3 text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[7rem_1fr] gap-2">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium">: {value}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[7rem_1fr] items-center gap-2">
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <StatusBadge status={data.status} />
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" onClick={() => toast.error("Pengaduan ditolak (demo).")}>
              Tolak
            </Button>
            <Button onClick={() => toast.success("Pengaduan diterima (demo).")}>Terima</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
