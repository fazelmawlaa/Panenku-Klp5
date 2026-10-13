import React from 'react';
import { ShoppingBag, Wallet, Heart, TrendingUp } from 'lucide-react';
import type { BuyerStats } from '@/types';

interface DashboardStatsProps {
  stats: BuyerStats;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statItems = [
    {
      id: 'pesanan-aktif',
      label: 'PESANAN AKTIF',
      value: stats.pesananAktif.toString(),
      subtext: `${stats.pesananSedangPanen} sedang panen`,
      subtextColor: 'text-gray-500',
      icon: ShoppingBag,
    },
    {
      id: 'penghematan',
      label: 'PENGHEMATAN',
      value: `Rp${stats.penghematan.toLocaleString('id-ID')}`,
      subtext: 'Estimasi cashback 10%',
      subtextColor: 'text-gray-500',
      icon: Wallet,
    },
    {
      id: 'petani-favorit',
      label: 'PETANI FAVORIT',
      value: stats.petaniFavorit.toString(),
      subtext: 'Semua terverifikasi',
      subtextColor: 'text-emerald-600',
      icon: Heart,
    },
    {
      id: 'total-transaksi',
      label: 'TOTAL TRANSAKSI',
      value: stats.totalTransaksi.toString(),
      subtext: 'Sejak bergabung',
      subtextColor: 'text-emerald-600',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
      {statItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 flex flex-col justify-between hover:shadow-xs transition-shadow duration-200"
          >
            {/* Top Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <IconComponent className="w-5 h-5 text-emerald-600" />
            </div>

            {/* Label, Value & Subtext */}
            <div className="mt-4">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                {item.label}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1 mb-0.5">
                {item.value}
              </div>
              <span className={`text-xs font-medium ${item.subtextColor}`}>
                {item.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
