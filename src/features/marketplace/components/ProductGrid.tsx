import React from 'react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelectProduct }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center my-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-gray-800">Tidak ada produk ditemukan</h3>
        <p className="text-xs text-gray-500 max-w-sm mt-1">
          Coba ubah kata kunci pencarian atau sesuaikan filter tipe produk dan daerah asal Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onSelectProduct}
        />
      ))}
    </div>
  );
};
