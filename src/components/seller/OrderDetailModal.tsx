import React from 'react';
import { X, CheckCircle2, Clock, AlertCircle, Package, User, Phone, MapPin, Receipt } from 'lucide-react';

export interface SellerOrder {
  id: string;
  buyer: string;
  product: string;
  qty: string;
  total: string;
  status: 'PAID' | 'SELESAI' | 'MENUNGGU' | 'DIBAYAR' | 'DITERIMA';
  date?: string;
  category?: 'Konsultasi' | 'Limbah' | 'Hasil Panen';
}

interface OrderDetailModalProps {
  order: SellerOrder | null;
  onClose: () => void;
  onUpdateStatus?: (orderId: string, newStatus: SellerOrder['status']) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#e8ece8]">
        {/* Header */}
        <div className="p-6 bg-[#f8faf8] border-b border-[#e8ece8] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-gray-900">{order.id}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {order.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Detail Transaksi Penjualan PANENKU</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm">
          {/* Buyer information */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Informasi Pembeli
            </h4>
            <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-[#eaefea] space-y-1.5">
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <User className="w-4 h-4 text-emerald-600" />
                <span>{order.buyer}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Kec. Syiah Kuala, Banda Aceh, Aceh</span>
              </div>
            </div>
          </div>

          {/* Item details */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Produk & Rincian
            </h4>
            <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-[#eaefea] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{order.product}</p>
                  <p className="text-xs text-gray-500">Jumlah: {order.qty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-emerald-700 text-base">{order.total}</p>
                <span className="text-[10px] text-gray-400">Termasuk pajak & biaya admin</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                if (onUpdateStatus) onUpdateStatus(order.id, 'SELESAI');
                onClose();
              }}
              className="flex-1 bg-[#006738] hover:bg-[#00522c] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Tandai Selesai</span>
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
