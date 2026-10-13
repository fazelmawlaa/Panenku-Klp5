import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Wallet,
  TrendingUp,
  Trophy,
  ArrowUpRight,
  Download,
  FileDown,
  X,
  CheckCircle2,
  Building,
  CreditCard
} from 'lucide-react';
import farmingBg from '@/assets/farming_bg.png';

// Monthly cash flow data
const cashFlowData = [
  { month: 'Jan', revenue: 12.0, expense: 4.0, revenueRp: 'Rp12.000.000', expenseRp: 'Rp4.000.000' },
  { month: 'Feb', revenue: 14.5, expense: 4.5, revenueRp: 'Rp14.500.000', expenseRp: 'Rp4.500.000' },
  { month: 'Mar', revenue: 16.0, expense: 5.0, revenueRp: 'Rp16.000.000', expenseRp: 'Rp5.000.000' },
  { month: 'Apr', revenue: 18.5, expense: 5.5, revenueRp: 'Rp18.500.000', expenseRp: 'Rp5.500.000' },
  { month: 'Mei', revenue: 22.0, expense: 6.0, revenueRp: 'Rp22.000.000', expenseRp: 'Rp6.000.000' },
  { month: 'Jun', revenue: 24.8, expense: 6.5, revenueRp: 'Rp24.800.000', expenseRp: 'Rp6.500.000' },
];

// Revenue composition donut data
const compositionData = [
  { name: 'Hasil Panen (Pre-Order)', value: 55, color: '#006738' },
  { name: 'Hasil Panen (Ready Stock)', value: 32, color: '#eab308' },
  { name: 'Limbah Organik', value: 13, color: '#6c5344' },
];

// Bookkeeping ledger table history
interface LedgerItem {
  id: string;
  month: string;
  grossRevenue: string;
  expenses: string;
  netProfit: string;
  profitRatio: string;
}

const ledgerHistory: LedgerItem[] = [
  {
    id: 'l-jun-26',
    month: 'Jun 2026',
    grossRevenue: 'Rp24.800.000',
    expenses: 'Rp6.500.000',
    netProfit: 'Rp18.300.000',
    profitRatio: '74% Laba',
  },
  {
    id: 'l-mei-26',
    month: 'Mei 2026',
    grossRevenue: 'Rp22.000.000',
    expenses: 'Rp6.000.000',
    netProfit: 'Rp16.000.000',
    profitRatio: '73% Laba',
  },
  {
    id: 'l-apr-26',
    month: 'Apr 2026',
    grossRevenue: 'Rp18.500.000',
    expenses: 'Rp5.500.000',
    netProfit: 'Rp13.000.000',
    profitRatio: '70% Laba',
  },
  {
    id: 'l-mar-26',
    month: 'Mar 2026',
    grossRevenue: 'Rp16.000.000',
    expenses: 'Rp5.000.000',
    netProfit: 'Rp11.000.000',
    profitRatio: '69% Laba',
  },
  {
    id: 'l-feb-26',
    month: 'Feb 2026',
    grossRevenue: 'Rp14.500.000',
    expenses: 'Rp4.500.000',
    netProfit: 'Rp10.000.000',
    profitRatio: '69% Laba',
  },
  {
    id: 'l-jan-26',
    month: 'Jan 2026',
    grossRevenue: 'Rp12.000.000',
    expenses: 'Rp4.000.000',
    netProfit: 'Rp8.000.000',
    profitRatio: '67% Laba',
  },
];

