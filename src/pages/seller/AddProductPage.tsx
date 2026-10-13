import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  Package,
  Recycle,
  UploadCloud,
  CheckCircle2,
  Calendar,
  RotateCcw,
  Plus,
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';
import farmingBg from '@/assets/farming_bg.png';
import { initialSellerProducts } from '@/data/sellerProductsStore';
import type { SellerProductItem } from '@/data/sellerProductsStore';

interface ProductTypeOption {
  key: 'preorder' | 'ready' | 'limbah';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultUnit: string;
}

const productTypeOptions: ProductTypeOption[] = [
  {
    key: 'preorder',
    title: 'Pre-Order Panen',
    description:
      'Jual hasil panen sebelum panen tiba. Pembeli memesan dan membayar di muka untuk mendapatkan komoditas segar langsung dari lahan Anda.',
    icon: Sprout,
    defaultUnit: 'Per Kilo (kg)',
  },
  {
    key: 'ready',
    title: 'Ready Stock Siap Kirim',
    description:
      'Hasil panen yang sudah selesai dipanen dan tersimpan di gudang penyimpanan Anda untuk siap dikirim langsung ke pembeli.',
    icon: Package,
    defaultUnit: 'Per Kilo (kg)',
  },
  {
    key: 'limbah',
    title: 'Sirkular Limbah Pertanian',
    description:
      'Pasok residu dan sisa hasil panen (jerami, sekam, tongkol jagung) untuk industri pupuk kompos organik, biochar, dan pakan ternak.',
    icon: Recycle,
    defaultUnit: 'Per Karung (50 kg)',
  },
];

