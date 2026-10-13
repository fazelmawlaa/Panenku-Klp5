import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppNavbar } from './AppNavbar';
import { cartService } from '@/services/CartService';

export const BuyerLayout: React.FC = () => {
  const cartCount = cartService.getItems().length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans antialiased text-gray-800">
      <AppNavbar cartCount={cartCount} />
      <main className="flex-1 w-full max-w-[96%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};
