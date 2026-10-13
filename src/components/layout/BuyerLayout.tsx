import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const BuyerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans antialiased text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};
