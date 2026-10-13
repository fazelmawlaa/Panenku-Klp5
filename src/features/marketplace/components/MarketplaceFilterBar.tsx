import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Check, X, Sprout } from 'lucide-react';
import type { ProductType } from '@/types';
import type { ProductFilterCriteria } from '@/services/ProductService';

interface MarketplaceFilterBarProps {
  totalCount: number;
  filteredCount: number;
  onFilterChange: (filters: ProductFilterCriteria) => void;
  availableOrigins: string[];
}

export const MarketplaceFilterBar: React.FC<MarketplaceFilterBarProps> = ({
  totalCount,
  filteredCount,
  onFilterChange,
  availableOrigins,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<ProductFilterCriteria['sortBy'] | 'default'>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplyFilters = (
    overrideQuery?: string,
    overrideType?: ProductType | 'all',
    overrideOrigin?: string,
    overrideSort?: ProductFilterCriteria['sortBy'] | 'default'
  ) => {
    const q = overrideQuery !== undefined ? overrideQuery : searchInput;
    const t = overrideType !== undefined ? overrideType : selectedType;
    const o = overrideOrigin !== undefined ? overrideOrigin : selectedOrigin;
    const s = overrideSort !== undefined ? overrideSort : selectedSort;

    onFilterChange({
      query: q,
      type: t,
      origin: o,
      sortBy: s === 'default' ? undefined : s,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleApplyFilters();
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSelectedType('all');
    setSelectedOrigin('all');
    setSelectedSort('default');
    onFilterChange({
      query: '',
      type: 'all',
      origin: 'all',
      sortBy: undefined,
    });
  };

  const hasActiveFilters =
    searchInput !== '' ||
    selectedType !== 'all' ||
    selectedOrigin !== 'all' ||
    selectedSort !== 'default';

  return (
    <div className="space-y-3 mb-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Main Search Input Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-xs p-1.5 pl-4 flex items-center gap-2 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100/50"
        >
          <div className="text-gray-400 shrink-0">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              handleApplyFilters(e.target.value);
            }}
            placeholder="Cari hasil panen segar, limbah tani..."
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none py-2 px-2"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                handleApplyFilters('');
              }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="bg-[#529b53] hover:bg-[#438344] active:bg-[#396e3a] text-white text-xs font-bold px-8 py-3 rounded-xl transition-all tracking-wider uppercase shadow-xs shrink-0 cursor-pointer"
          >
            Cari
          </button>
        </form>

        {/* Filter Dropdown Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full sm:w-auto min-h-[50px] bg-white border rounded-2xl px-5 py-3 flex items-center justify-between gap-3 text-xs font-semibold transition-all shadow-xs cursor-pointer ${
              isFilterOpen || hasActiveFilters
                ? 'border-emerald-500 text-emerald-800 bg-emerald-50/20'
                : 'border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <span>Filter</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isFilterOpen ? 'rotate-180 text-emerald-600' : ''
              }`}
            />
          </button>

          {/* Filter Dropdown Popover */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Filter Produk
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Reset Semua
                  </button>
                )}
              </div>

              {/* Filter By Tipe Produk */}
              <div className="mt-3">
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Tipe Produk
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Semua Tipe', value: 'all' },
                    { label: 'Ready Stock', value: 'ready' },
                    { label: 'Pre-Order', value: 'preorder' },
                    { label: 'Limbah', value: 'limbah' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        const newType = item.value as ProductType | 'all';
                        setSelectedType(newType);
                        handleApplyFilters(undefined, newType);
                      }}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                        selectedType === item.value
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {selectedType === item.value && (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter By Urutan / Sorting */}
              <div className="mt-4">
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Urutkan Berdasarkan
                </label>
                <div className="space-y-1">
                  {[
                    { label: 'Standar', value: 'default' },
                    { label: 'Nama (A-Z)', value: 'name-asc' },
                    { label: 'Harga Terendah', value: 'price-asc' },
                    { label: 'Harga Tertinggi', value: 'price-desc' },
                    { label: 'Stok Terbanyak', value: 'stock-desc' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        const newSort = item.value as ProductFilterCriteria['sortBy'] | 'default';
                        setSelectedSort(newSort);
                        handleApplyFilters(undefined, undefined, undefined, newSort);
                      }}
                      className={`w-full text-xs px-2.5 py-1.5 rounded-lg text-left flex items-center justify-between transition-all ${
                        selectedSort === item.value
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {selectedSort === item.value && (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter By Asal Daerah */}
              {availableOrigins.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                    Asal Daerah
                  </label>
                  <select
                    value={selectedOrigin}
                    onChange={(e) => {
                      const newOrigin = e.target.value;
                      setSelectedOrigin(newOrigin);
                      handleApplyFilters(undefined, undefined, newOrigin);
                    }}
                    className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 bg-white text-gray-700 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="all">Semua Wilayah</option>
                    {availableOrigins.map((orig) => (
                      <option key={orig} value={orig}>
                        {orig}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product count display matching screenshot: "Menampilkan 5 dari 5 produk" */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 pl-1">
        <Sprout className="w-3.5 h-3.5 text-amber-600" />
        <span>
          Menampilkan <strong className="text-gray-700">{filteredCount}</strong> dari{' '}
          <strong className="text-gray-700">{totalCount}</strong> produk
        </span>
      </div>
    </div>
  );
};
