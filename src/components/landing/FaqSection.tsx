import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: listRef, isVisible: listVisible } = useScrollReveal({ threshold: 0.08 });
  const staggerDelays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];

  const faqs: FaqItem[] = [
    {
      question: 'Apa itu platform PANENKU dan apa tujuannya?',
      answer:
        'PANENKU adalah platform terintegrasi yang menghubungkan petani, pembeli, dan pakar pertanian di seluruh Indonesia. Kami memfasilitasi transaksi hasil panen yang adil, penyediaan alat dan bibit berkualitas, perdagangan limbah pertanian sirkular, serta pendampingan langsung dari ahli pertanian.',
    },
    {
      question: 'Bagaimana cara mendaftar sebagai pembeli atau penjual/petani?',
      answer:
        'Anda cukup menekan tombol "Daftar Gratis" di bagian atas halaman, memilih peran akun yang diinginkan (Pembeli atau Penjual), lalu melengkapi data profil dan verifikasi dasar untuk mulai bertransaksi atau membuka lapak tani.',
    },
    {
      question: 'Bagaimana mekanisme konsultasi bersama ahli pertanian?',
      answer:
        'Pengguna dapat memilih topik masalah pertanian (seperti penyakit tanaman, formula pemupukan, irigasi, atau pencegahan hama) dan mencocokkan jadwal konsultasi dengan mentor agronomis bersertifikat via chat atau video conference.',
    },
    {
      question: 'Apa yang dimaksud dengan sirkular ekonomi limbah pertanian?',
      answer:
        'PANENKU menyediakan kategori khusus bagi limbah pertanian (seperti sekam padi, ampas tebu, serbuk kayu, jerami, dan kotoran ternak) agar tidak dibakar atau terbuang sia-sia, melainkan dapat dijual kembali kepada industri pengolah pupuk organik dan pakan ternak.',
    },
    {
      question: 'Bagaimana keamanan transaksi dan pengiriman hasil panen?',
      answer:
        'Semua transaksi dilindungi sistem escrow resmi PANENKU hingga barang diterima dengan baik. Kami bekerja sama dengan logistik terpercaya dan menyediakan armada berpendingin untuk komoditas yang membutuhkan kesegaran prima.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div ref={headerRef} className={`text-center mb-14 md:mb-16 reveal ${headerVisible ? 'reveal-visible' : ''}`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Pertanyaan Umum</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Frequently Asked{' '}
          <span className="font-serif italic font-normal text-emerald-700">Questions</span>
        </h2>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto">
          Temukan jawaban seputar ekosistem, konsultasi agronomis, dan tata kelola transaksi di PANENKU.
        </p>
      </div>

      {/* Accordion List */}
      <div ref={listRef} className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`reveal ${staggerDelays[idx] ?? ''} ${listVisible ? 'reveal-visible' : ''} rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-neutral-300 shadow-lg shadow-neutral-100'
                  : 'bg-neutral-50/80 hover:bg-white border-neutral-200'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-neutral-900 text-base sm:text-lg cursor-pointer"
              >
                <span>{faq.question}</span>
                <span
                  className={`p-1.5 rounded-full bg-neutral-100 text-neutral-700 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-[#c6f24d] text-neutral-950' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
