import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Store,
  Recycle,
  ClipboardList,
  BarChart3,
  CalendarDays,
  LogOut,
  ChevronDown,
  X,
  ExternalLink,
  UserCheck
} from 'lucide-react';
import logoPanenku from '@/assets/logo_panenku.png';

interface SellerSidebarProps {
  onCloseMobile?: () => void;
}

export const SellerSidebar: React.FC<SellerSidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/masuk');
  };

  // Helper to determine if marketplace menu is active (both marketplace & produk paths)
  const isMarketplaceActive =
    location.pathname.startsWith('/penjual/marketplace') ||
    location.pathname.startsWith('/penjual/produk');

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
      isActive
        ? 'bg-[#006738] text-white shadow-xs font-bold'
        : 'text-[#4b5563] hover:text-[#111827] hover:bg-[#f0f4f0]'
    }`;

  return (
    <aside className="w-68 flex flex-col h-full bg-white border-r border-[#e8ece8] select-none">
      {/* Brand Header */}
      <div className="p-5 pb-4 flex items-center justify-between border-b border-transparent">
        <NavLink to="/penjual/dasbor" className="flex items-center gap-2 group">
          <img
            src={logoPanenku}
            alt="PANENKU"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-102"
          />
        </NavLink>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-5 scrollbar-thin">
        {/* Section: UTAMA */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-[#9ca3af] uppercase">
            Utama
          </div>
          <nav className="space-y-1">
            <NavLink
              to="/penjual/dasbor"
              onClick={onCloseMobile}
              className={navLinkClass}
              end
            >
              <LayoutDashboard className="w-4 h-4 shrink-0 stroke-[2.2]" />
              <span>DASHBOARD PENJUAL</span>
            </NavLink>

            <NavLink
              to="/penjual/konsultasi"
              onClick={onCloseMobile}
              className={navLinkClass}
            >
              <MessageSquare className="w-4 h-4 shrink-0 stroke-[2]" />
              <span>SESI KONSULTASI</span>
            </NavLink>
          </nav>
        </div>

        {/* Section: PENJUALAN & LAYANAN */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-[#9ca3af] uppercase">
            Penjualan & Layanan
          </div>
          <nav className="space-y-1">
            <NavLink
              to="/penjual/marketplace"
              onClick={onCloseMobile}
              className={() =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isMarketplaceActive
                    ? 'bg-[#006738] text-white shadow-xs font-bold'
                    : 'text-[#4b5563] hover:text-[#111827] hover:bg-[#f0f4f0]'
                }`
              }
            >
              <Store className="w-4 h-4 shrink-0 stroke-[2.2]" />
              <span>MARKETPLACE PANEN</span>
            </NavLink>

            <NavLink
              to="/penjual/limbah"
              onClick={onCloseMobile}
              className={navLinkClass}
            >
              <Recycle className="w-4 h-4 shrink-0 stroke-[2]" />
              <span>LIMBAH PERTANIAN</span>
            </NavLink>

            <NavLink
              to="/penjual/pesanan"
              onClick={onCloseMobile}
              className={navLinkClass}
            >
              <ClipboardList className="w-4 h-4 shrink-0 stroke-[2]" />
              <span>KELOLA PESANAN</span>
            </NavLink>

            <NavLink
              to="/penjual/analitik"
              onClick={onCloseMobile}
              className={navLinkClass}
            >
              <BarChart3 className="w-4 h-4 shrink-0 stroke-[2]" />
              <span>ANALITIK PENDAPATAN</span>
            </NavLink>
          </nav>
        </div>

        {/* Section: BUDIDAYA */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-[#9ca3af] uppercase">
            Budidaya
          </div>
          <nav className="space-y-1">
            <NavLink
              to="/penjual/kalender"
              onClick={onCloseMobile}
              className={navLinkClass}
            >
              <CalendarDays className="w-4 h-4 shrink-0 stroke-[2]" />
              <span>KALENDER TANAM & PANEN</span>
            </NavLink>
          </nav>
        </div>

        {/* Quick shortcut to store preview */}
        <div className="pt-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-[11px] font-medium text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/50 transition-colors"
          >
            <span>Lihat Marketplace Publik</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-[#edf1ed] bg-[#fafcfa]">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white border border-transparent hover:border-[#e3e8e3] transition-all">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar Letter M */}
            <div className="w-9 h-9 rounded-full bg-[#e3eae3] text-[#006738] font-bold text-sm flex items-center justify-center shrink-0 border border-[#cdd9cd]">
              M
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#111827] truncate">
                Muhammad Fazel Mawla
              </p>
              <div className="flex items-center mt-0.5">
                <span className="inline-block text-[10px] font-semibold text-[#006738] bg-[#dcfce7] px-2 py-0.5 rounded-full leading-none">
                  PENJUAL (SELLER)
                </span>
              </div>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            title="Keluar dari akun"
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1 shrink-0"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
