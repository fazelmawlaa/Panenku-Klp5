import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Sprout,
  Package,
  Archive,
  Edit3,
  ArchiveRestore,
  Trash2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { initialSellerProducts } from '@/data/sellerProductsStore';
import type { SellerProductItem } from '@/data/sellerProductsStore';
import farmingBg from '@/assets/farming_bg.png';
import kopiArabikaImg from '@/assets/kopi_arabika.jpg';

export const SellerMarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<SellerProductItem[]>(() => {
    const saved = localStorage.getItem('panenku_seller_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SellerProductItem[];
        // Always ensure prod-1 uses the new image
        return parsed.map((p) =>
          p.id === 'prod-1' ? { ...p, image: kopiArabikaImg } : p
        );
      } catch (e) {
        return initialSellerProducts;
      }
    }
    return initialSellerProducts;
  });

  const [activeTab, setActiveTab] = useState<'SEMUA' | 'PRE-ORDER' | 'READY STOCK' | 'DIARSIPKAN'>('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveProducts = (newProducts: SellerProductItem[]) => {
    setProducts(newProducts);
    localStorage.setItem('panenku_seller_products', JSON.stringify(newProducts));
  };

  const handleToggleArchive = (id: string) => {
    const updated = products.map((item) => {
      if (item.id === id) {
        const isArchived = item.type === 'archived';
        const newType = isArchived ? ('ready' as const) : ('archived' as const);
        showToast(
          isArchived
            ? `Produk "${item.name}" berhasil dipulihkan dari arsip!`
            : `Produk "${item.name}" berhasil diarsipkan!`
        );
        return { ...item, type: newType };
      }
      return item;
    });
    saveProducts(updated);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
      showToast(`Produk "${name}" berhasil dihapus.`);
    }
  };

  // Filter products based on tab & search
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryBadge.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'SEMUA') {
      return item.type !== 'archived';
    }
    if (activeTab === 'PRE-ORDER') {
      return item.type === 'preorder';
    }
    if (activeTab === 'READY STOCK') {
      return item.type === 'ready';
    }
    if (activeTab === 'DIARSIPKAN') {
      return item.type === 'archived';
    }
    return true;
  });

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
          Marketplace Hasil Panen
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
              KELOLA PRODUK TANI
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Marketplace{' '}
              <span className="font-serif italic font-normal text-[#d9f99d]">
                Hasil Panen
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-1">
              Etalase komoditas agritech untuk mengelola ketersediaan pasokan pre-order maupun stok panen siap kirim.
            </p>
          </div>

          {/* Add Product Button */}
          <Link
            to="/penjual/produk/tambah"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#bef264] hover:bg-[#a3e635] text-[#111827] font-extrabold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-102 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah Produk</span>
          </Link>
        </div>
      </section>

      {/* Filter Tabs and Search Bar */}
      <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2">
        {/* Left Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('SEMUA')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
              activeTab === 'SEMUA'
                ? 'bg-[#006738] text-white shadow-xs font-extrabold'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#e5e9e5]'
            }`}
          >
            SEMUA
          </button>

          <button
            onClick={() => setActiveTab('PRE-ORDER')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
              activeTab === 'PRE-ORDER'
                ? 'bg-[#006738] text-white shadow-xs font-extrabold'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#e5e9e5]'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>PRE-ORDER</span>
          </button>

          <button
            onClick={() => setActiveTab('READY STOCK')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
              activeTab === 'READY STOCK'
                ? 'bg-[#006738] text-white shadow-xs font-extrabold'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#e5e9e5]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>READY STOCK</span>
          </button>

          <button
            onClick={() => setActiveTab('DIARSIPKAN')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
              activeTab === 'DIARSIPKAN'
                ? 'bg-[#006738] text-white shadow-xs font-extrabold'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#e5e9e5]'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>DIARSIPKAN</span>
          </button>
        </div>

        {/* Right Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari komoditas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#e2e7e2] rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#006738]/30 focus:border-[#006738] shadow-2xs"
          />
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-1">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isPO = product.type === 'preorder';
            const isArchived = product.type === 'archived';

            return (
              <div
                key={product.id}
                className="bg-white rounded-[26px] border border-[#e8ece8] shadow-[0_3px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Product Image Header with Pill Badges */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Top Left: Type Badge (Ready or PO) */}
                    <div className="absolute top-3 left-3 z-10">
                      {isArchived ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-gray-900/80 text-white backdrop-blur-xs tracking-wider">
                          DIARSIPKAN
                        </span>
                      ) : isPO ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-[#4ade80] text-[#0f381e] shadow-xs tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0f381e]" />
                          PO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-[#22c55e] text-white shadow-xs tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          READY
                        </span>
                      )}
                    </div>

                    {/* Top Right: Category Badge (KOPI, SAYUR, etc.) */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#181a18]/85 text-white backdrop-blur-xs tracking-wider">
                        {product.categoryBadge}
                      </span>
                    </div>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-5 pb-3 space-y-3">
                    <div>
                      <h3 className="font-extrabold text-lg text-[#111827] leading-snug group-hover:text-[#006738] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[10px] font-bold tracking-widest text-[#6b7280] uppercase mt-1">
                        BUDIDAYA: {product.cultivation}
                      </p>
                    </div>

                    {/* Price and Stock 2-Column Row */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#f1f3f1]">
                      <div>
                        <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider block">
                          HARGA PER {product.unit.toUpperCase()}
                        </span>
                        <span className="font-black text-[#006738] text-base mt-0.5 block">
                          Rp{product.pricePerUnit.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider block">
                          {isPO ? 'ESTIMASI STOK' : 'STOK TERSEDIA'}
                        </span>
                        <span className="font-bold text-[#111827] text-sm mt-0.5 block">
                          {product.stock} {product.unit}
                        </span>
                      </div>
                    </div>

                    {/* Harvest status pill for Pre-Order products */}
                    {isPO && product.harvestStatus && (
                      <div className="mt-2 py-1.5 px-3 rounded-full bg-[#fef7ee] border border-[#fdecd5] flex items-center gap-1.5 text-[11px] text-[#9a4b08]">
                        <Sprout className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                        <span className="font-medium">
                          Panen: <strong className="font-extrabold">{product.harvestStatus}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Buttons: Edit, Arsip, Delete */}
                <div className="p-5 pt-2 flex items-center justify-between gap-2 border-t border-[#f4f6f4] mt-2">
                  <div className="flex items-center gap-2 flex-1">
                    {/* Edit Button */}
                    <button
                      onClick={() => navigate(`/penjual/produk/tambah?edit=${product.id}`)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold text-gray-700 bg-white border border-[#d6ddd6] hover:bg-[#f6f9f6] hover:border-[#006738] transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Archive / Restore Button */}
                    <button
                      onClick={() => handleToggleArchive(product.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold text-gray-700 bg-white border border-[#d6ddd6] hover:bg-[#f6f9f6] transition-all"
                    >
                      {isArchived ? (
                        <>
                          <ArchiveRestore className="w-3.5 h-3.5" />
                          <span>Pulihkan</span>
                        </>
                      ) : (
                        <>
                          <Archive className="w-3.5 h-3.5" />
                          <span>Arsip</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="p-2 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors shrink-0"
                    title="Hapus Produk"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-[#e8ece8] p-8">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">
              Tidak ada komoditas ditemukan
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian Anda atau tambahkan komoditas panen baru.
            </p>
            <Link
              to="/penjual/produk/tambah"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006738] text-white text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerMarketplacePage;
