import React from 'react';
import { Package, Wallet, Sprout, Calendar, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/seller/StatCard';
import { SalesAnalyticsChart } from '@/components/seller/SalesAnalyticsChart';
import { HarvestCalendarCard } from '@/components/seller/HarvestCalendarCard';
import { RecentOrdersTable } from '@/components/seller/RecentOrdersTable';

export const SellerDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Breadcrumb / Title */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#111827]">
          Dashboard Penjual
        </h1>
      </div>

      {/* Welcome Banner Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase">
            Selamat Datang Kembali,
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Muhammad Fazel Mawla
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed pt-0.5">
            Kelola pasokan panen pre-order, catat sirkular limbah tani, dan pantau keuangan Anda secara transparan.
          </p>
        </div>

        {/* User Initial Avatar on the Right */}
        <div className="shrink-0 self-end sm:self-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f3f6f3] border border-[#e2e8e2] text-[#111827] font-extrabold text-xl sm:text-2xl flex items-center justify-center shadow-xs">
            M
          </div>
        </div>
      </section>

      {/* 4 Primary Metric Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          label="PESANAN AKTIF"
          value="5"
          badgeText="+5"
          iconBgClass="bg-[#eaf5ed]"
          iconColorClass="text-[#006738]"
          badgeColorClass="bg-[#eaf5ed] text-[#006738]"
        />

        <StatCard
          icon={Wallet}
          label="TOTAL PENDAPATAN"
          value="Rp327.500"
          badgeText="+100%"
          iconBgClass="bg-[#eaf5ed]"
          iconColorClass="text-[#006738]"
          badgeColorClass="bg-[#eaf5ed] text-[#006738]"
        />

        <StatCard
          icon={Sprout}
          label="PESANAN SELESAI"
          value="5"
          badgeText="+5"
          iconBgClass="bg-[#eaf5ed]"
          iconColorClass="text-[#006738]"
          badgeColorClass="bg-[#eaf5ed] text-[#006738]"
        />

        <StatCard
          icon={Calendar}
          label="ESTIMASI PANEN"
          value="500 kg"
          badgeText="-"
          iconBgClass="bg-[#eaf5ed]"
          iconColorClass="text-[#006738]"
          badgeColorClass="bg-[#eaf5ed] text-[#006738]"
        />
      </section>

      {/* Middle Row: Analytics Chart (left) & Harvest Calendar (right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <SalesAnalyticsChart />
        </div>
        <div className="lg:col-span-4">
          <HarvestCalendarCard />
        </div>
      </section>

      {/* Bottom Row: Recent Orders Table */}
      <section>
        <RecentOrdersTable />
      </section>
    </div>
  );
};

export default SellerDashboardPage;