export const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Type carousel state
  const [typeIndex, setTypeIndex] = useState(0);
  const currentType = productTypeOptions[typeIndex];

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Padi & Beras');
  const [unit, setUnit] = useState('Per Kilo (kg)');
  const [cultivation, setCultivation] = useState('Organik');
  const [price, setPrice] = useState('14500');
  const [stock, setStock] = useState('600');
  const [harvestDate, setHarvestDate] = useState('');
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

  const handlePrevType = () => {
    setTypeIndex((prev) => (prev === 0 ? productTypeOptions.length - 1 : prev - 1));
  };

  const handleNextType = () => {
    setTypeIndex((prev) => (prev === productTypeOptions.length - 1 ? 0 : prev + 1));
  };

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
    if (window.confirm('Reset seluruh input formulir?')) {
      setName('');
      setCategory('Padi & Beras');
      setUnit('Per Kilo (kg)');
      setCultivation('Organik');
      setPrice('');
      setStock('');
      setHarvestDate('');
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
      alert('Silakan masukkan nama produk terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);

    const saved = localStorage.getItem('panenku_seller_products');
    let currentList: SellerProductItem[] = initialSellerProducts;
    if (saved) {
      try {
        currentList = JSON.parse(saved);
      } catch (err) {
        currentList = initialSellerProducts;
      }
    }

    // Map category to clean badge
    let categoryBadge = 'LAINNYA';
    if (category.includes('Padi') || category.includes('Beras')) categoryBadge = 'PADI';
    else if (category.includes('Sayur')) categoryBadge = 'SAYUR';
    else if (category.includes('Kopi')) categoryBadge = 'KOPI';
    else if (category.includes('Buah')) categoryBadge = 'BUAH';
    else if (category.includes('Limbah')) categoryBadge = 'LIMBAH';

    const newProduct: SellerProductItem = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      type: currentType.key === 'preorder' ? 'preorder' : 'ready',
      category: category,
      categoryBadge: categoryBadge,
      cultivation: cultivation.toUpperCase(),
      pricePerUnit: parseInt(price.replace(/\D/g, '') || '0', 10),
      unit: unit.toLowerCase().includes('kilo') ? 'kg' : unit.toLowerCase().includes('ton') ? 'ton' : 'satuan',
      stock: parseInt(stock.replace(/\D/g, '') || '0', 10),
      harvestStatus: currentType.key === 'preorder' ? harvestDate || 'Segera' : undefined,
      image:
        imagePreview ||
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80',
      description: description.trim(),
      paymentMethods: {
        ewallet: enableEwallet ? ewalletValue : undefined,
        virtualAccount: enableVA ? vaValue : undefined,
        creditCard: enableCard ? cardValue : undefined,
      },
    };

    const updated = [newProduct, ...currentList];
    localStorage.setItem('panenku_seller_products', JSON.stringify(updated));

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/penjual/marketplace');
    }, 400);
  };

  const TypeIcon = currentType.icon;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
          Tambah Produk
        </h1>
      </div>

      {/* Hero Banner: Product Type Selection with Lush Rice Terrace Photo */}
      <section className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-[#d5ded5] shadow-[0_4px_20px_rgba(0,103,56,0.08)]">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${farmingBg})` }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032e19]/95 via-[#064225]/85 to-[#04331c]/90" />

        <div className="relative z-10 px-6 sm:px-12 py-8 sm:py-12 flex flex-col justify-between min-h-[220px]">
          {/* Top Pill Tag */}
          <div className="self-start">
            <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-emerald-100 bg-black/40 backdrop-blur-md border border-white/10">
              PILIH TIPE PRODUK
            </span>
          </div>

          {/* Center Carousel Slider */}
          <div className="flex items-center justify-between gap-4 my-2">
            {/* Left Prev Arrow */}
            <button
              type="button"
              onClick={handlePrevType}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg flex items-center justify-center transition-all hover:scale-108 shrink-0"
              aria-label="Tipe Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Type Information */}
            <div className="max-w-xl text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 border border-white/30">
                  <TypeIcon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentType.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-lg">
                {currentType.description}
              </p>
            </div>

            {/* Right Next Arrow */}
            <button
              type="button"
              onClick={handleNextType}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg flex items-center justify-center transition-all hover:scale-108 shrink-0"
              aria-label="Tipe Selanjutnya"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Pagination dots below */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {productTypeOptions.map((opt, idx) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setTypeIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === typeIndex
                    ? 'w-7 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Pilih ${opt.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Card Container */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#e8ece8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#111827] tracking-tight border-b border-[#f1f3f1] pb-4">
            Detail Informasi {currentType.title}
          </h2>

          {/* 1. Nama Produk */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700">
              Nama Produk
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Beras Pandan Wangi Premium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
            />
          </div>

          {/* 2. Kategori Hasil Tani & Satuan Unit Penjualan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Kategori Hasil Tani
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
              >
                <option value="Padi & Beras">Padi & Beras</option>
                <option value="Sayuran">Sayuran</option>
                <option value="Kopi & Perkebunan">Kopi & Perkebunan</option>
                <option value="Bumbu & Rempah">Bumbu & Rempah</option>
                <option value="Buah-buahan">Buah-buahan</option>
                <option value="Limbah Pertanian">Limbah Pertanian</option>
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
                <option value="Per Ikat">Per Ikat</option>
              </select>
            </div>
          </div>

          {/* 3. Metode Budidaya & Harga Satuan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Metode Budidaya
              </label>
              <input
                type="text"
                placeholder="Organik"
                value={cultivation}
                onChange={(e) => setCultivation(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Harga Satuan (Rp)
              </label>
              <input
                type="number"
                placeholder="14500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
              />
            </div>
          </div>

          {/* 4. Estimasi Stok Hasil Panen & Estimasi Masa Panen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Estimasi Stok Hasil Panen
              </label>
              <input
                type="number"
                placeholder="600"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Estimasi Masa Panen
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d6ddd6] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006738]/20 focus:border-[#006738] transition-all"
                />
              </div>
            </div>
          </div>

          {/* 5. Foto Produk (Upload Area Besar) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700">
              Foto Produk
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
                    Klik untuk mengganti foto produk
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-[#006738] flex items-center justify-center mx-auto shadow-xs">
                    <UploadCloud className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-gray-800">
                      Pilih berkas atau unggah foto produk
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
              placeholder="Jelaskan kualitas, asal, dan keunggulan produk Anda..."
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
            onClick={() => navigate('/penjual/marketplace')}
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

            {/* Submit / Tambah Produk Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#006738] hover:bg-[#00502c] shadow-md transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Tambah Produk'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
