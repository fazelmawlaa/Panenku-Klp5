import React from 'react';
import { RecentOrdersTable } from '@/components/seller/RecentOrdersTable';
import { ClipboardList, Download, Plus, Filter } from 'lucide-react';

export const SellerOrdersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Kelola Pesanan
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Pantau dan kelola seluruh transaksi pre-order, produk siap kirim, dan limbah pertanian.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 shadow-xs">
            <Download className="w-4 h-4" />
            <span>Ekspor Laporan</span>
          </button>
        </div>
      </div>

      <RecentOrdersTable />
    </div>
  );
};

export default SellerOrdersPage;
