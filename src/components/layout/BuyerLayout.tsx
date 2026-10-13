import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppNavbar } from './AppNavbar';
import { cartService } from '@/services/CartService';

export const BuyerLayout: React.FC = () => {
  const [cartCount, setCartCount] = useState(() => cartService.getItems().length);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(cartService.getItems().length);
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans antialiased text-gray-800">
      <AppNavbar cartCount={cartCount} />
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};
