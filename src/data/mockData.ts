import type { Product, User, Mentor, BuyerStats, BuyerTransaction } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cabai Busuk',
    type: 'limbah',
    category: 'Limbah Pertanian',
    origin: 'Aceh Jaya',
    sellerName: 'Urfan Husain',
    pricePerUnit: 10000,
    unit: 'kg',
    stock: 200,
    maxStock: 200,
    rating: 5,
    image: '/images/cabai-busuk.jpg',
    description: 'Cabai sisa panen / sortiran yang cocok untuk bahan kompos dan pupuk organik.'
  },
  {
    id: '2',
    name: 'Cabe Calang',
    type: 'preorder',
    category: 'Sayuran',
    origin: 'Aceh Jaya',
    sellerName: 'Urfan Husain',
    pricePerUnit: 20000,
    unit: 'kg',
    stock: 1000,
    maxStock: 1000,
    harvestDate: '2026-07-31',
    rating: 5,
    image: '/images/cabe-calang.jpg',
    description: 'Cabai segar kualitas unggul pesanan panen akhir Juli 2026.'
  },
  {
    id: '3',
    name: 'Kopi Arabika Gayo',
    type: 'ready',
    category: 'Kopi',
    origin: 'Banda Aceh1',
    sellerName: 'Muhammad Fazel Mawla',
    pricePerUnit: 130000,
    unit: 'kg',
    stock: 100,
    maxStock: 100,
    rating: 5,
    cultivation: 'Organik',
    image: '/images/kopi-arabika.jpg',
    description: 'Kopi Arabika asli Gayo dengan aroma kuat dan cita rasa khas.'
  },
  {
    id: '4',
    name: 'Sekam Padi',
    type: 'limbah',
    category: 'Limbah Pertanian',
    origin: 'Sukabumi, Jawa Barat',
    sellerName: 'Muhammad Fazel Mawla',
    pricePerUnit: 1500,
    unit: 'kg',
    stock: 200,
    maxStock: 200,
    rating: 5,
    image: '/images/sekam-padi.jpg',
    description: 'Sekam padi kering berkualitas tinggi untuk campuran media tanam & pakan.'
  },
  {
    id: '5',
    name: 'Bawang Merah',
    type: 'preorder',
    category: 'Sayuran',
    origin: 'Brebes',
    sellerName: 'Petani Bawang Merah',
    pricePerUnit: 22000,
    unit: 'kg',
    stock: 100,
    maxStock: 100,
    harvestDate: '2026-11-15',
    rating: 5,
    cultivation: 'Konvensional',
    image: '/images/bawang-merah.jpg',
    description: 'Bawang merah Brebes wangi dan renyah, siap panen November 2026.'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Budi Pembeli',
    email: 'budi@example.com',
    role: 'pembeli'
  },
  {
    id: '2',
    name: 'Ani Penjual',
    email: 'ani@example.com',
    role: 'penjual'
  }
];

export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Pak Harto',
    expertise: 'Budidaya Padi Organik',
    experience: '20 tahun',
    rate: 100000,
    image: '/images/mentor-1.jpg'
  },
  {
    id: '2',
    name: 'Bu Siti',
    expertise: 'Budidaya Sayuran Hidroponik',
    experience: '15 tahun',
    rate: 120000,
    image: '/images/mentor-2.jpg'
  },
  {
    id: '3',
    name: 'Pak Ahmad',
    expertise: 'Budidaya Kopi Arabika',
    experience: '25 tahun',
    rate: 150000,
    image: '/images/mentor-3.jpg'
  }
];

export const mockBuyerStats: BuyerStats = {
  pesananAktif: 7,
  pesananSedangPanen: 1,
  penghematan: 80750,
  petaniFavorit: 0,
  totalTransaksi: 13,
};

export const mockBuyerTransactions: BuyerTransaction[] = [
  {
    id: '1',
    code: 'SES-957-5075',
    title: 'Konsultasi: andrian',
    date: '16 Jul 2026 10:00',
    amount: 75000,
    status: 'PAID',
    type: 'konsultasi',
  },
  {
    id: '2',
    code: 'SES-325-3967',
    title: 'Konsultasi: Muhammad Fazel Mawla',
    date: '14 Jul 2026 10:00',
    amount: 75000,
    status: 'PAID',
    type: 'konsultasi',
  },
  {
    id: '3',
    code: 'ORD-5127',
    title: 'Sekam Padi',
    date: '14 Jul 2026',
    amount: 19500,
    status: 'SELESAI',
    type: 'produk',
  },
  {
    id: '4',
    code: 'ORD-11613',
    title: 'Sekam Padi',
    date: '14 Jul 2026',
    amount: 19500,
    status: 'SELESAI',
    type: 'produk',
  },
];

