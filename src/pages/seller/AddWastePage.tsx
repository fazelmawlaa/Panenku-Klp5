import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Recycle,
  UploadCloud,
  CheckCircle2,
  RotateCcw,
  Plus,
  ArrowLeft,
  FileText
} from 'lucide-react';
import farmingBg from '@/assets/farming_bg.png';
import { initialSellerWaste } from '@/data/sellerWasteStore';
import type { SellerWasteItem } from '@/data/sellerWasteStore';

export const AddWastePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('Per Kilo (kg)');
  const [source, setSource] = useState('');
  const [stock, setStock] = useState('600');
  const [price, setPrice] = useState('1500');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Payment methods state
  const [enableEwallet, setEnableEwallet] = useState(true);
  const [ewalletValue, setEwalletValue] = useState('DANA - 08123456789 (a.n. Fazel)');

  const [enableVA, setEnableVA] = useState(true);
  const [vaValue, setVaValue] = useState('Mandiri VA - 8961234567890');

  const [enableCard, setEnableCard] = useState(true);
  const [cardValue, setCardValue] = useState('BCA - 1234567890 (a.n. Fazel)');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetForm = () => {
    if (window.confirm('Reset seluruh input formulir limbah?')) {
      setName('');
      setCategory('');
      setUnit('Per Kilo (kg)');
      setSource('');
      setStock('');
      setPrice('');
      setDescription('');
      setImagePreview(null);
      setEwalletValue('DANA - 08123456789 (a.n. Fazel)');
      setVaValue('Mandiri VA - 8961234567890');
      setCardValue('BCA - 1234567890 (a.n. Fazel)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Silakan masukkan nama produk limbah.');
      return;
    }

    setIsSubmitting(true);

    const saved = localStorage.getItem('panenku_seller_waste');
    let currentList: SellerWasteItem[] = initialSellerWaste;
    if (saved) {
      try {
        currentList = JSON.parse(saved);
      } catch (err) {
        currentList = initialSellerWaste;
      }
    }

    const newWasteItem: SellerWasteItem = {
      id: `waste-${Date.now()}`,
      name: name.trim(),
      category: category || 'Sekam & Jerami Padi',
      categoryBadge: 'LIMBAH TANI',
      source: source.trim() || 'Lahan Pertanian Mandiri',
      volume: parseInt(stock.replace(/\D/g, '') || '0', 10),
      unit: unit.toLowerCase().includes('kilo') ? 'kg' : unit.toLowerCase().includes('ton') ? 'ton' : 'karung',
      pricePerUnit: parseInt(price.replace(/\D/g, '') || '0', 10),
      image:
        imagePreview ||
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
      description: description.trim(),
      paymentMethods: {
        ewallet: enableEwallet ? ewalletValue : undefined,
        virtualAccount: enableVA ? vaValue : undefined,
        creditCard: enableCard ? cardValue : undefined,
      },
    };

    const updated = [newWasteItem, ...currentList];
    localStorage.setItem('panenku_seller_waste', JSON.stringify(updated));

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/penjual/limbah');
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
          Tambah Limbah Pertanian
        </h1>
      </div>

      {/* Hero Banner: Farming Activity Image with Dark Green Overlay */}
      <section className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-[#d5ded5] shadow-[0_4px_20px_rgba(0,103,56,0.08)]">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${farmingBg})` }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032e19]/95 via-[#064225]/85 to-[#04331c]/90" />

        <div className="relative z-10 px-6 sm:px-12 py-8 sm:py-10 flex flex-col justify-between min-h-[200px]">
          {/* Top Pill Tag */}
          <div className="self-start">
            <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-emerald-100 bg-black/40 backdrop-blur-md border border-white/10">
              TIPE PRODUK: LIMBAH TANI
            </span>
          </div>

          {/* Banner Title & Description */}
          <div className="max-w-2xl my-2 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 border border-white/30">
                <Recycle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Limbah Pertanian
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Ubah limbah pertanian seperti sekam, jerami, dan kulit kopi menjadi sumber pendapatan tambahan yang berkelanjutan melalui ekosistem sirkular.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Card Container */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#e8ece8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#111827] tracking-tight border-b border-[#f1f3f1] pb-4">
            Detail Informasi Limbah Pertanian
          </h2>

          {/* 1. Nama Produk */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700">
              Nama Produk
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Sekam Padi Mentah Berkualitas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
            />
          </div>

          {/* 2. Kategori Limbah & Satuan Unit Penjualan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Kategori Limbah
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
              >
                <option value="">Pilih kategori limbah</option>
                <option value="Sekam & Jerami Padi">Sekam & Jerami Padi</option>
                <option value="Kulit Kopi & Kakao">Kulit Kopi & Kakao</option>
                <option value="Tongkol Jagung">Tongkol Jagung</option>
                <option value="Ampas Tebu / Bagasse">Ampas Tebu / Bagasse</option>
                <option value="Residu Sayur & Daun">Residu Sayur & Daun</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Satuan Unit Penjualan
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
              >
                <option value="Per Kilo (kg)">Per Kilo (kg)</option>
                <option value="Per Ton">Per Ton</option>
                <option value="Per Karung (50 kg)">Per Karung (50 kg)</option>
                <option value="Per Pickup / Truk">Per Pickup / Truk</option>
              </select>
            </div>
          </div>

          {/* 3. Sumber Limbah (Asal) & Stok Limbah Tersedia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Sumber Limbah (Asal)
              </label>
              <input
                type="text"
                placeholder="Contoh: Penggilingan Padi / Perkebunan Kopi"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Stok Limbah Tersedia
              </label>
              <input
                type="number"
                placeholder="600"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
              />
            </div>
          </div>

          {/* 4. Harga Satuan (Rp) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700">
              Harga Satuan (Rp)
            </label>
            <input
              type="number"
              placeholder="1500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
            />
          </div>

          {/* 5. Foto Limbah (Large Upload Area) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700">
              Foto Limbah
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#cbd5e1] hover:border-[#006738] rounded-2xl p-8 sm:p-10 text-center cursor-pointer bg-[#fafcfa] hover:bg-[#f3f7f3] transition-all duration-200"
            >
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden border border-[#d6ddd6] shadow-sm mb-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold text-[#006738]">
                    Klik untuk mengganti foto limbah
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-[#006738] flex items-center justify-center mx-auto shadow-xs">
                    <UploadCloud className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-gray-800">
                      Pilih berkas atau unggah foto limbah
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Mendukung format PNG, JPG, JPEG (Max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 6. Deskripsi */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700">
              Deskripsi
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan kualitas, asal-usul, kelembaban, dan ketersediaan limbah pertanian Anda..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
            />
          </div>

          {/* 7. Metode Pembayaran yang Diterima */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-gray-700">
              Metode Pembayaran yang Diterima
            </label>

            <div className="bg-[#f9faf9] border border-[#e8ece8] rounded-2xl p-5 space-y-4">
              {/* E-Wallet */}
              <div className="space-y-1.5">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableEwallet}
                    onChange={(e) => setEnableEwallet(e.target.checked)}
                    className="w-4 h-4 text-[#006738] rounded border-gray-300 focus:ring-[#006738]"
                  />
                  <span className="text-xs font-bold text-gray-800">E-Wallet</span>
                </label>
                <input
                  type="text"
                  disabled={!enableEwallet}
                  value={ewalletValue}
                  onChange={(e) => setEwalletValue(e.target.value)}
                  placeholder="Contoh: DANA - 08123456789 (a.n. Fazel)"
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-800 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738]"
                />
              </div>

              {/* Virtual Account */}
              <div className="space-y-1.5">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableVA}
                    onChange={(e) => setEnableVA(e.target.checked)}
                    className="w-4 h-4 text-[#006738] rounded border-gray-300 focus:ring-[#006738]"
                  />
                  <span className="text-xs font-bold text-gray-800">Virtual Account</span>
                </label>
                <input
                  type="text"
                  disabled={!enableVA}
                  value={vaValue}
                  onChange={(e) => setVaValue(e.target.value)}
                  placeholder="Contoh: Mandiri VA - 8961234567890"
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-800 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738]"
                />
              </div>

              {/* Kartu Kredit/Debit */}
              <div className="space-y-1.5">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableCard}
                    onChange={(e) => setEnableCard(e.target.checked)}
                    className="w-4 h-4 text-[#006738] rounded border-gray-300 focus:ring-[#006738]"
                  />
                  <span className="text-xs font-bold text-gray-800">Kartu Kredit/Debit</span>
                </label>
                <input
                  type="text"
                  disabled={!enableCard}
                  value={cardValue}
                  onChange={(e) => setCardValue(e.target.value)}
                  placeholder="Contoh: BCA - 1234567890 (a.n. Fazel)"
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-800 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons at Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate('/penjual/limbah')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 border border-[#d6ddd6] shadow-xs transition-colors"
          >
            Kembali
          </button>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Reset Form Button */}
            <button
              type="button"
              onClick={handleResetForm}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#eab308] hover:bg-[#ca8a04] shadow-xs transition-colors"
            >
              Reset Form
            </button>

            {/* Submit / Terbitkan Limbah Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#006738] hover:bg-[#00502c] shadow-md transition-all disabled:opacity-50"
            >
              <FileText className="w-4 h-4 stroke-[2.2]" />
              <span>{isSubmitting ? 'Menerbitkan...' : 'Terbitkan Limbah'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddWastePage;
