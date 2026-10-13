import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, Stethoscope, LayoutGrid, ShoppingCart, LogOut, ChevronDown } from 'lucide-react';
import logoPanenku from '@/assets/logo_panenku.png';
import { authService } from '@/services/AuthService';

interface AppNavbarProps {
  cartCount?: number;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({ cartCount = 1 }) => {
  const location = useLocation();
  const currentUser = authService.getCurrentUser() || {
    id: '1',
    name: 'fazel',
    email: 'fazel@example.com',
    role: 'pembeli' as const,
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { label: 'MARKETPLACE', href: '/pembeli/marketplace', icon: Store },
    { label: 'KONSULTASI', href: '/pembeli/konsultasi', icon: Stethoscope },
    { label: 'DASHBOARD', href: '/pembeli/dasbor', icon: LayoutGrid },
  ];

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/masuk';
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-2xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center group shrink-0 py-2">
          <img
            src={logoPanenku}
            alt="PANENKU"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-102"
            style={{ maxHeight: '40px', width: 'auto' }}
          />
        </Link>

        {/* Center: Main Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#1b4332] text-white shadow-xs'
                    : 'text-[#1b4332] hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Cart & User Profile */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <Link
            to="/pembeli/keranjang"
            className="relative w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
            aria-label="Keranjang Belanja"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1b4332] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'F'}
              </div>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-xs font-bold text-gray-800 lowercase">
                  {currentUser.name || 'fazel'}
                </span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wider">
                  {currentUser.role || 'PEMBELI'}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-900">{currentUser.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                </div>
                <Link
                  to="/pembeli/dasbor"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Dasbor Saya
                </Link>
                <Link
                  to="/pembeli/keranjang"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Keranjang Belanja
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Akun</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
