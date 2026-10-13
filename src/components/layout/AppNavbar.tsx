import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, MessageSquare, LayoutDashboard, ShoppingCart, LogOut, ChevronDown } from 'lucide-react';
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
    { label: 'KONSULTASI', href: '/pembeli/konsultasi', icon: MessageSquare },
    { label: 'DASHBOARD', href: '/pembeli/dasbor', icon: LayoutDashboard },
  ];

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/masuk';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img
            src={logoPanenku}
            alt="PANENKU"
            className="h-8 sm:h-9 w-auto max-h-[38px] object-contain transition-transform group-hover:scale-105"
            style={{ maxHeight: '38px', width: 'auto' }}
          />
        </Link>

        {/* Center: Main Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`inline-flex items-center gap-2 text-xs lg:text-sm font-extrabold tracking-wider transition-colors py-1 ${
                  isActive
                    ? 'text-[#007a3d] border-b-2 border-[#007a3d]'
                    : 'text-neutral-700 hover:text-[#007a3d]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Cart & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Shopping Cart Icon with Badge */}
          <Link
            to="/pembeli/keranjang"
            className="relative p-2.5 sm:p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition active:scale-95 flex items-center justify-center"
            aria-label="Keranjang Belanja"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#007a3d] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile Pill with Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
              {/* Avatar Initial Circle */}
              <div className="w-8 h-8 rounded-full bg-[#007a3d] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'F'}
              </div>

              {/* Name & Role badge */}
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-xs font-bold text-neutral-900 lowercase">
                  {currentUser.name || 'fazel'}
                </span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  {currentUser.role || 'PEMBELI'}
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-neutral-100">
                  <p className="text-xs font-bold text-neutral-900">{currentUser.name}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{currentUser.email}</p>
                </div>
                <Link
                  to="/pembeli/dasbor"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Dasbor Saya
                </Link>
                <Link
                  to="/pembeli/keranjang"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
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
