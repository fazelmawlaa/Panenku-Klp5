import type { Product, User, Mentor } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Kopi Arabika Gayo',
    type: 'ready',
    category: 'Kopi',
    origin: 'Aceh',
    sellerName: 'Petani Kopi Gayo',
    pricePerUnit: 130000,
    unit: 'kg',
    stock: 50,
    cultivation: 'Organik',
    image: '/images/kopi-arabika.jpg',
    description: 'Kopi Arabika asli Gayo dengan cita rasa khas dan aroma yang harum.'
  },
  {
    id: '2',
    name: 'Sekam Padi',
    type: 'limbah',
    category: 'Limbah Pertanian',
    origin: 'Karawang',
    sellerName: 'Petani Padi Subur',
    pricePerUnit: 1500,
    unit: 'kg',
    stock: 500,
    image: '/images/sekam-padi.jpg',
    description: 'Sekam padi berkualitas untuk media tanam dan pupuk organik.'
  },
  {
    id: '3',
    name: 'Bawang Merah',
    type: 'preorder',
    category: 'Sayuran',
    origin: 'Brebes',
    sellerName: 'Petani Bawang Merah',
    pricePerUnit: 22000,
    unit: 'kg',
    stock: 100,
    harvestDate: '2026-11-15',
    cultivation: 'Konvensional',
    image: '/images/bawang-merah.jpg',
    description: 'Bawang merah segar pre-order untuk panen bulan November.'
  },
  {
    id: '4',
    name: 'Cabai Merah Keriting',
    type: 'ready',
    category: 'Sayuran',
    origin: 'Garut',
    sellerName: 'Petani Cabai',
    pricePerUnit: 35000,
    unit: 'kg',
    stock: 30,
    cultivation: 'Organik',
    image: '/images/cabai-merah.jpg',
    description: 'Cabai merah keriting segar dan pedas.'
  },
  {
    id: '5',
    name: 'Jerami Padi',
    type: 'limbah',
    category: 'Limbah Pertanian',
    origin: 'Subang',
    sellerName: 'Petani Padi Makmur',
    pricePerUnit: 800,
    unit: 'kg',
    stock: 1000,
    image: '/images/jerami-padi.jpg',
    description: 'Jerami padi kering untuk pakan ternak.'
  },
  {
    id: '6',
    name: 'Tomat',
    type: 'preorder',
    category: 'Sayuran',
    origin: 'Lembang',
    sellerName: 'Petani Tomat Segar',
    pricePerUnit: 12000,
    unit: 'kg',
    stock: 80,
    harvestDate: '2026-11-20',
    cultivation: 'Organik',
    image: '/images/tomat.jpg',
    description: 'Tomat organik segar pre-order.'
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
