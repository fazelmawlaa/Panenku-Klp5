import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Store,
  Leaf,
  ClipboardList,
  BarChart3,
  CalendarDays,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import logoPanenku from '@/assets/logo_panenku.png';
import { authService } from '@/services/AuthService';

const navGroups = [
  {
    label: 'UTAMA',
    items: [
      { label: 'Dashboard Penjual', href: '/penjual/dasbor', icon: LayoutDashboard },
      { label: 'Profil Penjual & Ulasan', href: '/penjual/profil', icon: User },
      { label: 'Sesi Konsultasi', href: '/penjual/konsultasi', icon: MessageSquare },
    ],
  },
  {
    label: 'PENJUALAN & LAYANAN',
    items: [
      { label: 'Marketplace Panen', href: '/penjual/produk', icon: Store },
      { label: 'Limbah Pertanian', href: '/penjual/limbah', icon: Leaf },
      { label: 'Kelola Pesanan', href: '/penjual/pesanan', icon: ClipboardList },
      { label: 'Analitik Pendapatan', href: '/penjual/analitik', icon: BarChart3 },
    ],
  },
  {
    label: 'BUDIDAYA',
    items: [
      { label: 'Kalender Tanam & Panen', href: '/penjual/kalender', icon: CalendarDays },
    ],
  },
];

export const SellerSidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const currentUser = authService.getCurrentUser() || {
    id: '1',
    name: 'Muhammad Fazel Mawla',
    email: 'fazel@panenku.id',
    role: 'penjual' as const,
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/masuk';
  };

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-neutral-200/90 shadow-sm transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-64'
      } min-h-screen shrink-0`}
    >
      {/* Collapse toggle */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-neutral-100 shrink-0">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src={logoPanenku}
            alt="PANENKU"
            className="h-8 w-auto object-contain shrink-0"
          />
          {!collapsed && (
            <span className="text-sm font-black text-[#007a3d] tracking-tight truncate">
              Panenku
            </span>
          )}
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5 px-2">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      title={item.label}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-[#007a3d] text-white shadow-sm'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-700'}`}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom: User Profile */}
      <div className="border-t border-neutral-100 p-3 shrink-0">
        <div
          className={`flex items-center gap-3 rounded-xl px-2 py-2 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#007a3d] text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-neutral-900 truncate">{currentUser.name}</p>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-px rounded bg-amber-100 text-amber-800">
                PENJUAL (SELLER)
              </span>
            </div>
          )}

          {!collapsed && (
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
              title="Keluar"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;
