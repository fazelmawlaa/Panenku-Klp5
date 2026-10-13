import React from 'react';
import { Link } from 'react-router-dom';
import logoPanenku from '@/assets/logo_panenku.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e1410] text-neutral-400 text-sm border-t border-white/10 pt-16 pb-12">
      <div className="w-[97%] sm:w-[95%] max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logoPanenku}
                alt="PANENKU"
                className="h-8 w-auto max-h-[32px] object-contain brightness-110"
                style={{ maxHeight: '32px', width: 'auto' }}
              />
            </Link>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Platform agritech terpadu yang memberdayakan petani Indonesia
              melalui marketplace transparan, sirkular ekonomi limbah, dan
              konsultasi agronomis terpercaya.
            </p>
            <div className="text-xs text-neutral-500">
              Grow Green, Grow Better.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Layanan
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/pembeli/marketplace" className="hover:text-white transition">
                  Marketplace Panen
                </Link>
              </li>
              <li>
                <Link to="/pembeli/konsultasi" className="hover:text-white transition">
                  Konsultasi Mentor
                </Link>
              </li>
              <li>
                <Link to="/penjual/limbah" className="hover:text-white transition">
                  Limbah Sirkular
                </Link>
              </li>
              <li>
                <Link to="/penjual/produk" className="hover:text-white transition">
                  Katalog Bibit & Alat
                </Link>
              </li>
            </ul>
          </div>

          {/* Akun & Dasbor */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Akses Pengguna
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/masuk" className="hover:text-white transition">
                  Masuk Akun
                </Link>
              </li>
              <li>
                <Link to="/daftar" className="hover:text-white transition">
                  Daftar Petani / Pembeli
                </Link>
              </li>
              <li>
                <Link to="/pembeli/dasbor" className="hover:text-white transition">
                  Dasbor Pembeli
                </Link>
              </li>
              <li>
                <Link to="/penjual/dasbor" className="hover:text-white transition">
                  Dasbor Penjual
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Legalitas */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Bantuan
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#faq" className="hover:text-white transition">
                  Pusat FAQ
                </a>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Kebijakan Privasi
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Syarat & Ketentuan
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Dukungan Komunitas
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} PANENKU — Kelompok 5 POPL. Hak Cipta Dilindungi.</p>
          <p className="text-center sm:text-right">
            Dibuat untuk memajukan ekosistem pertanian Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
