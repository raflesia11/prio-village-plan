export type StatusPengaduan = "Pending" | "Verifikasi" | "Diterima" | "Ditolak";

export const pengaduan = [
  {
    id: "1",
    judul: "Jalan Rusak Dusun A",
    dusun: "Dusun A",
    tanggal: "12/05/2024",
    status: "Pending" as StatusPengaduan,
    pelapor: "Ahmad",
    kategori: "Jalan",
    lokasi: "RT 02 RW 01 Dusun A",
    deskripsi: "Jalan berlubang dan sulit dilalui saat hujan.",
  },
  {
    id: "2",
    judul: "Drainase Tersumbat",
    dusun: "Dusun B",
    tanggal: "13/05/2024",
    status: "Verifikasi" as StatusPengaduan,
    pelapor: "Siti",
    kategori: "Drainase",
    lokasi: "RT 01 RW 02 Dusun B",
    deskripsi: "Saluran air tersumbat sampah sehingga air meluap ke jalan.",
  },
  {
    id: "3",
    judul: "Jembatan Kayu Rusak",
    dusun: "Dusun C",
    tanggal: "14/05/2024",
    status: "Diterima" as StatusPengaduan,
    pelapor: "Budi",
    kategori: "Jembatan",
    lokasi: "RT 03 RW 01 Dusun C",
    deskripsi: "Papan jembatan lapuk dan berbahaya bagi anak sekolah.",
  },
  {
    id: "4",
    judul: "Lampu Jalan Mati",
    dusun: "Dusun D",
    tanggal: "15/05/2024",
    status: "Ditolak" as StatusPengaduan,
    pelapor: "Rina",
    kategori: "Lampu Jalan",
    lokasi: "RT 04 RW 03 Dusun D",
    deskripsi: "Beberapa titik lampu jalan tidak menyala sejak sebulan lalu.",
  },
];

export const grafikPengaduan = [
  { kategori: "Jalan", jumlah: 52 },
  { kategori: "Drainase", jumlah: 61 },
  { kategori: "Jembatan", jumlah: 44 },
  { kategori: "Talud", jumlah: 33 },
  { kategori: "Lampu Jalan", jumlah: 47 },
];

export const statusUsulan = [
  { nama: "Prioritas Tinggi", nilai: 10 },
  { nama: "Dipertimbangkan", nilai: 15 },
  { nama: "Belum Prioritas", nilai: 20 },
];

export const alternatif = [
  { no: 1, nama: "Perbaikan Jalan Dusun A", dusun: "Dusun A", sumber: "Pengaduan", status: "Aktif" },
  { no: 2, nama: "Pembangunan Drainase Dusun B", dusun: "Dusun B", sumber: "Pengaduan", status: "Aktif" },
  { no: 3, nama: "Pembuatan Talud Dusun C", dusun: "Dusun C", sumber: "Musrenbang", status: "Aktif" },
  { no: 4, nama: "Pemasangan Lampu Jalan Dusun D", dusun: "Dusun D", sumber: "Pengaduan", status: "Aktif" },
];

export const kriteria = [
  { no: 1, kode: "C1", nama: "Tingkat Kerusakan", bobot: 30, jenis: "Benefit" },
  { no: 2, kode: "C2", nama: "Dampak Terhadap Masyarakat", bobot: 25, jenis: "Benefit" },
  { no: 3, kode: "C3", nama: "Jumlah Penduduk Terdampak", bobot: 20, jenis: "Benefit" },
  { no: 4, kode: "C4", nama: "Manfaat Pembangunan", bobot: 15, jenis: "Benefit" },
  { no: 5, kode: "C5", nama: "Biaya Pembangunan", bobot: 10, jenis: "Cost" },
];

export const matriksKeputusan = [
  { alternatif: "Perbaikan Jalan Dusun A", nilai: [5, 4, 5, 4, 3] },
  { alternatif: "Pembangunan Drainase Dusun B", nilai: [4, 5, 4, 4, 2] },
  { alternatif: "Pembuatan Talud Dusun C", nilai: [4, 4, 3, 4, 3] },
  { alternatif: "Pemasangan Lampu Jalan Dusun D", nilai: [3, 3, 4, 3, 2] },
];

export type LabelPrioritas = "Prioritas Tinggi" | "Dipertimbangkan" | "Belum Prioritas";

export const hasilPrioritas: {
  no: number;
  nama: string;
  nilai: number;
  persen: number;
  peringkat: number;
  status: LabelPrioritas;
}[] = [
  { no: 1, nama: "Perbaikan Jalan Dusun A", nilai: 0.923, persen: 92, peringkat: 1, status: "Prioritas Tinggi" },
  { no: 2, nama: "Pembangunan Drainase Dusun B", nilai: 0.883, persen: 88, peringkat: 2, status: "Dipertimbangkan" },
  { no: 3, nama: "Pembuatan Talud Dusun C", nilai: 0.753, persen: 75, peringkat: 3, status: "Dipertimbangkan" },
  { no: 4, nama: "Pemasangan Lampu Jalan Dusun D", nilai: 0.603, persen: 60, peringkat: 4, status: "Belum Prioritas" },
];

export const kategoriPengaduan = ["Jalan", "Drainase", "Jembatan", "Talud", "Lampu Jalan", "Lainnya"];
export const daftarDusun = ["Dusun A", "Dusun B", "Dusun C", "Dusun D"];

// Normalisasi SAW (R) dari matriks keputusan
export const normalisasi = matriksKeputusan.map((row) => ({
  alternatif: row.alternatif,
  nilai: row.nilai.map((v, i) => {
    const kolom = matriksKeputusan.map((r) => r.nilai[i] ?? 0);
    const jenis = kriteria[i]?.jenis ?? "Benefit";
    return jenis === "Benefit" ? v / Math.max(...kolom) : Math.min(...kolom) / v;
  }),
}));
