import React, { useState } from 'react';
import bgDashboard from '@/assets/bg_dashboard.jpg';
import {
  ClipboardList,
  MessageCircle,
  Search,
  X,
  Clock,
  CheckCircle2,
  Loader2,
  Sprout,
  Truck,
  PackageCheck,
  XCircle,
  Check,
  AlertTriangle,
} from 'lucide-react';
import type { OrderStatus } from '@/types';

// ── Types & Mock Data ──────────────────────────────────────────────

interface SellerOrder {
  id: string;
  buyerName: string;
  productName: string;
  productCategory: string;
  qty: number;
  unit: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

const MOCK_ORDERS: SellerOrder[] = [
  {
    id: 'SES-325-3967',
    buyerName: 'fazel',
    productName: 'Konsultasi: Muhammad Fazel Mawla',
    productCategory: 'Konsultasi',
    qty: 1,
    unit: 'sesi',
    total: 75000,
    status: 'Dibayar',
    createdAt: '2026-10-12T09:00:00Z',
  },
  {
    id: 'ORD-5127',
    buyerName: 'Muhammad Fazel Mawla',
    productName: 'Sekam Padi',
    productCategory: 'Limbah Pertanian',
    qty: 1,
    unit: 'kg',
    total: 19500,
    status: 'Selesai',
    createdAt: '2026-10-11T14:30:00Z',
    notes: 'Tolong dikemas rapi',
  },
  {
    id: 'ORD-11813',
    buyerName: 'Muhammad Fazel Mawla',
    productName: 'Sekam Padi',
    productCategory: 'Limbah Pertanian',
    qty: 1,
    unit: 'kg',
    total: 19500,
    status: 'Selesai',
    createdAt: '2026-10-10T10:00:00Z',
  },
  {
    id: 'ORD-11814',
    buyerName: 'Muhammad Fazel Mawla',
    productName: 'Sekam Padi',
    productCategory: 'Limbah Pertanian',
    qty: 1,
    unit: 'kg',
    total: 19500,
    status: 'Selesai',
    createdAt: '2026-10-10T09:15:00Z',
  },
  {
    id: 'ORD-11815',
    buyerName: 'Muhammad Fazel Mawla',
    productName: 'Sekam Padi',
    productCategory: 'Limbah Pertanian',
    qty: 1,
    unit: 'kg',
    total: 19500,
    status: 'Selesai',
    createdAt: '2026-10-09T16:00:00Z',
  },
  {
    id: 'ORD-7087-1',
    buyerName: 'Muhammad Fazel Mawla',
    productName: 'Bawang Merah',
    productCategory: 'Sayuran',
    qty: 1,
    unit: 'kg',
    total: 40000,
    status: 'Menunggu',
    createdAt: '2026-10-13T08:15:00Z',
    notes: 'Tolong pilihkan yang besar-besar',
  },
  {
    id: 'ORD-11756',
    buyerName: 'Ibrahim Zarqa Islamy',
    productName: 'Bawang Merah',
    productCategory: 'Sayuran',
    qty: 1,
    unit: 'kg',
    total: 34000,
    status: 'Menunggu',
    createdAt: '2026-10-13T07:45:00Z',
  },
  {
    id: 'ORD-8049',
    buyerName: 'muhammad',
    productName: 'Bawang Merah',
    productCategory: 'Sayuran',
    qty: 1,
    unit: 'kg',
    total: 37000,
    status: 'Dibayar',
    createdAt: '2026-10-12T14:20:00Z',
  },
  {
    id: 'ORD-7087-2',
    buyerName: 'fazel',
    productName: 'Bawang Merah',
    productCategory: 'Sayuran',
    qty: 1,
    unit: 'kg',
    total: 40000,
    status: 'Selesai',
    createdAt: '2026-10-12T10:00:00Z',
  },
  {
    id: 'ORD-7087-3',
    buyerName: 'fazel',
    productName: 'Bawang Merah',
    productCategory: 'Sayuran',
    qty: 1,
    unit: 'kg',
    total: 40000,
    status: 'Ditolak',
    createdAt: '2026-10-11T12:00:00Z',
  },
];

// ── Status Config ─────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }
> = {
  Semua: { label: 'Semua', icon: ClipboardList, color: 'text-neutral-700', bg: 'bg-neutral-100', border: 'border-neutral-200' },
  Menunggu: { label: 'Menunggu', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  Dibayar: { label: 'Paid', icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  Diproses: { label: 'Diproses', icon: Loader2, color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200' },
  'Sedang Panen': { label: 'Sedang Panen', icon: Sprout, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  Pengiriman: { label: 'Pengiriman', icon: Truck, color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200' },
  Selesai: { label: 'Selesai', icon: PackageCheck, color: 'text-[#007a3d]', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  Ditolak: { label: 'Dibatalkan', icon: XCircle, color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
};

const TAB_STATUSES: { key: OrderStatus | 'Semua'; label: string }[] = [
  { key: 'Semua', label: 'SEMUA' },
  { key: 'Menunggu', label: 'MENUNGGU' },
  { key: 'Dibayar', label: 'DIBAYAR' },
  { key: 'Diproses', label: 'DIPROSES' },
  { key: 'Sedang Panen', label: 'SEDANG PANEN' },
  { key: 'Pengiriman', label: 'PENGIRIMAN' },
  { key: 'Selesai', label: 'SELESAI' },
  { key: 'Ditolak', label: 'DIBATALKAN' },
];

// ── StatusBadge ───────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['Menunggu'];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border} uppercase tracking-wider`}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
};

// ── Order Card ────────────────────────────────────────────────────

const OrderCard: React.FC<{
  order: SellerOrder;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}> = ({ order, onUpdateStatus }) => {
  const formatRupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="w-full bg-white rounded-3xl border border-[#e5ebe5] shadow-xs hover:shadow-sm transition-all duration-200 overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 bg-[#fafcfa]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            ID PESANAN · {order.id}
          </span>
          <span className="hidden sm:block w-px h-3.5 bg-gray-200" />
          <span className="hidden sm:block text-[11px] text-gray-400 font-medium">
            {formatDate(order.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
            TOTAL TAGIHAN
          </span>
          <span className="text-sm sm:text-base font-black text-[#006738] tracking-tight">
            {formatRupiah(order.total)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-5">
        {/* Product Title */}
        <h3 className="text-base sm:text-lg font-black text-[#111827] tracking-tight mb-4">
          {order.productName}
        </h3>

        {/* Info Grid: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-[#f8faf8] rounded-2xl px-4 py-3 border border-[#edf2ed]">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
              PEMBELI / MITRA
            </p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{order.buyerName}</p>
          </div>

          <div className="bg-[#f8faf8] rounded-2xl px-4 py-3 border border-[#edf2ed]">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
              VOLUME PESANAN
            </p>
            <p className="text-xs sm:text-sm font-bold text-gray-900">
              {order.qty} {order.unit}
            </p>
          </div>

          <div className="bg-[#f8faf8] rounded-2xl px-4 py-3 border border-[#edf2ed] flex flex-col justify-center">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
              {order.productCategory === 'Konsultasi' ? 'STATUS PEMBAYARAN' : 'STATUS PENGIRIMAN'}
            </p>
            <div>
              <StatusBadge status={order.status} />
            </div>
          </div>
        </div>

        {/* Notes if available */}
        {order.notes && (
          <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 font-medium">{order.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
          {/* Left: Status Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {order.status === 'Menunggu' && (
              <>
                <button
                  type="button"
                  onClick={() => onUpdateStatus(order.id, 'Dibayar')}
                  className="inline-flex items-center gap-1.5 bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Verifikasi Pembayaran
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateStatus(order.id, 'Ditolak')}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Tolak Pesanan
                </button>
              </>
            )}

            {order.status === 'Dibayar' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(order.id, 'Diproses')}
                className="inline-flex items-center gap-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                <Loader2 className="w-3.5 h-3.5" />
                Proses Pesanan
              </button>
            )}

            {order.status === 'Diproses' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(order.id, 'Sedang Panen')}
                className="inline-flex items-center gap-1.5 bg-[#006738] hover:bg-[#00522c] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                <Sprout className="w-3.5 h-3.5" />
                Mulai Panen
              </button>
            )}

            {order.status === 'Sedang Panen' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(order.id, 'Pengiriman')}
                className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5" />
                Kirim Pesanan
              </button>
            )}

            {order.status === 'Pengiriman' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(order.id, 'Selesai')}
                className="inline-flex items-center gap-1.5 bg-[#006738] hover:bg-[#00522c] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                <PackageCheck className="w-3.5 h-3.5" />
                Pesanan Selesai
              </button>
            )}

            {order.status === 'Selesai' && (
              <span className="inline-flex items-center gap-1.5 text-[#006738] text-xs font-bold bg-[#edf5ef] px-3.5 py-1.5 rounded-xl border border-[#d2e5d5]">
                <PackageCheck className="w-3.5 h-3.5" />
                Pesanan Selesai
              </span>
            )}

            {order.status === 'Ditolak' && (
              <span className="inline-flex items-center gap-1.5 text-red-600 text-xs font-bold bg-red-50 px-3.5 py-1.5 rounded-xl border border-red-200">
                <XCircle className="w-3.5 h-3.5" />
                Pesanan Dibatalkan
              </span>
            )}
          </div>

          {/* Right: Chat Button */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#006738]" />
            Chat Pembeli
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Page Component ───────────────────────────────────────────

export const SellerOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<SellerOrder[]>(MOCK_ORDERS);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === 'Semua' || o.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.buyerName.toLowerCase().includes(q) ||
      o.productName.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
          Kelola Pesanan
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Pantau dan kelola seluruh transaksi pesanan hasil bumi, konsultasi, dan limbah pertanian.
        </p>
      </div>

      {/* Hero Banner: Kelola Pesanan Tani */}
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-xs flex items-end"
        style={{ minHeight: '130px' }}
      >
        <img
          src={bgDashboard}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b1a]/85 via-[#1a4a2e]/65 to-transparent" />

        <div className="relative z-10 px-8 py-6 w-full">
          <span className="text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest mb-1 block">
            KELOLA TRANSAKSI
          </span>
          <p className="text-white text-2xl sm:text-3xl font-black tracking-tight">
            Kelola <span className="italic font-light text-emerald-200">Pesanan Tani</span>
          </p>
        </div>
      </div>

      {/* Filter Tabs Pills (SEMUA, MENUNGGU, DIBAYAR, etc.) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {TAB_STATUSES.map((tab) => {
          const isSelected = filterStatus === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all whitespace-nowrap shadow-xs cursor-pointer ${
                isSelected
                  ? 'bg-[#006738] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari ID pesanan, nama pembeli, atau produk..."
          className="w-full bg-white border border-[#e5ebe5] focus:border-[#006738] focus:ring-1 focus:ring-[#006738] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 outline-none transition shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#e5ebe5] p-12 text-center">
          <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-700 mb-1">Tidak ada pesanan ditemukan</h3>
          <p className="text-xs text-gray-400">
            Coba pilih filter status lain atau reset kata kunci pencarian.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterStatus('Semua');
              setSearchQuery('');
            }}
            className="mt-4 text-xs font-bold text-[#006738] hover:underline"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrdersPage;
