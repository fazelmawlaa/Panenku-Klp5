import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Truck,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  Building2,
  QrCode,
  Wallet,
} from 'lucide-react';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { cartService } from '@/services/CartService';
import { orderService } from '@/services';
import type { CartItem, Order } from '@/types';
import cabaiBusukImg from '@/assets/cabai_busuk.jpg';

export const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from CartPage or fallback to current cart
  const state = location.state as {
    selectedItems?: CartItem[];
    subtotal?: number;
    shippingCost?: number;
    discount?: number;
    total?: number;
  } | null;

  const initialItems: CartItem[] =
    state?.selectedItems && state.selectedItems.length > 0
      ? state.selectedItems
      : cartService.getItems();

  const [items] = useState<CartItem[]>(initialItems);
  const [shippingMethod, setShippingMethod] = useState<'reguler' | 'dingin' | 'ekspres'>('reguler');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'transfer' | 'escrow'>('qris');
  const [recipientName, setRecipientName] = useState('Muhammad Fazel');
  const [phoneNumber, setPhoneNumber] = useState('081269001234');
  const [address, setAddress] = useState('Jl. Teuku Nyak Arief No. 45, Syiah Kuala');
  const [city, setCity] = useState('Banda Aceh, Aceh');
  const [postalCode, setPostalCode] = useState('23111');
  const [notes, setNotes] = useState('Tolong packing rapat dengan ventilasi untuk cabai');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.pricePerUnit * item.qty,
    0
  );

  const shippingCost =
    shippingMethod === 'dingin' ? 40000 : shippingMethod === 'ekspres' ? 35000 : 25000;
  const discount = state?.discount || 0;
  const total = Math.max(0, subtotal + shippingCost - discount);

  const formatRupiah = (num: number) => {
    return 'Rp' + num.toLocaleString('id-ID');
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Tidak ada barang untuk di-checkout.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: 'ORD-' + Date.now(),
        buyerId: 'user-fazel',
        buyerName: recipientName,
        items,
        total,
        status: 'Dibayar',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      orderService.create(newOrder);

      // Remove checked out items from cart
      items.forEach((item) => {
        cartService.removeItem(item.product.id);
      });

      setIsSubmitting(false);
      setOrderSuccess(newOrder);
    }, 900);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/90 shadow-sm text-center w-full">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#007a3d] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Pesanan Terkonfirmasi
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-4 tracking-tight">
            Terima Kasih, Pesanan Berhasil!
          </h1>
          <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">
            Nomor Pesanan:{' '}
            <span className="font-mono font-bold text-neutral-800">{orderSuccess.id}</span>.
            Penjual mitra Panenku akan segera memproses dan menyiapkan hasil tani Anda.
          </p>

          <div className="bg-[#f8f9fa] rounded-2xl p-5 my-6 text-left border border-neutral-200/80">
            <div className="flex justify-between text-xs sm:text-sm text-neutral-600 mb-2">
              <span>Penerima:</span>
              <span className="font-bold text-neutral-900">{recipientName}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-neutral-600 mb-2">
              <span>Tujuan:</span>
              <span className="font-semibold text-neutral-900 text-right max-w-xs">{address}, {city}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-neutral-600 mb-2">
              <span>Total Pembayaran:</span>
              <span className="font-black text-[#007a3d]">{formatRupiah(orderSuccess.total)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-neutral-600">
              <span>Metode:</span>
              <span className="font-bold text-neutral-800 uppercase">
                {paymentMethod === 'qris'
                  ? 'QRIS Panenku'
                  : paymentMethod === 'transfer'
                  ? 'Transfer Bank'
                  : 'Saldo Escrow Panenku'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/pembeli/keranjang"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition text-center"
            >
              Kembali ke Keranjang
            </Link>
            <Link
              to="/pembeli/dasbor"
              className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-bold text-white bg-[#007a3d] hover:bg-[#006633] transition shadow-md shadow-[#007a3d]/25 text-center"
            >
              Lihat di Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-32">
      {/* Navigation back and Title */}
      <div className="mb-8">
        <Link
          to="/pembeli/keranjang"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 mb-3 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Keranjang Belanja</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Checkout Pesanan
          </h1>
          <p className="mt-1 text-sm text-neutral-500 font-medium">
            Lengkapi data pengiriman dan pilih metode pembayaran resmi Panenku.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-neutral-200 max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h2 className="text-lg font-black text-neutral-800">Tidak ada barang yang siap di-checkout</h2>
            <Link
              to="/pembeli/keranjang"
              className="mt-4 inline-block bg-[#007a3d] text-white text-xs font-bold px-6 py-2.5 rounded-full"
            >
              Buka Keranjang
            </Link>
          </div>
        ) : (
          <form onSubmit={handleCreateOrder} className="space-y-6">
            {/* 1. Alamat Pengiriman (Full Width Row) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-neutral-100">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#007a3d] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                  Alamat Pengiriman
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Contoh: Muhammad Fazel"
                    className="w-full bg-[#f8f9fa] border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#007a3d] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Nomor WhatsApp / Telepon
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Contoh: 081269001234"
                    className="w-full bg-[#f8f9fa] border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#007a3d] focus:bg-white transition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama jalan, nomor rumah, RT/RW, patokan"
                    className="w-full bg-[#f8f9fa] border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#007a3d] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Contoh: Aceh Jaya / Banda Aceh"
                    className="w-full bg-[#f8f9fa] border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#007a3d] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Contoh: 23111"
                    className="w-full bg-[#f8f9fa] border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#007a3d] focus:bg-white transition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Catatan untuk Penjual / Kurir
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instruksi penanganan khusus komoditas tani"
                    className="w-full bg-[#f8f9fa] border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#007a3d] focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* 2. Daftar Barang Pesanan (Full Width Row) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#007a3d] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                    Rincian Komoditas Dipesan
                  </h2>
                </div>
                <span className="text-xs font-bold text-neutral-500">
                  {items.length} Barang
                </span>
              </div>

              <div className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image || cabaiBusukImg}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover shrink-0 border border-neutral-100"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                          {item.product.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-neutral-900">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-neutral-500">
                          {item.product.sellerName} • {item.product.origin}
                        </p>
                        <p className="text-xs font-bold text-[#007a3d] mt-0.5">
                          {formatRupiah(item.product.pricePerUnit)} / {item.product.unit} × {item.qty}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm sm:text-base font-black text-neutral-900">
                        {formatRupiah(item.product.pricePerUnit * item.qty)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Kurir Pengiriman & Pembayaran (Full Width Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Opsi Pengiriman */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs">
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-neutral-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#007a3d] flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                    Opsi Logistik
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'reguler' as const,
                      title: 'Panenku Reguler (Aceh & Sekitarnya)',
                      desc: 'Estimasi 1-2 hari kerja • Standar komoditas segar',
                      cost: 25000,
                    },
                    {
                      id: 'dingin' as const,
                      title: 'Armada Dingin Terpadu (Cold Chain)',
                      desc: 'Dilengkapi pendingin suhu terjaga khusus cabai & sayur',
                      cost: 40000,
                    },
                    {
                      id: 'ekspres' as const,
                      title: 'Same Day Express Tani',
                      desc: 'Tiba di hari yang sama untuk wilayah Banda Aceh & Aceh Besar',
                      cost: 35000,
                    },
                  ].map((courier) => (
                    <label
                      key={courier.id}
                      className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition ${
                        shippingMethod === courier.id
                          ? 'border-[#007a3d] bg-emerald-50/40 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="courier"
                          value={courier.id}
                          checked={shippingMethod === courier.id}
                          onChange={() => setShippingMethod(courier.id)}
                          className="mt-1 text-[#007a3d] focus:ring-[#007a3d]"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-neutral-900">
                            {courier.title}
                          </p>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            {courier.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-[#007a3d] shrink-0 ml-2">
                        {formatRupiah(courier.cost)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Opsi Pembayaran */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs">
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-neutral-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#007a3d] flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                    Metode Pembayaran
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'qris' as const,
                      icon: QrCode,
                      title: 'QRIS Realtime (BCA, Mandiri, BSI, Gopay)',
                      desc: 'Scan cepat otomatis terverifikasi',
                    },
                    {
                      id: 'transfer' as const,
                      icon: Building2,
                      title: 'Transfer Virtual Account BSI / Mandiri',
                      desc: 'Konfirmasi instan tanpa upload struk manual',
                    },
                    {
                      id: 'escrow' as const,
                      icon: Wallet,
                      title: 'Rekening Bersama Escrow Panenku',
                      desc: 'Dana aman di sistem hingga barang diterima & diverifikasi',
                    },
                  ].map((pay) => {
                    const Icon = pay.icon;
                    return (
                      <label
                        key={pay.id}
                        className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                          paymentMethod === pay.id
                            ? 'border-[#007a3d] bg-emerald-50/40 shadow-xs'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={pay.id}
                          checked={paymentMethod === pay.id}
                          onChange={() => setPaymentMethod(pay.id)}
                          className="mt-1 text-[#007a3d] focus:ring-[#007a3d]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-[#007a3d]" />
                            <p className="text-xs sm:text-sm font-bold text-neutral-900">
                              {pay.title}
                            </p>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            {pay.desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#007a3d] shrink-0" />
                  <span>
                    Transaksi dilindungi sistem Garansi Sirkular Panenku.
                  </span>
                </div>
              </div>
            </div>

            {/* STICKY BOTTOM BAR FOR CHECKOUT PAGE TOO ("memanjang kesamping dibagian bawahnya dan itu tetap saat di scroll") */}
            <aside
              aria-label="Konfirmasi Pembayaran dan Checkout"
              className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 shadow-2xl py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-600">
                  <span className="font-bold text-neutral-800">Alamat:</span>
                  <span className="truncate max-w-xs sm:max-w-md text-neutral-500">
                    {address}, {city}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full sm:w-auto">
                  <div className="flex flex-col text-left sm:text-right">
                    <span className="text-[11px] text-neutral-500">
                      Total Tagihan ({items.length} Barang):
                    </span>
                    <span className="text-lg sm:text-2xl font-black text-[#007a3d] tracking-tight">
                      {formatRupiah(total)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#007a3d] hover:bg-[#006633] active:scale-95 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm px-8 sm:px-10 py-3.5 rounded-full shadow-lg shadow-[#007a3d]/25 transition-all transform hover:scale-102 flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>{isSubmitting ? 'Memproses Pesanan...' : 'Bayar Sekarang'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </aside>
          </form>
        )}
      </div>
    );
};

export default CheckoutPage;
