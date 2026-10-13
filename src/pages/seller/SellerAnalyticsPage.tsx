import React from 'react';
import { SalesAnalyticsChart } from '@/components/seller/SalesAnalyticsChart';
import { StatCard } from '@/components/seller/StatCard';
import { TrendingUp, DollarSign, Wallet, ArrowUpRight, BarChart2 } from 'lucide-react';

export const SellerAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
          Analitik & Keuangan
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Laporan pendapatan mendalam, performa komoditas terbaik, dan arus kas penjualan tani Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Wallet}
          label="PENDAPATAN BERSIH"
          value="Rp327.500"
          badgeText="+100%"
          iconBgClass="bg-[#eaf5ed]"
          iconColorClass="text-[#006738]"
          badgeColorClass="bg-[#eaf5ed] text-[#006738]"
        />
        <StatCard
          icon={TrendingUp}
          label="MARJIN KEUNTUNGAN"
          value="68.4%"
          badgeText="+12%"
          iconBgClass="bg-[#eaf5ed]"
          iconColorClass="text-[#006738]"
          badgeColorClass="bg-[#eaf5ed] text-[#006738]"
        />
        <StatCard
          icon={DollarSign}
          label="DANA SIAP CAIR"
          value="Rp250.000"
          badgeText="Siap Tarik"
          iconBgClass="bg-[#eaf5ed]"
          iconColorClass="text-[#006738]"
          badgeColorClass="bg-[#eaf5ed] text-[#006738]"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SalesAnalyticsChart />
      </div>
    </div>
  );
};

export default SellerAnalyticsPage;
