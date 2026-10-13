import React from 'react';
import { Recycle, Plus, Leaf, Sparkles, TrendingUp } from 'lucide-react';

export const SellerWastePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Sirkular Limbah Pertanian
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Ubah residu dan sisa hasil panen menjadi nilai ekonomi baru untuk industri pupuk & pakan ternak.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#006738] hover:bg-[#00522c] rounded-xl shadow-xs transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Daftarkan Limbah Baru</span>
        </button>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#006738] to-[#044e2c] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ekonomi Sirkular Berkelanjutan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Total 500 kg Sekam Padi Berhasil Diserap Bulan Ini
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Anda telah mengurangi emisi pembakaran jerami dan menghasilkan pendapatan tambahan senilai Rp78.000 dari limbah panen.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 w-full md:w-auto">
          <p className="text-xs text-emerald-200">Total Potensi Limbah</p>
          <p className="text-2xl font-black text-white mt-0.5">1.500 kg</p>
          <span className="text-[10px] text-emerald-300">Siap pasok per siklus</span>
        </div>
      </div>

      {/* Waste Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-[#e8ece8] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006738] flex items-center justify-center font-bold">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-base">Sekam Padi</h3>
                <span className="text-xs text-gray-500">Harga: Rp1.500 / kg</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Tersedia 500 kg
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Limbah penggilingan padi kering, cocok untuk media tanam jamur, pembuatan biochar, dan bahan bakar industri bata.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e8ece8] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006738] flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-base">Jerami Kering</h3>
                <span className="text-xs text-gray-500">Harga: Rp800 / kg</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Tersedia 1.000 kg
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Jerami pasca panen siap angkut, bersih dari gulma berbahaya, ideal untuk pakan sapi/kambing dan pupuk kompos organik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerWastePage;
