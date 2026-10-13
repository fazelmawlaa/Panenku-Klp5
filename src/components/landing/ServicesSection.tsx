import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoPanenku from '@/assets/logo_panenku.png';
import consultationBg from '@/assets/consultation_bg.jpg';
import marketplaceBg from '@/assets/marketplace_bg.jpg';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="layanan"
      className="scroll-mt-28 pt-24 sm:pt-28 pb-20 md:pb-28 px-3 sm:px-6 lg:px-8 w-[97%] sm:w-[95%] max-w-[1380px] mx-auto"
    >
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-bold text-neutral-900 tracking-tight leading-[1.16] max-w-5xl">
          <span className="font-extrabold text-neutral-950">
            Semua Kebutuhan Pertanian,&nbsp;
          </span>
          <span className="font-serif italic font-normal text-neutral-700">
            dari Konsultasi hingga
          </span>
          <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-neutral-700">
            Marketplace&nbsp;
          </span>
          <span className="font-extrabold text-neutral-950">
            dalam Satu Platform.
          </span>
        </h2>
      </div>

      {/* Two High-Impact Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {/* Card 1: Konsultasi Bersama Ahli Pertanian */}
        <div className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/4.5] sm:aspect-[4/4.2] shadow-2xl flex flex-col justify-between p-6 sm:p-8 border border-neutral-300/60 transition-all duration-500 hover:shadow-neutral-500/20">
          {/* Card Background Image with hover zoom */}
          <div className="absolute inset-0 z-0">
            <img
              src={consultationBg}
              alt="Konsultasi Bersama Ahli Pertanian"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Top & Bottom Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/35" />
          </div>

          {/* Top Row: Panenku Logo Watermark */}
          <div className="relative z-10">
            <img
              src={logoPanenku}
              alt="Panenku Watermark"
              className="h-7 sm:h-8 w-auto max-h-[32px] object-contain drop-shadow-md brightness-110"
              style={{ maxHeight: '32px', width: 'auto' }}
            />
          </div>

          {/* Bottom Area: Title + Floating Dark Card */}
          <div className="relative z-10 flex flex-col gap-5 mt-auto">
            {/* Card Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              <span className="font-bold">Konsultasi </span>
              <span className="font-serif italic font-normal text-[#c6f24d]">
                Bersama Ahli Pertanian
              </span>
            </h3>

            {/* Bottom Dark Glass Panel Container */}
            <div className="bg-[#0b120d]/85 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl">
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                Dapatkan solusi cepat untuk hama, penyakit tanaman, pemupukan,
                hingga strategi budidaya langsung dari penyuluh dan pakar pertanian
                terpercaya.
              </p>
              <Link
                to="/pembeli/konsultasi"
                className="inline-flex items-center gap-2 bg-[#38bdf8] hover:bg-[#0ea5e9] active:scale-95 text-[#07263b] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-[#38bdf8]/20 group/btn"
              >
                <span>Konsultasi Sekarang</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Marketplace Produk Pertanian */}
        <div className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/4.5] sm:aspect-[4/4.2] shadow-2xl flex flex-col justify-between p-6 sm:p-8 border border-neutral-300/60 transition-all duration-500 hover:shadow-neutral-500/20">
          {/* Card Background Image with hover zoom */}
          <div className="absolute inset-0 z-0">
            <img
              src={marketplaceBg}
              alt="Marketplace Produk Pertanian"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Top & Bottom Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/35" />
          </div>

          {/* Top Row: Panenku Logo Watermark */}
          <div className="relative z-10">
            <img
              src={logoPanenku}
              alt="Panenku Watermark"
              className="h-7 sm:h-8 w-auto max-h-[32px] object-contain drop-shadow-md brightness-110"
              style={{ maxHeight: '32px', width: 'auto' }}
            />
          </div>

          {/* Bottom Area: Title + Floating Dark Card */}
          <div className="relative z-10 flex flex-col gap-5 mt-auto">
            {/* Card Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              <span className="font-bold">Marketplace </span>
              <span className="font-serif italic font-normal text-[#c6f24d]">
                Produk Pertanian
              </span>
            </h3>

            {/* Bottom Dark Glass Panel Container */}
            <div className="bg-[#0b120d]/85 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl">
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                Belanja hasil panen segar, alat pertanian, pupuk, bibit, hingga
                limbah pertanian berkualitas langsung dari petani dan mitra
                terpercaya.
              </p>
              <Link
                to="/pembeli/marketplace"
                className="inline-flex items-center gap-2 bg-[#1b3420] hover:bg-[#23462b] active:scale-95 text-[#a3e635] border border-[#a3e635]/35 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md group/btn"
              >
                <span>Jelajahi Marketplace</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
