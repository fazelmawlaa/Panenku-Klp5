import React, { useState, useEffect, useMemo } from 'react';
import { buyerDashboardService, productService } from '@/services';
import { DashboardHero } from '../components/DashboardHero';
import { DashboardStats } from '../components/DashboardStats';
import { RecentTransactions } from '../components/RecentTransactions';
import { FavoriteFarmersCard } from '../components/FavoriteFarmersCard';
import { BecomeSellerCard } from '../components/BecomeSellerCard';
import { DashboardRecommendations } from '../components/DashboardRecommendations';

export const BuyerDashboardPage: React.FC = () => {
  const [stats, setStats] = useState(() => buyerDashboardService.getStats());
  const [transactions, setTransactions] = useState(() => buyerDashboardService.getRecentTransactions(6));
  const recommendedProducts = useMemo(() => productService.getAll(), []);

  useEffect(() => {
    const handleRefresh = () => {
      setStats(buyerDashboardService.getStats());
      setTransactions(buyerDashboardService.getRecentTransactions(6));
    };
    window.addEventListener('dashboard-updated', handleRefresh);
    return () => window.removeEventListener('dashboard-updated', handleRefresh);
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* 1. Hero Banner */}
      <DashboardHero />

      {/* 2. 4 Statistics Cards */}
      <DashboardStats stats={stats} />

      {/* 3. Middle Section: Transaksi Terbaru (Left) & Petani Favorit + Promo Penjual (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Transaksi Terbaru (Takes 2 of 3 columns on large screens) */}
        <div className="lg:col-span-2">
          <RecentTransactions transactions={transactions} />
        </div>

        {/* Right Column: Petani Favorit & Mulai Jual Hasil Tani Anda (Takes 1 column) */}
        <div className="lg:col-span-1 space-y-6">
          <FavoriteFarmersCard />
          <BecomeSellerCard />
        </div>
      </div>

      {/* 4. Bottom Section: Rekomendasi untuk Anda */}
      <DashboardRecommendations products={recommendedProducts} />
    </div>
  );
};

