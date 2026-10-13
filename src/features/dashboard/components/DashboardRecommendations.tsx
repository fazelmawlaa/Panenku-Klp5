import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { Product } from '@/types';

interface DashboardRecommendationsProps {
  products: Product[];
}

export const DashboardRecommendations: React.FC<DashboardRecommendationsProps> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <h2 className="text-base font-bold text-gray-900">Rekomendasi untuk Anda</h2>
        <Link
          to="/pembeli/marketplace"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider flex items-center gap-1 transition-colors"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Recommendations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/pembeli/produk/${product.id}`)}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col group"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-box')) {
                    const fallback = document.createElement('div');
                    fallback.className =
                      'fallback-box w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-700 p-2 text-center text-xs';
                    fallback.innerHTML = `<span>${product.name}</span>`;
                    parent.appendChild(fallback);
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Info Container */}
            <div className="p-3.5 bg-white">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate group-hover:text-emerald-700 transition-colors">
                {product.name}
              </h4>
              <div className="text-xs font-bold text-emerald-600 mt-1">
                Rp{product.pricePerUnit.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
