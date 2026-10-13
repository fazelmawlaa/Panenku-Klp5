import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const CtaSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  return (
    <section className="py-16 md:py-20 px-3 sm:px-6 lg:px-8 w-[97%] sm:w-[95%] max-w-[1380px] mx-auto">
      <div
        ref={ref}
        className={`reveal-scale ${isVisible ? 'reveal-visible' : ''} relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#101912] via-[#142317] to-[#0c130d] text-white p-8 sm:p-14 lg:p-16 border border-white/10 shadow-2xl`}
      >
        {/* Decorative Ambient Radial Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c6f24d]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#c6f24d]/15 text-[#c6f24d] border border-[#c6f24d]/30 text-xs font-bold uppercase tracking-wider mb-5">
            Mulai Bersama PANENKU
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15]">
            Siap Majukan Pertanian Anda ke{' '}
            <span className="font-serif italic text-[#c6f24d] font-normal">Level Berikutnya?</span>
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Bergabunglah dengan ribuan petani, pembeli, dan pakar agronomi Indonesia.
            Nikmati kemudahan transaksi transparan dan solusi tani modern hari ini.
          </p>

          {/* Quick Perks */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-neutral-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#c6f24d]" />
              <span>Pendaftaran 100% Gratis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#c6f24d]" />
              <span>Verifikasi Petani Cepat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#c6f24d]" />
              <span>Bimbingan Ahli Langsung</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/daftar"
              className="inline-flex items-center gap-2 bg-[#c6f24d] hover:bg-[#b4e63f] active:scale-95 text-[#101912] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-[#c6f24d]/20 transition-all duration-200 group"
            >
              <span>Daftar Akun Sekarang</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/masuk"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-200"
            >
              Masuk ke Akun
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
