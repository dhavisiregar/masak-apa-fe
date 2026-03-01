export default function StatusView({ status, errorMsg }) {
  if (status === "loading") {
    return (
      <div className="animate-fade-in flex flex-col items-center py-20 gap-5 text-stone-500">
        <div className="animate-spin-custom w-8 h-8 rounded-full border-2 border-stone-700 border-t-yellow-400" />
        <p className="text-sm">Sedang mencocokkan resep...</p>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="animate-fade-in text-center py-20">
        <div className="text-5xl mb-4">😔</div>
        <h3 className="font-display text-xl text-stone-300 mb-2">
          Tidak ada resep ditemukan
        </h3>
        <p className="text-stone-500 text-sm">
          Coba kurangi persentase minimum atau tambah lebih banyak bahan.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="animate-fade-in text-center py-20">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="font-display text-xl text-stone-300 mb-2">
          Koneksi Gagal
        </h3>
        <p className="text-stone-500 text-sm">{errorMsg}</p>
      </div>
    );
  }

  return null;
}
