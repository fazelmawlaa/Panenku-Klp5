import React, { useState, useRef, useEffect } from 'react';
import bgDashboard from '@/assets/bg_dashboard.jpg';
import {
  ClipboardList,
  MessageCircle,
  ChevronDown,
  Check,
  Search,
  X,
  Clock,
  CheckCircle2,
  Loader2,
  Sprout,
  Truck,
  PackageCheck,
  XCircle,
  LayoutGrid,
  AlertTriangle,
  TrendingUp,
  Package,
} from 'lucide-react';
import { SellerSidebar } from '@/components/layout/SellerSidebar';
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
    qty: 2,
    unit: 'kg',
    total: 19500,
    status: 'Selesai',
    createdAt: '2026-10-10T10:00:00Z',
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
    createdAt: '2026-10-12T16:00:00Z',
  },
  {
    id: 'ORD-3301',
    buyerName: 'Rina Agustina',
    productName: 'Cabai Busuk (Limbah)',
    productCategory: 'Limbah Pertanian',
    qty: 5,
    unit: 'kg',
    total: 50000,
    status: 'Diproses',
    createdAt: '2026-10-11T11:00:00Z',
  },
  {
    id: 'ORD-4452',
    buyerName: 'Tono Wijaya',
    productName: 'Kopi Arabika Gayo',
    productCategory: 'Kopi',
    qty: 2,
    unit: 'kg',
    total: 260000,
    status: 'Pengiriman',
    createdAt: '2026-10-10T09:30:00Z',
  },
  {
    id: 'ORD-9901',
    buyerName: 'Sari Dewi',
    productName: 'Tomat Organik',
    productCategory: 'Sayuran',
    qty: 3,
    unit: 'kg',
    total: 36000,
    status: 'Sedang Panen',
    createdAt: '2026-10-09T13:00:00Z',
  },
  {
    id: 'ORD-0023',
    buyerName: 'Deni Kurniawan',
    productName: 'Jerami Padi',
    productCategory: 'Limbah Pertanian',
    qty: 10,
    unit: 'kg',
    total: 8000,
    status: 'Ditolak',
    createdAt: '2026-10-08T10:00:00Z',
    notes: 'Stok habis, mohon maaf',
  },
];

