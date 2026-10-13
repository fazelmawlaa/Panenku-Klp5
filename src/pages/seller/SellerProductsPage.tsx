import React, { useState } from 'react';
import { Plus, Search, Tag, Edit3, Trash2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

export const SellerProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Hasil Panen', 'Limbah Pertanian', 'Pre-Order'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Marketplace Panen & Produk
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Daftar hasil bumi dan komoditas pertanian yang sedang Anda tawarkan ke pasar.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#006738] hover:bg-[#00522c] rounded-xl shadow-xs transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e8ece8]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari komoditas atau kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#f8faf8] border border-[#e2e8e2] rounded-xl text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#006738]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#006738] text-white'
                  : 'bg-[#f4f7f4] text-gray-600 hover:bg-gray-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-[#e8ece8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {product.type === 'preorder' ? 'Pre-Order' : product.type === 'limbah' ? 'Sirkular Limbah' : 'Siap Kirim'}
                </span>
                <span className="text-xs font-extrabold text-[#006738]">
                  Stok: {product.stock} {product.unit}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-gray-900 mt-3">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {product.description || 'Komoditas pertanian segar berkualitas dari petani lokal.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#f0f3f0] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Harga Satuan</span>
                <span className="font-extrabold text-[#111827] text-sm">
                  Rp{product.pricePerUnit.toLocaleString('id-ID')} / {product.unit}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  title="Ubah Produk"
                  className="p-1.5 text-gray-500 hover:text-[#006738] hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  title="Hapus Produk"
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerProductsPage;
