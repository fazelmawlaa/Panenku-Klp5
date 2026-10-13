import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ArrowRight, ChevronDown } from 'lucide-react';
import farmingBg from '@/assets/farming_bg.png';
import logoPanenku from '@/assets/logo_panenku.png';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${farmingBg})`
        }}
      >
        <div className="container mx-auto px-6 py-32 text-center">
          {/* Hero Content */}
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Grow Green, <span className="text-[#c4ff0e] italic font-serif">Grow Better</span>
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Empowering Indonesian<br />Farmers
            </h2>
            
            <p className="text-base md:text-lg text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              PANENKU menghubungkan petani berpengalaman dengan pembeli untuk transaksi hasil<br />
              panen, perlengkapan budidaya, limbah sirkular, dan konsultasi interaktif dalam satu ekosistem<br />
              terintegrasi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link 
                to="/pembeli/marketplace"
                className="bg-[#c4ff0e] text-gray-900 px-8 py-3.5 rounded-full font-semibold hover:bg-[#b3ee00] transition-all flex items-center gap-2 group text-sm"
              >
                Mulai Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="#layanan"
                className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all text-sm"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>

            {/* User Stats */}
            <div className="flex items-center justify-center gap-3 text-white">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-cyan-400 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-white" />
              </div>
              <span className="font-semibold text-sm tracking-wide">12K+ USERS</span>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 right-8">
            <button className="text-white flex items-center gap-2 text-sm animate-bounce">
              <span>Scroll Now</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Semua Kebutuhan Pertanian, <span className="italic font-serif">dari Konsultasi hingga<br />Marketplace</span> <span className="font-bold">dalam Satu Platform.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
            {/* Konsultasi Card */}
            <div 
              className="relative rounded-3xl overflow-hidden h-[500px] bg-cover bg-center group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${farmingBg})`
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <img 
                    src={logoPanenku} 
                    alt="Panenku Logo" 
                    className="h-8 w-auto mb-8"
                  />
                  <h3 className="text-4xl font-bold text-white mb-2">
                    Konsultasi <span className="italic font-serif">Bersama Ahli Pertanian</span>
                  </h3>
                </div>
                
                <div>
                  <p className="text-white text-sm mb-6 max-w-md leading-relaxed">
                    Dapatkan solusi cepat untuk hama, penyakit tanaman, pemupukan, hingga strategi budidaya langsung dari penyuluh dan pakar pertanian terpercaya.
                  </p>
                  <Link 
                    to="/pembeli/konsultasi"
                    className="inline-flex items-center gap-2 bg-cyan-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-cyan-300 transition-all text-sm group-hover:gap-3"
                  >
                    Konsultasi Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Marketplace Card */}
            <div 
              className="relative rounded-3xl overflow-hidden h-[500px] bg-cover bg-center group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${farmingBg})`
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <img 
                    src={logoPanenku} 
                    alt="Panenku Logo" 
                    className="h-8 w-auto mb-8"
                  />
                  <h3 className="text-4xl font-bold text-white mb-2">
                    Marketplace <span className="italic font-serif">Produk Pertanian</span>
                  </h3>
                </div>
                
                <div>
                  <p className="text-white text-sm mb-6 max-w-md leading-relaxed">
                    Belanja hasil panen segar, alat pertanian, pupuk, bibit, hingga limbah pertanian berkualitas langsung dari petani dan mitra terpercaya.
                  </p>
                  <Link 
                    to="/pembeli/marketplace"
                    className="inline-flex items-center gap-2 bg-[#c4ff0e] text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-[#b3ee00] transition-all text-sm group-hover:gap-3"
                  >
                    Jelajahi Marketplace
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#c4ff0e] rounded-2xl flex items-center justify-center mb-6 mx-auto transform rotate-3">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Marketplace Terintegrasi
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Akses lengkap ke hasil panen, alat pertanian, pupuk, dan limbah pertanian dalam satu platform
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-cyan-400 rounded-2xl flex items-center justify-center mb-6 mx-auto transform -rotate-3">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Konsultasi dengan Ahli
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bimbingan langsung dari petani berpengalaman dan ahli pertanian untuk meningkatkan hasil panen
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-400 rounded-2xl flex items-center justify-center mb-6 mx-auto transform rotate-2">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Transaksi Aman
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sistem pembayaran terverifikasi dan perlindungan untuk pembeli dan penjual
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#c4ff0e] mb-2">12K+</div>
              <div className="text-gray-400 text-sm">Pengguna Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#c4ff0e] mb-2">500+</div>
              <div className="text-gray-400 text-sm">Petani Terdaftar</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#c4ff0e] mb-2">1K+</div>
              <div className="text-gray-400 text-sm">Produk Tersedia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#c4ff0e] mb-2">50+</div>
              <div className="text-gray-400 text-sm">Mentor Ahli</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#c4ff0e] to-[#a8e000]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bergabunglah dengan Komunitas<br />Petani Indonesia
          </h2>
          <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan nikmati kemudahan bertransaksi, konsultasi,<br />
            dan mengembangkan usaha pertanian Anda
          </p>
          <Link 
            to="/daftar"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all text-sm group"
          >
            Daftar Sekarang Gratis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src={logoPanenku} 
                alt="Panenku Logo" 
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Agritech Marketplace Terintegrasi untuk Pertanian Berkelanjutan
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Layanan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/pembeli/marketplace" className="hover:text-[#c4ff0e] transition-colors">Marketplace</Link></li>
                <li><Link to="/pembeli/konsultasi" className="hover:text-[#c4ff0e] transition-colors">Konsultasi</Link></li>
                <li><Link to="/penjual/limbah" className="hover:text-[#c4ff0e] transition-colors">Limbah Pertanian</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/tentang" className="hover:text-[#c4ff0e] transition-colors">Tentang Kami</Link></li>
                <li><Link to="/kontak" className="hover:text-[#c4ff0e] transition-colors">Kontak</Link></li>
                <li><Link to="/karir" className="hover:text-[#c4ff0e] transition-colors">Karir</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Bantuan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/faq" className="hover:text-[#c4ff0e] transition-colors">FAQ</Link></li>
                <li><Link to="/bantuan" className="hover:text-[#c4ff0e] transition-colors">Pusat Bantuan</Link></li>
                <li><Link to="/syarat" className="hover:text-[#c4ff0e] transition-colors">Syarat & Ketentuan</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 PANENKU. All rights reserved. Made with 💚 for Indonesian Farmers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
