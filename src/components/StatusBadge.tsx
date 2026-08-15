import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Pending: "bg-muted text-muted-foreground",
  Verifikasi: "bg-info/15 text-info",
  Diterima: "bg-success/15 text-success",
  Ditolak: "bg-destructive/15 text-destructive",
  Aktif: "bg-success/15 text-success",
  "Prioritas Tinggi": "bg-success/20 text-success",
  Dipertimbangkan: "bg-warning/25 text-warning-foreground",
  "Belum Prioritas": "bg-destructive/15 text-destructive",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        styles[status] ?? "bg-secondary text-secondary-foreground",
      )}
    >
      {status}
    </span>
  );
}
