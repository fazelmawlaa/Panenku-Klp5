import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoPanenku from '@/assets/logo_panenku.png';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Layanan & Katalog', href: '#layanan' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <nav
        className={`pointer-events-auto mx-auto w-[97%] sm:w-[95%] max-w-[1380px] rounded-full px-5 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between border ${
          isScrolled
            ? 'bg-[#121613]/95 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/40'
            : 'bg-[#151a15]/90 backdrop-blur-md border-white/10 shadow-lg'
        }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img
            src={logoPanenku}
            alt="PANENKU Logo"
            className="h-8 md:h-9 w-auto max-h-[38px] object-contain transition-transform group-hover:scale-105"
            style={{ maxHeight: '38px', width: 'auto' }}
          />
        </Link>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-white transition-colors duration-200 py-1"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            to="/masuk"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 px-2 py-1"
          >
            Masuk
          </Link>
          <Link
            to="/daftar"
            className="bg-[#c6f24d] hover:bg-[#b5e83c] active:scale-95 text-[#111710] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-[#c6f24d]/20 flex items-center gap-1 group"
          >
            <span>Daftar Gratis</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/daftar"
            className="bg-[#c6f24d] text-[#111710] font-bold text-xs px-3.5 py-1.5 rounded-full"
          >
            Daftar
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 mx-auto max-w-sm bg-[#121613]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-2xl text-white">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-white/10 text-neutral-200 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
              <Link
                to="/masuk"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-white/90 font-medium rounded-full hover:bg-white/10 transition"
              >
                Masuk
              </Link>
              <Link
                to="/daftar"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-[#c6f24d] text-[#111710] font-bold rounded-full hover:bg-[#b5e83c] transition shadow-md"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
