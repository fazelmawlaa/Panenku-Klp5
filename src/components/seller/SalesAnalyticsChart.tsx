import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface ChartDataPoint {
  day: string;
  value: number; // in million rupiah (e.g. 0.11 = Rp 110.000)
  revenueFormatted: string;
}

const weeklyData: ChartDataPoint[] = [
  { day: 'Sen', value: 0.11, revenueFormatted: 'Rp110.000' },
  { day: 'Sel', value: 0.065, revenueFormatted: 'Rp65.000' },
  { day: 'Rab', value: 0.06, revenueFormatted: 'Rp60.000' },
  { day: 'Kam', value: 0.025, revenueFormatted: 'Rp25.000' },
  { day: 'Jum', value: 0.015, revenueFormatted: 'Rp15.000' },
  { day: 'Sab', value: 0.038, revenueFormatted: 'Rp38.000' },
  { day: 'Min', value: 0.033, revenueFormatted: 'Rp33.000' },
];

const monthlyData: ChartDataPoint[] = [
  { day: 'Mgg 1', value: 0.28, revenueFormatted: 'Rp280.000' },
  { day: 'Mgg 2', value: 0.34, revenueFormatted: 'Rp340.000' },
  { day: 'Mgg 3', value: 0.327, revenueFormatted: 'Rp327.500' },
  { day: 'Mgg 4', value: 0.41, revenueFormatted: 'Rp410.000' },
];

export const SalesAnalyticsChart: React.FC = () => {
  const [period, setPeriod] = useState<'mingguan' | 'bulanan'>('mingguan');
  const activeData = period === 'mingguan' ? weeklyData : monthlyData;

  const formatYAxis = (val: number) => {
    if (val === 0) return '0jt';
    return `${val}jt`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">
            Analitik Penjualan
          </h2>
          <p className="text-xs text-[#6b7280] mt-1">
            Statistik pendapatan mingguan dari penjualan hasil panen dan produk sirkular
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#f3f5f3] p-1 rounded-xl self-start shrink-0 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPeriod('mingguan')}
            className={`px-3 py-1 rounded-lg transition-all ${
              period === 'mingguan'
                ? 'bg-white text-[#006738] shadow-xs font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Mingguan
          </button>
          <button
            type="button"
            onClick={() => setPeriod('bulanan')}
            className={`px-3 py-1 rounded-lg transition-all ${
              period === 'bulanan'
                ? 'bg-white text-[#006738] shadow-xs font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Bulanan
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[280px] sm:h-[300px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activeData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#006738" stopOpacity={0.22} />
                <stop offset="60%" stopColor="#006738" stopOpacity={0.06} />
                <stop offset="100%" stopColor="#006738" stopOpacity={0.00} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f2f0"
            />
            <XAxis
              dataKey="day"
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
              dy={6}
            />
            <YAxis
              domain={[0, 0.12]}
              ticks={[0, 0.03, 0.06, 0.09, 0.12]}
              tickFormatter={formatYAxis}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
              dx={-4}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as ChartDataPoint;
                  return (
                    <div className="bg-[#111827] text-white text-xs rounded-xl py-2 px-3 shadow-lg border border-gray-700">
                      <p className="font-semibold text-gray-300">{data.day}</p>
                      <p className="font-bold text-emerald-400 text-sm mt-0.5">
                        {data.revenueFormatted}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {data.value}jt Rupiah
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#006738"
              strokeWidth={2.8}
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{
                r: 6,
                fill: '#006738',
                stroke: '#ffffff',
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Mini summary footer */}
      <div className="pt-3 border-t border-[#f1f3f1] flex items-center justify-between text-xs text-gray-500">
        <span>Rata-rata pendapatan harian</span>
        <span className="font-bold text-[#006738]">Rp46.785 / hari</span>
      </div>
    </div>
  );
};
