import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Recycle,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Package,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { initialSellerWaste } from '@/data/sellerWasteStore';
import type { SellerWasteItem } from '@/data/sellerWasteStore';
import farmingBg from '@/assets/farming_bg.png';

export const SellerWastePage: React.FC = () => {
  const navigate = useNavigate();

  const [wasteItems, setWasteItems] = useState<SellerWasteItem[]>(() => {
    const saved = localStorage.getItem('panenku_seller_waste');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialSellerWaste;
      }
    }
    return initialSellerWaste;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveWasteItems = (items: SellerWasteItem[]) => {
    setWasteItems(items);
    localStorage.setItem('panenku_seller_waste', JSON.stringify(items));
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus inventori limbah "${name}"?`)) {
      const updated = wasteItems.filter((item) => item.id !== id);
      saveWasteItems(updated);
      showToast(`Limbah "${name}" berhasil dihapus.`);
    }
  };

  // Calculate stats
  const totalVolume = wasteItems.reduce((acc, item) => acc + item.volume, 0);
  const totalEstimatedRevenue = wasteItems.reduce(
    (acc, item) => acc + item.volume * item.pricePerUnit,
    0
  );

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
          Marketplace Limbah Pertanian
        </h1>
      </div>

      {/* Hero Banner with Agricultural Background */}
      <section className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-[#d5ded5] shadow-[0_4px_20px_rgba(0,103,56,0.08)]">
        {/* Background photo with deep green gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${farmingBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#033b20]/95 via-[#064e2c]/90 to-[#03331b]/80" />

        {/* Banner Content */}
        <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-black tracking-widest uppercase text-[#bef264] drop-shadow-xs">
              EKOSISTEM SIRKULAR
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Marketplace{' '}
              <span className="font-serif italic font-normal text-[#d9f99d]">
                Limbah Pertanian
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-1">
              Konversikan residu panen menjadi komoditas sirkular bernilai ekonomi tinggi untuk industri pupuk dan pakan.
            </p>
          </div>

          {/* Add Waste Button */}
          <Link
            to="/penjual/limbah/tambah"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#bef264] hover:bg-[#a3e635] text-[#111827] font-extrabold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-102 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah Limbah</span>
          </Link>
        </div>
      </section>

      {/* 2 Big Statistic Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Total Stok Terdaftar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase">
              TOTAL STOK TERDAFTAR
            </p>
            <p className="text-3xl sm:text-4xl font-black text-[#111827] mt-2 tracking-tight">
              {totalVolume} kg
            </p>
          </div>
          <p className="text-xs text-[#6b7280] mt-3 pt-2 border-t border-[#f2f4f2]">
            Kategori limbah aktif
          </p>
        </div>

        {/* Card 2: Estimasi Pendapatan */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase">
              ESTIMASI PENDAPATAN
            </p>
            <p className="text-3xl sm:text-4xl font-black text-[#111827] mt-2 tracking-tight">
              Rp{totalEstimatedRevenue.toLocaleString('id-ID')}
            </p>
          </div>
          <p className="text-xs text-[#6b7280] mt-3 pt-2 border-t border-[#f2f4f2]">
            Potensi sirkular daur ulang
          </p>
        </div>
      </section>

      {/* Section: Inventori Limbah Organik Anda */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ece8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f0f2f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ecfdf5] text-[#006738] flex items-center justify-center">
              <Recycle className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
              Inventori Limbah Organik Anda
            </h2>
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-gray-800 bg-[#f3f5f3] border border-gray-200">
            AKTIF TAYANG
          </span>
        </div>

        {/* Inventory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wasteItems.length > 0 ? (
            wasteItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all space-y-4"
              >
                {/* Header: Photo, Name, Badge */}
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#e2e8e2] bg-gray-50 shadow-2xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-base text-[#111827] truncate">
                      {item.name}
                    </h3>
                    <div className="mt-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#006738] bg-[#ecfdf5] border border-[#a7f3d0]">
                        {item.categoryBadge || 'LIMBAH TANI'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Table: Volume and Price */}
                <div className="space-y-1.5 pt-2 border-t border-[#f2f4f2] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Volume:</span>
                    <span className="font-extrabold text-gray-900">
                      {item.volume} {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Harga:</span>
                    <span className="font-extrabold text-[#006738]">
                      Rp{item.pricePerUnit.toLocaleString('id-ID')}/{item.unit}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Edit and Delete */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#f4f6f4]">
                  <button
                    onClick={() => navigate(`/penjual/limbah/tambah?edit=${item.id}`)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold text-gray-700 bg-white border border-[#d6ddd6] hover:bg-[#f6f9f6] hover:border-[#006738] transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors shrink-0"
                    title="Hapus Limbah"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-[#fafbfa] rounded-2xl border border-dashed border-gray-300 p-8">
              <Recycle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-gray-800">
                Belum ada inventori limbah yang terdaftar
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Daftarkan limbah pertanian Anda untuk menemukan mitra daur ulang dan pembeli.
              </p>
              <Link
                to="/penjual/limbah/tambah"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#006738] text-white text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Limbah Baru</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SellerWastePage;
