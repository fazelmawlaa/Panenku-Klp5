import kopiArabikaImg from '@/assets/kopi_arabika.jpg';

export interface SellerProductItem {
  id: string;
  name: string;
  type: 'preorder' | 'ready' | 'archived';
  category: string;
  categoryBadge: string;
  cultivation: string;
  pricePerUnit: number;
  unit: string;
  stock: number;
  harvestStatus?: string;
  image: string;
  description?: string;
  paymentMethods?: {
    ewallet?: string;
    virtualAccount?: string;
    creditCard?: string;
  };
}

export const initialSellerProducts: SellerProductItem[] = [
  {
    id: 'prod-1',
    name: 'Kopi Arabika Gayo',
    type: 'ready',
    category: 'Kopi & Perkebunan',
    categoryBadge: 'KOPI',
    cultivation: 'ORGANIK',
    pricePerUnit: 130000,
    unit: 'kg',
    stock: 100,
    image: kopiArabikaImg,
    description: 'Biji kopi pilihan varietas arabika langsung dari perkebunan dataran tinggi Gayo, Aceh. Dipetik merah sempurna dengan proses pengeringan natural.',
    paymentMethods: {
      ewallet: 'DANA - 085211636085 (a.n. Fazel)',
      virtualAccount: 'Mandiri VA - 8961234567890',
      creditCard: 'BCA - 1234567890 (a.n. Fazel)',
    },
  },
  {
    id: 'prod-2',
    name: 'Bawang Merah',
    type: 'preorder',
    category: 'Sayuran',
    categoryBadge: 'SAYUR',
    cultivation: 'ORGANIK',
    pricePerUnit: 22000,
    unit: 'kg',
    stock: 500,
    harvestStatus: 'Segera',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=700&q=80',
    description: 'Bawang merah varietas Brebes bibit unggul, ditanam secara organik tanpa pestisida sintetis. Siap panen dalam beberapa hari mendatang.',
    paymentMethods: {
      ewallet: 'DANA - 085211636085 (a.n. Fazel)',
      virtualAccount: 'Mandiri VA - 8961234567890',
      creditCard: 'BCA - 1234567890 (a.n. Fazel)',
    },
  },
  {
    id: 'prod-3',
    name: 'Cabai Merah Keriting',
    type: 'ready',
    category: 'Sayuran',
    categoryBadge: 'SAYUR',
    cultivation: 'ORGANIK',
    pricePerUnit: 35000,
    unit: 'kg',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=700&q=80',
    description: 'Cabai merah keriting pedas segar, dipetik segar setiap pagi hari untuk menjamin kesegaran dan kerenyahan maksimal.',
  },
  {
    id: 'prod-4',
    name: 'Beras Pandan Wangi Premium',
    type: 'preorder',
    category: 'Padi & Beras',
    categoryBadge: 'PADI',
    cultivation: 'ORGANIK',
    pricePerUnit: 14500,
    unit: 'kg',
    stock: 600,
    harvestStatus: '15 Nov 2026',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80',
    description: 'Beras aromatik khas dengan wangi pandan alami dan tekstur pulen. Menggunakan pupuk kompos mandiri dari limbah sekam.',
  },
];
