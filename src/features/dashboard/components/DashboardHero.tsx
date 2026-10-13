import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

export const DashboardHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#143926] via-[#1b4332] to-[#25573e] text-white p-7 sm:p-9 shadow-sm mb-6">
      {/* Subtle organic pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Decorative gradient glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
import bgDashboard from '@/assets/bg_dashboard.jpg';

export const DashboardHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl text-white p-7 sm:p-9 shadow-sm mb-6" style={{ minHeight: '140px' }}>
      {/* Background Photo */}
      <img
        src={bgDashboard}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b1a]/90 via-[#143926]/75 to-[#1b4332]/40" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="max-w-2xl space-y-2 sm:space-y-3">
          {/* Top Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-[#a3e635] text-[#143926] shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#143926]" />
            <span>PEMBELI (BUYER)</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Belanja Hasil Bumi &{' '}
            <span className="italic font-serif font-medium text-[#d9f99d]">
              Belajar Bertani Mandiri
            </span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed font-normal">
            Temukan hasil panen segar, limbah sirkular bernilai ekonomi, alat budidaya, serta
            bimbingan langsung dari mentor ahli dalam satu ekosistem agritech.
          </p>
        </div>

        {/* Right side floating shopping bag icon */}
        <div className="hidden md:flex items-center justify-center w-16 h-16 lg:w-18 lg:h-18 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#bef264] shadow-inner shrink-0 ml-6">
          <ShoppingBag className="w-8 h-8 text-[#bef264]" />
        </div>
      </div>
    </div>
  );
};
