export interface SellerWasteItem {
  id: string;
  name: string;
  category: string;
  categoryBadge: string;
  source: string;
  volume: number;
  unit: string;
  pricePerUnit: number;
  image: string;
  description?: string;
  paymentMethods?: {
    ewallet?: string;
    virtualAccount?: string;
    creditCard?: string;
  };
}

export const initialSellerWaste: SellerWasteItem[] = [
  {
    id: 'waste-1',
    name: 'Sekam Padi',
    category: 'Sekam & Jerami Padi',
    categoryBadge: 'LIMBAH TANI',
    source: 'Penggilingan Padi Lokal',
    volume: 200,
    unit: 'kg',
    pricePerUnit: 1500,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    description: 'Sekam padi mentah kering hasil penggilingan padi sawah, bersih dari batu dan tanah. Sangat cocok untuk media tanam, fermentasi bokashi, arang sekam, dan alas kandang unggas.',
    paymentMethods: {
      ewallet: 'DANA - 08123456789 (a.n. Fazel)',
      virtualAccount: 'Mandiri VA - 8961234567890',
      creditCard: 'BCA - 1234567890 (a.n. Fazel)',
    },
  },
];
