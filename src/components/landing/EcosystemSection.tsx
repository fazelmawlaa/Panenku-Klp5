import React from 'react';
import { Sprout, RefreshCw, Users, ShieldCheck, Sparkles } from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const highlights = [
    {
      icon: Users,
      title: 'Pemberdayaan Petani Mandiri',
      desc: 'Memutus rantai tengkulak yang panjang sehingga petani memperoleh margin keuntungan yang adil dan berkelanjutan.',
      accent: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600',
    },
    {
      icon: RefreshCw,
      title: 'Sirkular Ekonomi & Limbah',
      desc: 'Pasar khusus limbah panen (jerami, sekam, ampas) untuk diolah kembali menjadi pupuk organik dan biogas ramah lingkungan.',
      accent: 'border-lime-500/20 bg-lime-500/5 text-lime-600',
    },
    {
      icon: Sprout,
      title: 'Katalog Produk Terverifikasi',
      desc: 'Setiap hasil panen, benih unggul, dan pupuk melalui proses kurasi ketat untuk menjamin kesegaran dan mutunya.',
      accent: 'border-amber-500/20 bg-amber-500/5 text-amber-600',
    },
    {
      icon: ShieldCheck,
      title: 'Konsultasi & Garansi Panen',
      desc: 'Dukungan agronomis profesional sepanjang musim tanam untuk memaksimalkan hasil panen dan meminimalisir gagal panen.',
      accent: 'border-sky-500/20 bg-sky-500/5 text-sky-600',
    },
  ];

  const stats = [
    { value: '12.000+', label: 'Petani & Mitra Terdaftar' },
    { value: '450+', label: 'Pakar & Konsultan Agronomi' },
    { value: '98.6%', label: 'Kepuasan Kualitas Panen' },
    { value: '34+', label: 'Kota & Daerah Terjangkau' },
  ];

  return (
    <section id="tentang-kami" className="py-20 md:py-28 bg-[#141a15] text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-[#c6f24d]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="w-[97%] sm:w-[95%] max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#c6f24d] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ekosistem Pertanian Pintar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Menghubungkan Hati Petani dengan{' '}
            <span className="font-serif italic text-[#c6f24d] font-normal">Masa Depan Pangan</span>
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed">
            PANENKU hadir sebagai jembatan teknologi yang menyatukan budidaya,
            perdagangan adil, dan regenerasi lingkungan dalam satu alur yang transparan.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#1b231c]/70 hover:bg-[#1f2820] border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.accent} mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="bg-[#19211a] border border-white/10 rounded-3xl p-8 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#c6f24d] tracking-tight">
                {stat.value}
              </span>
              <span className="mt-2 text-xs sm:text-sm text-neutral-300 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
