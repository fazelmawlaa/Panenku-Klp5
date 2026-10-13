// Product Types
export type ProductType = 'preorder' | 'ready' | 'limbah' | 'alat';

export type OrderStatus =
  | 'Menunggu'
  | 'Dibayar'
  | 'Diproses'
  | 'Sedang Panen'
  | 'Pengiriman'
  | 'Selesai'
  | 'Ditolak';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  origin: string;
  sellerName: string;
  pricePerUnit: number;
  unit: 'kg' | 'pcs';
  stock: number;
  maxStock?: number;
  rating?: number;
  harvestDate?: string;
  cultivation?: 'Organik' | 'Konvensional';
  image: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'pembeli' | 'penjual';
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string;
  experience: string;
  rate: number;
  image: string;
}

export interface BuyerStats {
  pesananAktif: number;
  pesananSedangPanen: number;
  penghematan: number;
  petaniFavorit: number;
  totalTransaksi: number;
}

export type TransactionStatus = 'PAID' | 'SELESAI' | 'PENDING' | 'BATAL';

export interface BuyerTransaction {
  id: string;
  code: string;
  title: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  type: 'konsultasi' | 'produk';
}

