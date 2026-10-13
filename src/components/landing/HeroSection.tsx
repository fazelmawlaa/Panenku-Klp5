import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import farmingBg from '@/assets/farming_bg.png';

export const HeroSection: React.FC = () => {
  const scrollToServices = () => {
    const section = document.getElementById('layanan');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Image — blur-in entrance */}
      <div className="absolute inset-0 z-0">
        <img
          src={farmingBg}
          alt="Indonesian Farming Landscape"
          className="w-full h-full object-cover object-center hero-bg-enter"
        />
        {/* Cinematic Multi-stop Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      </div>

      {/* Spacer for floating navbar */}
      <div className="h-28 sm:h-32" />

      {/* Main Center Content — staggered entrance */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto flex flex-col items-center">
        {/* Main Title */}
        <h1 className="anim-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-md">
          <span className="inline-block">Grow Green,&nbsp;</span>
          <span className="font-serif italic font-normal text-[#c6f24d] tracking-normal inline-block">
            Grow Better
          </span>
          <span className="block mt-1 sm:mt-2 font-black">
            Empowering Indonesian
          </span>
          <span className="block font-black">
            Farmers
          </span>
        </h1>

        {/* Subtitle */}
        <p className="anim-hero-subtitle mt-6 sm:mt-8 max-w-2xl sm:max-w-3xl text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-normal drop-shadow">
          PANENKU menghubungkan petani berpengalaman dengan pembeli untuk
          transaksi hasil panen, perlengkapan budidaya, limbah sirkular, dan
          konsultasi interaktif dalam satu ekosistem terintegrasi.
        </p>

        {/* Call to Action Buttons */}
        <div className="anim-hero-buttons mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 w-full">
          <Link
            to="/daftar"
            className="group inline-flex items-center gap-2 bg-[#c6f24d] hover:bg-[#b4e63f] active:scale-95 text-[#111710] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-xl shadow-[#c6f24d]/25 transition-all duration-200 transform hover:scale-105"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            onClick={scrollToServices}
            className="inline-flex items-center justify-center bg-black/40 hover:bg-black/60 active:scale-95 text-white backdrop-blur-md border border-white/25 hover:border-white/40 font-medium text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-200"
          >
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      {/* Bottom Floating Information Bar */}
      <div className="anim-hero-badge relative z-10 w-[97%] sm:w-[95%] max-w-[1380px] mx-auto px-3 sm:px-4 pb-6 sm:pb-8 flex items-end justify-between">
        {/* Bottom Left: User Avatars & 12K+ USERS Badge */}
        <div className="inline-flex items-center gap-3 bg-black/60 hover:bg-black/75 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full border border-white/15 shadow-xl transition">
          {/* Overlapping Avatar Rings */}
          <div className="flex -space-x-2 overflow-hidden">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] ring-2 ring-black/80">
              P
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#c6f24d] text-neutral-900 font-bold text-[10px] ring-2 ring-black/80">
              F
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-neutral-900 font-bold text-[10px] ring-2 ring-black/80">
              M
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-white/90">
            12K+ USERS
          </span>
        </div>

        {/* Bottom Right: Scroll Indicator Button */}
        <button
          type="button"
          onClick={scrollToServices}
          className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-black/80 active:scale-95 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-[11px] sm:text-xs font-medium text-white/90 shadow-xl transition cursor-pointer"
        >
          <span>Scroll Now</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
