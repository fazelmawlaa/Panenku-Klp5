import React, { useState } from 'react';
import { Search, Filter, Eye, ChevronDown } from 'lucide-react';
import { OrderDetailModal } from './OrderDetailModal';
import type { SellerOrder } from './OrderDetailModal';

export const initialOrders: SellerOrder[] = [
  {
    id: 'SES-325-3967',
    buyer: 'fazel (-)',
    product: 'Konsultasi: Muhammad Fazel Mawla',
    qty: '1',
    total: 'Rp75.000',
    status: 'PAID',
    category: 'Konsultasi',
  },
  {
    id: 'ORD-5127',
    buyer: 'Muhammad Fazel Mawla (085211636085)',
    product: 'Sekam Padi',
    qty: '1 kg',
    total: 'Rp19.500',
    status: 'SELESAI',
    category: 'Limbah',
  },
  {
    id: 'ORD-11813',
    buyer: 'Muhammad Fazel Mawla (085211636085)',
    product: 'Sekam Padi',
    qty: '1 kg',
    total: 'Rp19.500',
    status: 'SELESAI',
    category: 'Limbah',
  },
  {
    id: 'ORD-11793',
    buyer: 'Muhammad Fazel Mawla (085211636085)',
    product: 'Sekam Padi',
    qty: '1 kg',
    total: 'Rp19.500',
    status: 'SELESAI',
    category: 'Limbah',
  },
  {
    id: 'ORD-10187-2',
    buyer: 'Muhammad Fazel Mawla (085211636085)',
    product: 'Sekam Padi',
    qty: '2 kg',
    total: 'Rp3.000',
    status: 'SELESAI',
    category: 'Limbah',
  },
  {
    id: 'ORD-7087-1',
    buyer: 'Muhammad Fazel Mawla (085211636085)',
    product: 'Bawang Merah',
    qty: '1 kg',
    total: 'Rp40.000',
    status: 'MENUNGGU',
    category: 'Hasil Panen',
  },
  {
    id: 'ORD-11756',
    buyer: 'Ibrahim Zarqa Islamy (082260467373)',
    product: 'Bawang Merah',
    qty: '1 kg',
    total: 'Rp34.000',
    status: 'MENUNGGU',
    category: 'Hasil Panen',
  },
  {
    id: 'ORD-8049',
    buyer: 'muhammad (081233834838)',
    product: 'Bawang Merah',
    qty: '1 kg',
    total: 'Rp37.000',
    status: 'DIBAYAR',
    category: 'Hasil Panen',
  },
  {
    id: 'ORD-6163',
    buyer: 'fazel (5423)',
    product: 'Bawang Merah',
    qty: '1 kg',
    total: 'Rp40.000',
    status: 'SELESAI',
    category: 'Hasil Panen',
  },
  {
    id: 'ORD-6763',
    buyer: 'fazel (085211636085)',
    product: 'Bawang Merah',
    qty: '1 kg',
    total: 'Rp40.000',
    status: 'DITERIMA',
    category: 'Hasil Panen',
  },
];

export const RecentOrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<SellerOrder[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<SellerOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'ALL' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: SellerOrder['status']) => {
    switch (status) {
      case 'PAID':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
            PAID
          </span>
        );
      case 'SELESAI':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#006738] bg-[#dcfce7] border border-[#bbf7d0]">
            SELESAI
          </span>
        );
      case 'MENUNGGU':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200">
            MENUNGGU
          </span>
        );
      case 'DIBAYAR':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200">
            DIBAYAR
          </span>
        );
      case 'DITERIMA':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-300">
            DITERIMA
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-gray-700 bg-gray-100">
            {status}
          </span>
        );
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: SellerOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      {/* Table Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">
            Pesanan Terbaru
          </h2>
          <p className="text-xs text-[#6b7280] mt-0.5">
            Daftar pesanan masuk, konsultasi, dan status pengiriman produk Anda
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID, pembeli, produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-[#f7faf7] border border-[#e2e8e2] rounded-xl text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#006738] focus:bg-white w-48 sm:w-56"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-[#f3f5f3] p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                filterStatus === 'ALL'
                  ? 'bg-white text-[#006738] shadow-xs font-bold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterStatus('MENUNGGU')}
              className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                filterStatus === 'MENUNGGU'
                  ? 'bg-white text-amber-700 shadow-xs font-bold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Menunggu
            </button>
            <button
              onClick={() => setFilterStatus('SELESAI')}
              className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                filterStatus === 'SELESAI'
                  ? 'bg-white text-[#006738] shadow-xs font-bold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Selesai
            </button>
          </div>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll for responsiveness */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#f0f2f0] text-[11px] font-bold text-[#6b7280] tracking-wider uppercase">
              <th className="py-3 px-3 font-bold">ID PESANAN</th>
              <th className="py-3 px-3 font-bold">PEMBELI</th>
              <th className="py-3 px-3 font-bold">PRODUK</th>
              <th className="py-3 px-3 font-bold text-center">QTY</th>
              <th className="py-3 px-3 font-bold">TOTAL</th>
              <th className="py-3 px-3 font-bold text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f7f5]">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-[#fafcfa] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-3 font-bold text-gray-900 whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-3 text-gray-700 whitespace-nowrap">
                    {order.buyer}
                  </td>
                  <td className="py-3.5 px-3 text-gray-800 font-medium">
                    {order.product}
                  </td>
                  <td className="py-3.5 px-3 text-gray-600 text-center whitespace-nowrap">
                    {order.qty}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-[#006738] whitespace-nowrap">
                    {order.total}
                  </td>
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">
                  Tidak ada pesanan yang sesuai dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
