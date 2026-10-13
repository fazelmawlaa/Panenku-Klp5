import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, Minus, Plus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types';
import { cartService } from '@/services/CartService';

interface ProductStickyBottomBarProps {
  product: Product;
}

export const ProductStickyBottomBar: React.FC<ProductStickyBottomBarProps> = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const subtotal = product.pricePerUnit * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    cartService.addItem(product, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2500);
  };

  const handleCheckout = () => {
    cartService.addItem(product, quantity);
    navigate('/pembeli/checkout', {
      state: {
        selectedItems: [{ product, qty: quantity }],
        subtotal: product.pricePerUnit * quantity,
        shippingCost: 25000,
        discount: 0,
        total: product.pricePerUnit * quantity + 25000,
      },
    });
  };

  return (
    <>
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-24 right-8 z-50 bg-[#1b4332] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>
            {quantity} {product.unit} <strong>{product.name}</strong> berhasil dimasukkan ke keranjang!
          </span>
        </div>
      )}

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl px-4 sm:px-8 py-3.5 mt-10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Quantity Stepper & Subtotal */}
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Jumlah ({product.unit})
              </span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-0.5">
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-2xs active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  disabled={quantity >= product.stock}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-2xs active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Subtotal Display */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Subtotal
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-700">
                Rp{subtotal.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Masukkan Keranjang Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30 active:scale-98 text-gray-800 text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-700" />
              <span>Masukkan Keranjang</span>
            </button>

            {/* Lanjutkan ke Checkout Button */}
            <button
              type="button"
              onClick={handleCheckout}
              className="flex-1 sm:flex-initial bg-[#1b4332] hover:bg-[#153427] active:scale-98 text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span>Lanjutkan ke Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
