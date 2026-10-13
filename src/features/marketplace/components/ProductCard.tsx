import React, { useState } from 'react';
import { MapPin, CheckCircle2, Clock, Recycle, Star, ImageOff, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { cartService } from '@/services/CartService';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [imageError, setImageError] = useState(false);

  // Badge configuration based on ProductType
  const renderTypeBadge = () => {
    switch (product.type) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-[#15803d]/90 backdrop-blur-xs shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
            <span>Ready Stock</span>
          </span>
        );
      case 'preorder':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-[#d97706]/90 backdrop-blur-xs shadow-xs">
            <Clock className="w-3 h-3" />
            <span>Pre-Order</span>
          </span>
        );
      case 'limbah':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-[#0e3b2b]/90 backdrop-blur-xs shadow-xs">
            <Recycle className="w-3 h-3" />
            <span>Limbah</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gray-700/90 backdrop-blur-xs shadow-xs">
            <span>{product.type}</span>
          </span>
        );
    }
  };

  // Calculate percentage of available stock for progress bar
  const maxStock = product.maxStock || product.stock;
  const stockPercentage = Math.min(100, Math.max(10, (product.stock / maxStock) * 100));

  return (
    <div
      onClick={() => onClick?.(product)}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer group"
    >
      {/* Product Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50/40 text-emerald-800 p-4 text-center">
            <ImageOff className="w-8 h-8 text-emerald-400 mb-1" />
            <span className="text-xs font-semibold">{product.name}</span>
            <span className="text-[10px] text-gray-400 mt-0.5">{product.image}</span>
          </div>
        )}

        {/* Top-Left: Type Badge (Ready Stock / Pre-Order / Limbah) */}
        <div className="absolute top-3 left-3">{renderTypeBadge()}</div>

        {/* Top-Right: Rating Badge */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-amber-300 bg-black/45 backdrop-blur-xs shadow-xs">
          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
          <span>{product.rating ?? 5}</span>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        {/* Title, Location & Seller */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{product.origin}</span>
          </div>

          <p className="text-xs text-gray-500 truncate">
            oleh <span className="font-medium text-gray-700">{product.sellerName}</span>
          </p>
        </div>

        {/* Stock Availability Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-emerald-600 font-semibold">
              Tersedia {product.stock.toLocaleString('id-ID')} {product.unit}
            </span>
            <span className="text-gray-400 text-[11px]">
              {maxStock.toLocaleString('id-ID')} {product.unit}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
        </div>

        {/* Price and Pre-Order Harvest Date */}
        <div className="flex items-end justify-between pt-1 border-t border-gray-50">
          <div>
            <div className="text-lg font-extrabold text-gray-900 leading-none">
              Rp{product.pricePerUnit.toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-gray-400 font-normal">per {product.unit}</span>
          </div>

          {/* Action & Harvest Date */}
          <div className="flex items-center gap-1.5">
            {product.type === 'preorder' && product.harvestDate && (
              <span className="text-[10px] font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2 py-0.5 shadow-2xs">
                {product.harvestDate}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cartService.addItem(product, 1);
              }}
              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-[#1b4332] text-emerald-700 hover:text-white transition-all shadow-2xs cursor-pointer flex items-center justify-center active:scale-95"
              title="Tambah ke Keranjang"
              aria-label="Tambah ke Keranjang"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
