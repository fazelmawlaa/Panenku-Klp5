import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SellerSidebar } from './SellerSidebar';
import { Menu, Bell, ChevronRight, Home } from 'lucide-react';
import logoPanenku from '@/assets/logo_panenku.png';

export const SellerLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to resolve title from pathname
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/penjual/profil')) return 'Profil Penjual & Ulasan';
    if (path.includes('/penjual/konsultasi')) return 'Sesi Konsultasi';
    if (path.includes('/penjual/marketplace') || path.includes('/penjual/produk'))
      return 'Marketplace Panen (Manajemen Produk)';
    if (path.includes('/penjual/limbah')) return 'Limbah Pertanian';
    if (path.includes('/penjual/pesanan')) return 'Kelola Pesanan';
    if (path.includes('/penjual/analitik')) return 'Analitik Pendapatan';
    return 'Dashboard Penjual';
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7f4] text-[#111827]">
      {/* Desktop Sidebar (Fixed left) */}
      <div className="hidden lg:block shrink-0">
        <div className="sticky top-0 h-screen">
          <SellerSidebar />
        </div>
      </div>

      {/* Mobile Sidebar Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64 max-w-[85vw] h-full shadow-2xl">
            <SellerSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-[#e5ebe5]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100"
              aria-label="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/penjual/dasbor">
              <img src={logoPanenku} alt="PANENKU" className="h-7 w-auto object-contain" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600" />
            </button>
            <div className="w-7 h-7 rounded-full bg-[#006738] text-white text-xs font-bold flex items-center justify-center">
              M
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 sm:py-7 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
