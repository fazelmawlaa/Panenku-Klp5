import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, Stethoscope, LayoutGrid, ShoppingCart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isMarketplace = location.pathname.includes('/marketplace') || location.pathname === '/';
  const isKonsultasi = location.pathname.includes('/konsultasi');
  const isDashboard = location.pathname.includes('/dasbor');

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-2xs">
      <div className="w-full max-w-[96%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/pembeli/marketplace" className="flex items-center group py-2">
          <img
            src="/images/logo-panenku.png"
            alt="Panenku"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-102"
          />
        </Link>

        {/* Center Nav Items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/pembeli/marketplace"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              isMarketplace
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'text-[#1b4332] hover:bg-gray-100'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Marketplace</span>
          </Link>

          <Link
            to="/pembeli/konsultasi"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              isKonsultasi
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'text-gray-700 hover:text-[#1b4332] hover:bg-gray-100'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-gray-500" />
            <span>Konsultasi</span>
          </Link>

          <Link
            to="/pembeli/dasbor"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              isDashboard
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'text-gray-700 hover:text-[#1b4332] hover:bg-gray-100'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-gray-500" />
            <span>Dashboard</span>
          </Link>
        </nav>

        {/* Right Section: Cart & User Profile */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Button */}
          <Link
            to="/pembeli/keranjang"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
            title="Keranjang Belanja"
          >
            <ShoppingCart className="w-4 h-4" />
          </Link>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              F
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-xs font-bold text-gray-800">fazel</span>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wider">
                Pembeli
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
