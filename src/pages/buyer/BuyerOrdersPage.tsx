import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  Filter,
  Search,
  Package,
  Calendar,
} from 'lucide-react';
import { buyerDashboardService, orderService } from '@/services';
import type { BuyerTransaction, Order } from '@/types';

export const BuyerOrdersPage: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'produk' | 'konsultasi'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [transactions, setTransactions] = useState<BuyerTransaction[]>(() =>
    buyerDashboardService.getAllTransactions()
  );
  const [orders, setOrders] = useState<Order[]>(() => orderService.getAll());

  useEffect(() => {
    const refreshData = () => {
      setTransactions(buyerDashboardService.getAllTransactions());
      setOrders(orderService.getAll());
    };
    window.addEventListener('dashboard-updated', refreshData);
    window.addEventListener('orders-updated', refreshData);
    return () => {
      window.removeEventListener('dashboard-updated', refreshData);
      window.removeEventListener('orders-updated', refreshData);
    };
  }, []);

  const filteredTransactions = transactions.filter((trx) => {
    if (filterType !== 'all' && trx.type !== filterType) return false;
    if (statusFilter !== 'all' && trx.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return trx.title.toLowerCase().includes(q) || trx.code.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full pb-16 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Riwayat Pesanan &amp; Transaksi
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 font-normal">
            Pantau seluruh pembelian komoditas hasil panen, limbah tani, dan sesi konsultasi Anda.
          </p>
        </div>

        <Link
          to="/pembeli/marketplace"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143427] transition shadow-xs w-fit"
        >
          <span>Belanja Produk Lain</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-2xs">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Semua Transaksi' },
            { id: 'produk', label: 'Hasil Tani & Limbah' },
            { id: 'konsultasi', label: 'Konsultasi Mentor' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#1b4332] text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor kode / judul..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200/80 rounded-xl focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Transactions / Orders List */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-gray-800">Belum Ada Transaksi</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Anda belum memiliki riwayat pesanan dengan kriteria ini. Mulai belanja hasil bumi segar langsung dari petani!
          </p>
          <Link
            to="/pembeli/marketplace"
            className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143427] transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Mulai Belanja</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredTransactions.map((trx) => {
            // Find detailed order if exists
            const orderDetail = orders.find((o) => o.id === trx.code);

            return (
              <div
                key={trx.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 hover:border-gray-200 transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                      {trx.type === 'konsultasi' ? (
                        <MessageSquare className="w-4 h-4" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-gray-900">{trx.code}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                          {trx.type}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 block mt-0.5">{trx.date}</span>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`text-[11px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${
                      trx.status === 'PAID' || trx.status === 'SELESAI'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {trx.status}
                  </span>
                </div>

                {/* Content Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-800">{trx.title}</h4>
                    {orderDetail && (
                      <p className="text-xs text-gray-500">
                        {orderDetail.items.length} item • Penerima: <strong>{orderDetail.buyerName}</strong>
                      </p>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto gap-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Total Pembayaran</span>
                    <span className="text-base sm:text-lg font-black text-emerald-800">
                      Rp{trx.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 flex items-center justify-end gap-2 text-xs">
                  <Link
                    to="/pembeli/marketplace"
                    className="px-4 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold transition cursor-pointer"
                  >
                    Beli Lagi
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BuyerOrdersPage;
