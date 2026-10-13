import React from 'react';
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BecomeSellerCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-6 flex flex-col justify-between">
      <div>
        {/* Ribbon / Medal Icon */}
        <div className="w-10 h-10 rounded-full bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
          <Award className="w-5 h-5 text-emerald-700" />
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-gray-900 leading-snug">
          Mulai Jual Hasil Tani Anda!
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mt-2 mb-6">
          Bergabunglah bersama ribuan petani sukses lainnya di PANENKU! Daftarkan akun
          penjual baru Anda untuk mulai mengunggah hasil panen segar, menawarkan limbah
          pertanian sirkular, dan membuka konsultasi tani.
        </p>
      </div>

      {/* CTA Button */}
      <Link
        to="/daftar"
        className="w-full bg-[#1b4332] hover:bg-[#143225] active:bg-[#0e241b] text-white text-xs font-bold py-3.5 px-4 rounded-xl text-center tracking-wide transition-all shadow-xs cursor-pointer block"
      >
        Daftar Sebagai Penjual (Petani)
      </Link>
    </div>
  );
};
