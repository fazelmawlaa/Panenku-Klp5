import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShoppingBag,
  Check,
  CheckCircle2,
  AlertCircle,
  Truck,
} from 'lucide-react';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { cartService } from '@/services/CartService';
import type { CartItem } from '@/types';
import cabaiBusukImg from '@/assets/cabai_busuk.jpg';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  const shippingCost = 25000; // Fixed shipping cost matching reference (Rp25.000)

  // Load items on mount
  useEffect(() => {
    const loaded = cartService.getItems();
    setItems(loaded);
    // Default: select all items
    setSelectedItemIds(loaded.map((i) => i.product.id));
  }, []);

  const handleUpdateQty = (productId: string, newQty: number) => {
    const updated = cartService.updateQty(productId, newQty);
    setItems([...updated]);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cartService.removeItem(productId);
    setItems([...updated]);
    setSelectedItemIds((prev) => prev.filter((id) => id !== productId));
  };

  const toggleSelectItem = (productId: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItemIds.length === items.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(items.map((i) => i.product.id));
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoSuccess(null);

    const clean = promoCode.trim().toUpperCase();
    if (!clean) {
      setPromoError('Masukkan kode promo terlebih dahulu');
      return;
    }

    if (clean === 'PANENHEMAT' || clean === 'PANENKU10' || clean === 'DISKON') {
      const discount = 10000;
      setPromoDiscount(discount);
      setAppliedPromo(clean);
      setPromoSuccess('Promo berhasil digunakan! Hemat Rp10.000');
    } else {
      setPromoError('Kode promo tidak valid atau telah berakhir');
    }
  };

  // Calculations for selected items
  const selectedItems = items.filter((item) =>
    selectedItemIds.includes(item.product.id)
  );

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.pricePerUnit * item.qty,
    0
  );

  const currentShipping = selectedItems.length > 0 ? shippingCost : 0;
  const total = Math.max(0, subtotal + currentShipping - promoDiscount);

  const formatRupiah = (num: number) => {
    return 'Rp' + num.toLocaleString('id-ID');
  };

  const handleProceedCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Silakan pilih minimal satu barang untuk checkout.');
      return;
    }
    navigate('/pembeli/checkout', {
      state: {
        selectedItems,
        subtotal,
        shippingCost: currentShipping,
        discount: promoDiscount,
        total,
      },
    });
  };

  // Quick helper to add another test item to show full-row scrolling
  const handleAddSampleItem = () => {
    const newItem = {
      id: 'panen-' + Date.now(),
      name: 'Tomat Segar Organik',
      type: 'ready' as const,
      category: 'Sayuran Segar',
      origin: 'Bener Meriah, Aceh',
      sellerName: 'Kelompok Tani Berkah',
      pricePerUnit: 12000,
      unit: 'kg' as const,
      stock: 30,
      image: cabaiBusukImg,
      description: 'Tomat segar organik siap panen langsung dari kebun.',
    };
    const updated = cartService.addItem(newItem, 2);
    setItems([...updated]);
    setSelectedItemIds((prev) => [...prev, newItem.id]);
  };

  return (
    <div className="w-full pb-32">
      {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              Keranjang Belanja
            </h1>
            <p className="mt-1 text-sm text-neutral-500 font-medium">
              Kelola pesanan hasil tani &amp; limbah sirkular Anda sebelum checkout.
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={handleAddSampleItem}
              className="w-fit text-xs font-bold text-[#007a3d] hover:text-[#005a2d] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 px-4 py-2 rounded-full transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Contoh Komoditas Lain</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-neutral-200 shadow-sm max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#007a3d] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-neutral-900 mb-2">
              Keranjang Anda Masih Kosong
            </h2>
            <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">
              Belum ada hasil panen atau kebutuhan tani yang dimasukkan ke dalam keranjang.
            </p>
            <Link
              to="/pembeli/marketplace"
              className="inline-flex items-center gap-2 bg-[#007a3d] hover:bg-[#006633] text-white font-bold text-sm px-6 py-3 rounded-full transition shadow-md"
            >
              <span>Jelajahi Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Full-width Cart Items List (Each fills the row) */
          <div className="space-y-4 sm:space-y-6">
            {items.map((item) => {
              const isSelected = selectedItemIds.includes(item.product.id);
              const itemTotal = item.product.pricePerUnit * item.qty;

              return (
                <div
                  key={item.product.id}
                  className={`w-full bg-white rounded-3xl p-5 sm:p-7 shadow-xs border transition-all duration-200 ${
                    isSelected
                      ? 'border-neutral-200/90 shadow-sm'
                      : 'border-neutral-200/50 opacity-80'
                  }`}
                >
                  {/* Top Header Badge & Item Count */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      {/* Checkbox Selector */}
                      <button
                        type="button"
                        onClick={() => toggleSelectItem(item.product.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#007a3d] border-[#007a3d] text-white'
                            : 'border-neutral-300 hover:border-neutral-400 bg-white'
                        }`}
                        aria-label="Pilih barang"
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      {/* Category Pill Tag */}
                      <span className="text-[11px] font-bold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                        {item.product.category || 'Komoditas Pertanian'}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-neutral-400">
                      {item.qty} Item
                    </span>
                  </div>

                  {/* Main Product Row - Stretching full row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
                    {/* Left Details: Image & Info */}
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      {/* Thumbnail Image */}
                      <img
                        src={item.product.image || cabaiBusukImg}
                        alt={item.product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-neutral-100 shadow-xs"
                      />

                      {/* Product Descriptions */}
                      <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight truncate">
                          {item.product.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-0.5 truncate">
                          {item.product.sellerName} • {item.product.origin}
                        </p>
                        <p className="text-sm sm:text-base font-extrabold text-[#007a3d] mt-1.5">
                          {formatRupiah(item.product.pricePerUnit)}{' '}
                          <span className="text-xs text-neutral-500 font-normal">
                            / {item.product.unit || 'kg'}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right Controls: Quantity [-] [4] [+], Price & Trash */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 sm:gap-8 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100">
                      {/* Quantity Controller Pill */}
                      <div className="flex items-center gap-2 bg-[#f8f9fa] border border-neutral-200 rounded-full px-2 py-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.product.id, item.qty - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition shadow-xs cursor-pointer"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="w-8 sm:w-10 text-center text-sm sm:text-base font-black text-neutral-900">
                          {item.qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.product.id, item.qty + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition shadow-xs cursor-pointer"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total Subtotal */}
                      <div className="text-right min-w-[90px] sm:min-w-[110px]">
                        <span className="text-base sm:text-lg font-black text-neutral-900 tracking-tight">
                          {formatRupiah(itemTotal)}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="p-2 rounded-full text-neutral-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Hapus barang"
                        aria-label="Hapus barang"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {/* 
        STICKY FULL-WIDTH BOTTOM BAR ("memanjang kesamping dibagian bawahnya dan itu tetap saat di scroll kebawah atau ke atas")
      */}
      {items.length > 0 && (
        <aside
          aria-label="Ringkasan Belanja dan Checkout"
          className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 shadow-2xl py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-[1380px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Left Controls: Select All & Promo Code */}
            <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-start gap-4 sm:gap-6">
              {/* Select All Checkbox */}
              <button
                type="button"
                onClick={toggleSelectAll}
                className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-neutral-700 hover:text-neutral-900 cursor-pointer"
              >
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                    selectedItemIds.length === items.length && items.length > 0
                      ? 'bg-[#007a3d] border-[#007a3d] text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {selectedItemIds.length === items.length && items.length > 0 && (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                </span>
                <span>Pilih Semua ({items.length})</span>
              </button>

              {/* Promo Code Form */}
              <form
                onSubmit={handleApplyPromo}
                className="flex items-center gap-1.5 bg-[#f8f9fa] border border-[#e5e7eb] rounded-full p-1 pl-3.5 max-w-xs focus-within:border-[#007a3d]"
              >
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Kode promo (PANENHEMAT)"
                  className="bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none w-36 sm:w-44"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1 transition shadow-2xs cursor-pointer shrink-0"
                >
                  <Tag className="w-3 h-3 text-[#007a3d]" />
                  <span>Pakai</span>
                </button>
              </form>
            </div>

            {/* Right Controls: Subtotal, Ongkir, Total Price, & Checkout CTA */}
            <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-8">
              {/* Price Breakdown Details */}
              <div className="flex flex-col text-left lg:text-right">
                <div className="flex items-center gap-3 text-[11px] sm:text-xs text-neutral-500 font-medium">
                  <span>Subtotal: {formatRupiah(subtotal)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-neutral-400" />
                    Ongkir: {formatRupiah(currentShipping)}
                  </span>
                  {promoDiscount > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">
                        Hemat: -{formatRupiah(promoDiscount)}
                      </span>
                    </>
                  )}
                </div>

                {/* Big Grand Total */}
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xs sm:text-sm font-bold text-neutral-600">
                    Total Harga:
                  </span>
                  <span className="text-lg sm:text-2xl font-black text-[#007a3d] tracking-tight">
                    {formatRupiah(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedCheckout}
                disabled={selectedItems.length === 0}
                className="bg-[#007a3d] hover:bg-[#006633] active:scale-95 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm px-7 sm:px-9 py-3 sm:py-3.5 rounded-full shadow-lg shadow-[#007a3d]/25 transition-all transform hover:scale-102 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Lanjut ke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feedback messages */}
          {(promoSuccess || promoError) && (
            <div className="max-w-[1380px] mx-auto mt-2 text-center text-xs">
              {promoSuccess && (
                <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {promoSuccess}
                </span>
              )}
              {promoError && (
                <span className="text-red-600 font-bold inline-flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {promoError}
                </span>
              )}
            </div>
          )}
        </aside>
      )}
    </div>
  );
};

export default CartPage;
