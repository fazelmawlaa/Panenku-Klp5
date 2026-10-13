import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Recycle,
  Star,
  Check,
  User,
  Sprout,
  Calendar,
  ImageOff,
} from 'lucide-react';
import type { Product } from '@/types';

interface ProductDetailInfoProps {
  product: Product;
}

export const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  // Type badge styling
  const renderTypeBadge = () => {
    switch (product.type) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#15803d]/90 backdrop-blur-xs shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready Stock</span>
          </span>
        );
      case 'preorder':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#d97706]/90 backdrop-blur-xs shadow-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>Pre-Order</span>
          </span>
        );
      case 'limbah':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#0e3b2b]/90 backdrop-blur-xs shadow-xs">
            <Recycle className="w-3.5 h-3.5" />
            <span>Limbah</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gray-700/90 backdrop-blur-xs shadow-xs">
            <span>{product.type}</span>
          </span>
        );
    }
  };

  const maxStock = product.maxStock || product.stock;
  const stockPercentage = Math.min(100, Math.max(10, (product.stock / maxStock) * 100));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Product Image */}
      <div className="lg:col-span-5">
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xs">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-103"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-800 p-6 text-center">
              <ImageOff className="w-12 h-12 text-emerald-400 mb-2" />
              <span className="text-sm font-bold">{product.name}</span>
            </div>
          )}

          {/* Top-Left Badge */}
          <div className="absolute top-4 left-4">{renderTypeBadge()}</div>
        </div>
      </div>

      {/* Right Column: Information & Details */}
      <div className="lg:col-span-7 space-y-4">
        {/* Category & Verification Badges */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100/70 text-emerald-900">
            {product.category || 'Sayur'}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
            <span>Terverifikasi</span>
          </span>
        </div>

        {/* Product Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {product.name}
        </h1>

        {/* Rating and Origin Location */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1 font-bold text-gray-800">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{product.rating ?? 5}</span>
            <span className="text-gray-400 font-normal">(0 ulasan)</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{product.origin}</span>
          </div>
        </div>

        {/* Box: Tentang Produk */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tentang Produk</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
            {product.description || 'cabe terbaik se aceh'}
          </p>
        </div>

        {/* Box: Harga Satuan & Stock Availability */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-4 space-y-3">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Harga Satuan
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                Rp{product.pricePerUnit.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-gray-400 font-normal">/{product.unit}</span>
            </div>
          </div>

          {/* Stock Progress Line */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-semibold">
                Tersedia {product.stock.toLocaleString('id-ID')} {product.unit}
              </span>
              <span className="text-gray-400 text-[11px]">
                {maxStock.toLocaleString('id-ID')} {product.unit}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${stockPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2x2 Info Grid: Petani, Metode, Estimasi Panen, Asal Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Card: Petani */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Petani
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 truncate block">
                {product.sellerName}
              </span>
            </div>
          </div>

          {/* Card: Metode */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Metode
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 truncate block">
                {product.cultivation || 'Organik'}
              </span>
            </div>
          </div>

          {/* Card: Estimasi Panen */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Estimasi Panen
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 truncate block">
                {product.harvestDate || (product.type === 'ready' ? 'Siap Kirim' : 'Sesuai Siklus')}
              </span>
            </div>
          </div>

          {/* Card: Asal Produk */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-red-500" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Asal Produk
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 truncate block">
                {product.origin}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