export const SellerAnalyticsPage: React.FC = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadPdf = (month: string) => {
    showToast(`Mengunduh berkas laporan pembukuan ${month}...`);
  };

  const handleExportAll = () => {
    showToast('Mengekspor laporan pembukuan semester 1 (PDF)...');
  };

  const formatYAxis = (val: number) => {
    if (val === 0) return '0jt';
    return `${val}jt`;
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
          Analitik Pendapatan
        </h1>
      </div>

      {/* Hero Banner with Agricultural Background */}
      <section className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-[#d5ded5] shadow-[0_4px_20px_rgba(0,103,56,0.08)]">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${farmingBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#033b20]/95 via-[#064e2c]/90 to-[#03331b]/80" />

        {/* Banner Content */}
        <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-10 flex flex-col justify-center min-h-[140px]">
          <span className="text-[11px] font-black tracking-widest uppercase text-[#bef264] drop-shadow-xs">
            DASHBOARD KEUANGAN
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mt-1">
            Analitik &{' '}
            <span className="font-serif italic font-normal text-[#d9f99d]">
              Pendapatan Tani
            </span>
          </h2>
        </div>
      </section>

      {/* 4 Primary Metric Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Pendapatan */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#006738] flex items-center justify-center">
              <Wallet className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaf5ed] text-[#006738]">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+12.8%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase">
              TOTAL PENDAPATAN
            </p>
            <p className="text-2xl sm:text-[26px] font-extrabold text-[#111827] mt-1 tracking-tight">
              Rp24.800.000
            </p>
            <p className="text-xs text-gray-400 mt-1">+12.8% Bulan ini</p>
          </div>
        </div>

        {/* Card 2: Laba Bersih */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#006738] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaf5ed] text-[#006738]">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Margin</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase">
              LABA BERSIH
            </p>
            <p className="text-2xl sm:text-[26px] font-extrabold text-[#111827] mt-1 tracking-tight">
              Rp18.300.000
            </p>
            <p className="text-xs text-gray-400 mt-1">Margin laba 73.7%</p>
          </div>
        </div>

        {/* Card 3: Komoditas Terlaris */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#006738] flex items-center justify-center">
              <Trophy className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaf5ed] text-[#006738]">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>142</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase">
              KOMODITAS TERLARIS
            </p>
            <p className="text-2xl sm:text-[26px] font-extrabold text-[#111827] mt-1 tracking-tight truncate">
              Beras Pandan
            </p>
            <p className="text-xs text-gray-400 mt-1">142 transaksi terkirim</p>
          </div>
        </div>

        {/* Card 4: Saldo Pencairan */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#006738] flex items-center justify-center">
              <Wallet className="w-5 h-5 stroke-[2.2]" />
            </div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white bg-[#006738] hover:bg-[#00502c] shadow-xs transition-colors"
            >
              CAIRKAN
            </button>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase">
              SALDO PENCAIRAN
            </p>
            <p className="text-2xl sm:text-[26px] font-extrabold text-[#111827] mt-1 tracking-tight">
              Rp8.420.000
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Siap ditarik ke rekening</p>
          </div>
        </div>
      </section>

      {/* Middle Grid: Arus Kas Bulanan (Bar Chart) & Komposisi Pendapatan (Donut Chart) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Arus Kas Bulanan Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
                Arus Kas Bulanan
              </h3>
              <p className="text-xs text-[#6b7280] mt-0.5">
                Perbandingan pemasukan vs biaya operasional
              </p>
            </div>

            <button
              onClick={handleExportAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#d6ddd6] hover:bg-[#f6f9f6] text-xs font-bold text-gray-700 transition-colors self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor</span>
            </button>
          </div>

          {/* Bar Chart Canvas */}
          <div className="w-full h-[280px] sm:h-[300px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cashFlowData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                barGap={6}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f0" />
                <XAxis
                  dataKey="month"
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                  dy={6}
                />
                <YAxis
                  domain={[0, 26]}
                  ticks={[0, 6.5, 13, 19.5, 26]}
                  tickFormatter={formatYAxis}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                  dx={-4}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#111827] text-white text-xs rounded-2xl py-2.5 px-3.5 shadow-xl border border-gray-700 space-y-1">
                          <p className="font-extrabold text-gray-200">{data.month} 2026</p>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-emerald-400 font-semibold">Pemasukan:</span>
                            <span className="font-bold">{data.revenueRp}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-amber-400 font-semibold">Pengeluaran:</span>
                            <span className="font-bold">{data.expenseRp}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {/* Forest Green Bar for Revenue */}
                <Bar
                  dataKey="revenue"
                  fill="#006738"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
                {/* Dark Brown Bar for Expenses */}
                <Bar
                  dataKey="expense"
                  fill="#6c5344"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Komposisi Pendapatan Donut Chart */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
              Komposisi Pendapatan
            </h3>
            <p className="text-xs text-[#6b7280] mt-0.5">
              Sumber kontribusi penjualan pertanian
            </p>
          </div>

          {/* Donut Chart Canvas */}
          <div className="w-full h-[220px] relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={compositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={86}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {compositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#111827] text-white text-xs rounded-xl py-2 px-3 shadow-lg border border-gray-700">
                          <p className="font-bold">{data.name}</p>
                          <p className="text-emerald-400 font-extrabold">{data.value}% Kontribusi</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 pt-2 border-t border-[#f1f3f1] text-[11px] font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006738] shrink-0" />
              <span className="flex-1 truncate">Hasil Panen (Pre-Order)</span>
              <span className="font-extrabold text-gray-900">55%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] shrink-0" />
              <span className="flex-1 truncate">Hasil Panen (Ready Stock)</span>
              <span className="font-extrabold text-gray-900">32%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6c5344] shrink-0" />
              <span className="flex-1 truncate">Limbah Organik</span>
              <span className="font-extrabold text-gray-900">13%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Riwayat Laporan Pembukuan */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ece8] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Table Title */}
        <div className="mb-5">
          <h3 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
            Riwayat Laporan Pembukuan
          </h3>
          <p className="text-xs text-[#6b7280] mt-0.5">
            Catatan pembukuan kas bulanan terverifikasi sistem
          </p>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#f0f2f0] text-[11px] font-bold text-[#6b7280] tracking-wider uppercase">
                <th className="py-3 px-3 font-bold">BULAN</th>
                <th className="py-3 px-3 font-bold">PEMASUKAN KOTOR</th>
                <th className="py-3 px-3 font-bold">BIAYA & PENGELUARAN</th>
                <th className="py-3 px-3 font-bold">LABA BERSIH</th>
                <th className="py-3 px-3 font-bold text-center">RASIO PROFIT</th>
                <th className="py-3 px-3 font-bold text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f7f5]">
              {ledgerHistory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#fafcfa] transition-colors group"
                >
                  <td className="py-4 px-3 font-extrabold text-gray-900 whitespace-nowrap">
                    {item.month}
                  </td>
                  <td className="py-4 px-3 font-bold text-[#006738] whitespace-nowrap">
                    {item.grossRevenue}
                  </td>
                  <td className="py-4 px-3 font-bold text-[#8c5d39] whitespace-nowrap">
                    {item.expenses}
                  </td>
                  <td className="py-4 px-3 font-extrabold text-[#006738] whitespace-nowrap">
                    {item.netProfit}
                  </td>
                  <td className="py-4 px-3 text-center whitespace-nowrap">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold text-[#006738] bg-[#dcfce7] border border-[#bbf7d0]">
                      {item.profitRatio}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDownloadPdf(item.month)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-gray-700 bg-white hover:bg-[#f6f9f6] border border-[#d6ddd6] transition-colors"
                      title={`Download Laporan ${item.month}`}
                    >
                      <FileDown className="w-3.5 h-3.5 text-[#006738]" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal: Cairkan Saldo */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#e8ece8] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f2f0]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006738] flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-900">Pencairan Saldo Tani</h4>
                  <p className="text-xs text-gray-500">Kirim dana langsung ke rekening bank Anda</p>
                </div>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#fafcfa] border border-[#eaefea] space-y-1">
                <span className="text-gray-400 block font-medium">Total Saldo Tersedia</span>
                <span className="text-2xl font-black text-[#006738] block">Rp8.420.000</span>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="font-bold text-gray-700 block">Nominal Pencairan (Rp)</label>
                <input
                  type="text"
                  defaultValue="8.420.000"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 block">Rekening Tujuan</label>
                <div className="p-3 rounded-xl border border-[#d6ddd6] flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-gray-800">BCA - 1234567890</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">a.n. Fazel Mawla</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  showToast('Permintaan pencairan Rp8.420.000 berhasil dikirim! Dana diproses dalam 1x24 jam.');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#006738] hover:bg-[#00502c] transition-colors"
              >
                Konfirmasi Pencairan
              </button>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerAnalyticsPage;