// ── Status Config ─────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }
> = {
  Semua: { label: 'Semua', icon: LayoutGrid, color: 'text-neutral-700', bg: 'bg-neutral-100', border: 'border-neutral-200' },
  Menunggu: { label: 'Menunggu', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  Dibayar: { label: 'Dibayar', icon: CheckCircle2, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  Diproses: { label: 'Diproses', icon: Loader2, color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200' },
  'Sedang Panen': { label: 'Sedang Panen', icon: Sprout, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  Pengiriman: { label: 'Pengiriman', icon: Truck, color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200' },
  Selesai: { label: 'Selesai', icon: PackageCheck, color: 'text-[#007a3d]', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  Ditolak: { label: 'Ditolak', icon: XCircle, color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as (OrderStatus | 'Semua')[];

// ── StatusBadge ───────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['Menunggu'];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border} uppercase tracking-wide`}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
};

// ── Dropdown Filter ───────────────────────────────────────────────

interface FilterDropdownProps {
  value: OrderStatus | 'Semua';
  onChange: (v: OrderStatus | 'Semua') => void;
  counts: Record<string, number>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, onChange, counts }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cfg = STATUS_CONFIG[value];
  const Icon = cfg.icon;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id="filter-status-dropdown"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-bold text-neutral-800 transition shadow-xs cursor-pointer min-w-[180px]"
      >
        <Icon className={`w-4 h-4 shrink-0 ${cfg.color}`} />
        <span className="flex-1 text-left">{cfg.label}</span>
        {counts[value] !== undefined && (
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
            {counts[value]}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl border border-neutral-200 shadow-xl py-2 min-w-[240px] overflow-hidden">
          {ALL_STATUSES.map((s) => {
            const c = STATUS_CONFIG[s];
            const SIcon = c.icon;
            const isSelected = value === s;
            const count = counts[s] ?? 0;
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onChange(s as OrderStatus | 'Semua');
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-50 text-neutral-900'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <SIcon className={`w-4 h-4 shrink-0 ${c.color}`} />
                <span className="flex-1 text-left">{c.label}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.bg} ${c.color} border ${c.border}`}>
                  {count}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#007a3d] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
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
    <div className="w-full bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-sm hover:border-neutral-300 transition-all duration-200 overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-mono font-bold text-neutral-500 shrink-0">
            ID PESANAN · {order.id}
          </span>
          <span className="hidden sm:block w-px h-4 bg-neutral-200" />
          <span className="hidden sm:block text-xs text-neutral-400 font-medium">{formatDate(order.createdAt)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-neutral-500 shrink-0">TOTAL TAGIHAN</span>
          <span className="text-base sm:text-lg font-black text-[#007a3d] tracking-tight shrink-0">
            {formatRupiah(order.total)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-5">
        {/* Product Title */}
        <h3 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight mb-4">
          {order.productName}
        </h3>

        {/* Info Grid: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-[#f8f9fa] rounded-xl px-4 py-3 border border-neutral-100">
            <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">
              Pembeli / Mitra
            </p>
            <p className="text-sm font-bold text-neutral-900 truncate">{order.buyerName}</p>
          </div>

          <div className="bg-[#f8f9fa] rounded-xl px-4 py-3 border border-neutral-100">
            <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">
              Volume Pesanan
            </p>
            <p className="text-sm font-bold text-neutral-900">
              {order.qty} {order.unit}
            </p>
          </div>

          <div className="bg-[#f8f9fa] rounded-xl px-4 py-3 border border-neutral-100">
            <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">
              Status Pemrosesan
            </p>
            <StatusBadge status={order.status} />
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 font-medium">{order.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          {/* Left: Status Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {order.status === 'Menunggu' && (
              <>
                <button
                  type="button"
                  onClick={() => onUpdateStatus(order.id, 'Dibayar')}
                  className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Verifikasi Pembayaran
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateStatus(order.id, 'Ditolak')}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-4 py-2 rounded-full transition cursor-pointer"
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
                className="inline-flex items-center gap-1.5 bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm cursor-pointer"
              >
                <Loader2 className="w-3.5 h-3.5" />
                Proses Pesanan
              </button>
            )}

            {order.status === 'Diproses' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(order.id, 'Sedang Panen')}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm cursor-pointer"
              >
                <Sprout className="w-3.5 h-3.5" />
                Mulai Panen
              </button>
            )}

            {order.status === 'Sedang Panen' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(order.id, 'Pengiriman')}
                className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5" />
                Kirim Pesanan
              </button>
            )}

            {order.status === 'Pengiriman' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(order.id, 'Selesai')}
                className="inline-flex items-center gap-1.5 bg-[#007a3d] hover:bg-[#006633] text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm cursor-pointer"
              >
                <PackageCheck className="w-3.5 h-3.5" />
                Pesanan Selesai
              </button>
            )}

            {order.status === 'Selesai' && (
              <span className="inline-flex items-center gap-1.5 text-[#007a3d] text-xs font-bold">
                <PackageCheck className="w-3.5 h-3.5" />
                Pesanan Selesai
              </span>
            )}

            {order.status === 'Ditolak' && (
              <span className="inline-flex items-center gap-1.5 text-red-600 text-xs font-bold">
                <XCircle className="w-3.5 h-3.5" />
                Pesanan Ditolak
              </span>
            )}
          </div>

          {/* Right: Chat */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 text-xs font-bold px-4 py-2 rounded-full transition cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#007a3d]" />
            Chat Pembeli
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────

export const SellerOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<SellerOrder[]>(MOCK_ORDERS);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  // Count per status
  const counts = ALL_STATUSES.reduce(
    (acc, s) => {
      acc[s] =
        s === 'Semua'
          ? orders.length
          : orders.filter((o) => o.status === s).length;
      return acc;
    },
    {} as Record<string, number>
  );

  // Filtered & searched list
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

  // Summary stats
  const totalRevenue = orders
    .filter((o) => o.status === 'Selesai')
    .reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === 'Menunggu').length;
  const activeCount = orders.filter((o) =>
    ['Dibayar', 'Diproses', 'Sedang Panen', 'Pengiriman'].includes(o.status)
  ).length;

  const formatRupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-neutral-900">
      {/* Sidebar */}
      <SellerSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Inner container */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Kelola Pesanan
            </h1>
          </div>

          {/* Hero Banner */}
          <div
            className="relative w-full rounded-3xl overflow-hidden mb-8 flex items-end"
            style={{ minHeight: '140px' }}
          >
            {/* Background image */}
            <img
              src={bgDashboard}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay so text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b1a]/80 via-[#1a4a2e]/60 to-transparent" />

            <div className="relative z-10 px-8 py-7 w-full">
              <span className="text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest mb-1 block">
                KELOLA TRANSAKSI
              </span>
              <p className="text-white text-2xl sm:text-3xl font-black tracking-tight">
                Kelola <span className="italic font-light text-emerald-200">Pesanan Tani</span>
              </p>
            </div>
          </div>

          {/* Summary Stat Cards — 6 cols */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
            {[
              { label: 'Total Pesanan', value: orders.length, icon: Package, color: 'text-neutral-700', bg: 'bg-white', valueStr: null },
              { label: 'Menunggu Aksi', value: pendingCount, icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50', valueStr: null },
              { label: 'Aktif Berjalan', value: activeCount, icon: TrendingUp, color: 'text-violet-700', bg: 'bg-violet-50', valueStr: null },
              { label: 'Pesanan Selesai', value: orders.filter(o => o.status === 'Selesai').length, icon: PackageCheck, color: 'text-[#007a3d]', bg: 'bg-emerald-50', valueStr: null },
              { label: 'Perlu Tindakan', value: pendingCount + activeCount, icon: AlertTriangle, color: 'text-orange-700', bg: 'bg-orange-50', valueStr: null },
              { label: 'Pendapatan Selesai', value: 0, icon: TrendingUp, color: 'text-[#007a3d]', bg: 'bg-emerald-50', valueStr: formatRupiah(totalRevenue) },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`${stat.bg} rounded-2xl border border-neutral-200/90 p-4 sm:p-5 flex items-center gap-3 shadow-xs`}
                >
                  <div className={`w-8 h-8 rounded-xl ${stat.bg} border border-neutral-200 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-500 leading-tight">{stat.label}</p>
                    <p className={`text-lg font-black ${stat.color} truncate`}>
                      {stat.valueStr ?? stat.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            {/* Status Dropdown Filter */}
            <FilterDropdown
              value={filterStatus}
              onChange={setFilterStatus}
              counts={counts}
            />

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID pesanan, nama pembeli, atau produk..."
                className="w-full bg-white border border-neutral-200 focus:border-[#007a3d] focus:ring-2 focus:ring-[#007a3d]/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-700 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Results Label */}
          <p className="text-xs font-bold text-neutral-500 mb-4">
            Menampilkan{' '}
            <span className="text-neutral-800">{filteredOrders.length}</span> pesanan
            {filterStatus !== 'Semua' && (
              <>
                {' '}dengan status{' '}
                <span className="text-[#007a3d]">{filterStatus}</span>
              </>
            )}
            {searchQuery && (
              <>
                {' '}untuk pencarian{' '}
                <span className="text-[#007a3d]">"{searchQuery}"</span>
              </>
            )}
          </p>

          {/* Order Cards List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center">
              <ClipboardList className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-base font-black text-neutral-700 mb-1">Tidak ada pesanan ditemukan</h3>
              <p className="text-sm text-neutral-400">
                Coba ubah filter status atau hapus pencarian.
              </p>
              <button
                type="button"
                onClick={() => { setFilterStatus('Semua'); setSearchQuery(''); }}
                className="mt-4 text-xs font-bold text-[#007a3d] hover:underline"
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
      </main>
    </div>
  );
};

export default SellerOrdersPage;
