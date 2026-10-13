import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, LayoutDashboard, Store, MessageSquare } from "lucide-react";

interface NavbarProps {
  cartCount?: number;
  userName?: string;
  userInitial?: string;
}

export function BuyerNavbar({ cartCount = 0, userName = "fazel", userInitial = "F" }: NavbarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/pembeli/konsultasi" className="flex items-center gap-2">
          <img src="/images/logo-panenku.png" alt="Panenku" className="h-8" onError={(e) => {
            e.currentTarget.style.display = "none";
            const sibling = e.currentTarget.nextElementSibling as HTMLElement;
            if (sibling) sibling.style.display = "flex";
          }} />
          <span className="hidden text-green-700 font-bold text-xl items-center gap-1">
            <span className="text-yellow-500">🌾</span> panenku
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          <Link
            to="/pembeli/marketplace"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive("/pembeli/marketplace")
                ? "bg-green-800 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Store size={14} />
            MARKETPLACE
          </Link>
          <Link
            to="/pembeli/konsultasi"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive("/pembeli/konsultasi")
                ? "bg-green-800 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MessageSquare size={14} />
            KONSULTASI
          </Link>
          <Link
            to="/pembeli/dasbor"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive("/pembeli/dasbor")
                ? "bg-green-800 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={14} />
            DASHBOARD
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link to="/pembeli/keranjang" className="relative p-2 text-gray-600 hover:text-green-700 transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-sm font-bold">
              {userInitial}
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-semibold text-gray-800">{userName}</span>
              <span className="text-[10px] text-green-600 font-medium uppercase">PEMBELI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
