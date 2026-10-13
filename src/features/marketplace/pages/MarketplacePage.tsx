import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '@/services';
import type { Product } from '@/types';
import type { ProductFilterCriteria } from '@/services/ProductService';
import { MarketplaceFilterBar } from '../components/MarketplaceFilterBar';
import { ProductGrid } from '../components/ProductGrid';

export const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();

  const [filterCriteria, setFilterCriteria] = useState<ProductFilterCriteria>({
    query: '',
    type: 'all',
    origin: 'all',
    sortBy: undefined,
  });

  // Load all products and origins using the OOP ProductService
  const allProducts = useMemo(() => productService.getAll(), []);
  const availableOrigins = useMemo(() => productService.getUniqueOrigins(), []);

  // Filter products using ProductService.filter()
  const filteredProducts = useMemo(() => {
    return productService.filter(filterCriteria);
  }, [filterCriteria]);

  const handleProductClick = (product: Product) => {
    navigate(`/pembeli/produk/${product.id}`);
  };

  return (
    <div className="w-full">
      {/* Search and Filters Section */}
      <MarketplaceFilterBar
        totalCount={allProducts.length}
        filteredCount={filteredProducts.length}
        availableOrigins={availableOrigins}
        onFilterChange={setFilterCriteria}
      />

      {/* Products Grid Section */}
      <ProductGrid
        products={filteredProducts}
        onSelectProduct={handleProductClick}
      />
    </div>
  );
};
