import { Link } from 'react-router-dom';
import logoPanenku from '@/assets/logo_panenku.png';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-6 my-4 bg-gray-900/90 backdrop-blur-md rounded-full px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoPanenku} 
              alt="Panenku Logo" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/tentang" 
              className="text-white hover:text-[#c4ff0e] transition-colors text-sm"
            >
              Tentang Kami
            </Link>
            <Link 
              to="/layanan" 
              className="text-white hover:text-[#c4ff0e] transition-colors text-sm"
            >
              Layanan & Katalog
            </Link>
            <Link 
              to="/faq" 
              className="text-white hover:text-[#c4ff0e] transition-colors text-sm"
            >
              FAQ
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/masuk" 
              className="text-white hover:text-[#c4ff0e] transition-colors text-sm"
            >
              Masuk
            </Link>
            <Link 
              to="/daftar" 
              className="bg-[#c4ff0e] text-gray-900 px-6 py-2.5 rounded-full font-semibold hover:bg-[#b3ee00] transition-colors text-sm"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
