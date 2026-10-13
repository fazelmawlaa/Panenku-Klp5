import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '@/services';
import { ProductDetailInfo } from '../components/ProductDetailInfo';
import { ProductReviews } from '../components/ProductReviews';
import { ProductStickyBottomBar } from '../components/ProductStickyBottomBar';
import { ChevronRight } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch product by ID or default to '2' (Cabe Calang) to match mockup preview
  const product = useMemo(() => {
    if (id) {
      const found = productService.getById(id);
      if (found) return found;
    }
    // Fallback to Cabe Calang (id '2')
    return productService.getById('2') || productService.getAll()[0];
  }, [id]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">Produk tidak ditemukan</h2>
        <Link
          to="/pembeli/marketplace"
          className="text-xs font-bold text-emerald-700 hover:underline mt-2 inline-block"
        >
          Kembali ke Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link
          to="/pembeli/marketplace"
          className="hover:text-emerald-700 transition-colors text-gray-500 font-medium"
        >
          Katalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-gray-500 font-medium">{product.category || 'Sayur'}</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Info & Details */}
      <ProductDetailInfo product={product} />

      {/* Ratings & Reviews Section */}
      <ProductReviews initialRating={product.rating ?? 5.0} />

      {/* Sticky Bottom Action Bar */}
      <ProductStickyBottomBar product={product} />
    </div>
  );
};
