import React from 'react';
import { User, Phone, MapPin, Mail, Award, Star, CheckCircle, ShieldCheck } from 'lucide-react';

export const SellerProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
          Profil Penjual & Ulasan
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Identitas petani terverifikasi dan reputasi ulasan dari para pembeli PANENKU.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ece8] shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#e3eae3] border-2 border-[#006738] text-[#006738] font-black text-3xl flex items-center justify-center shrink-0">
            M
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Muhammad Fazel Mawla
              </h2>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006738] bg-[#dcfce7] px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Petani Terverifikasi
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Koperasi Tani Syiah Kuala • Spesialis Bawang Merah & Sekam Sirkular
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Banda Aceh, Aceh
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                085211636085
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.9 / 5.0 (28 Ulasan)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8ece8] shadow-xs space-y-4">
        <h3 className="font-extrabold text-base text-gray-900">Ulasan Pembeli Terbaru</h3>
        <div className="divide-y divide-[#f2f5f2] space-y-4">
          <div className="pt-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800">Ibrahim Zarqa</span>
              <span className="text-gray-400">10 Okt 2026</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-600 pt-1">
              Bawang merahnya sangat segar, aromanya tajam, dan timbangannya pas sesuai estimasi pre-order. Sangat recommended!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
