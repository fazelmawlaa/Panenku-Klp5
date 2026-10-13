import { createBrowserRouter, Navigate } from 'react-router-dom';
import { BuyerLayout } from '@/components/layout/BuyerLayout';
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage';
import { BuyerDashboardPage } from '@/features/dashboard/pages/BuyerDashboardPage';
import { ProductDetailPage } from '@/features/marketplace/pages/ProductDetailPage';
import { KonsultasiPage } from '@/features/konsultasi/pages/KonsultasiPage';

// Placeholder pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-xs max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{title}</h1>
      <p className="text-xs text-gray-500">Halaman ini sedang dalam tahap pengembangan.</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  // Default redirect to Marketplace
  {
    path: '/',
    element: <Navigate to="/pembeli/marketplace" replace />,
  },
  {
    path: '/masuk',
    element: <PlaceholderPage title="Halaman Masuk" />,
  },
  {
    path: '/daftar',
    element: <PlaceholderPage title="Halaman Daftar" />,
  },

  // Pembeli routes with BuyerLayout
  {
    path: '/pembeli',
    element: <BuyerLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="marketplace" replace />,
      },
      {
        path: 'dasbor',
        element: <BuyerDashboardPage />,
      },
      {
        path: 'marketplace',
        element: <MarketplacePage />,
      },
      {
        path: 'produk/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'konsultasi',
        element: <KonsultasiPage />,
      },
      {
        path: 'keranjang',
        element: <PlaceholderPage title="Keranjang Belanja" />,
      },
      {
        path: 'checkout',
        element: <PlaceholderPage title="Checkout" />,
      },
    ],
  },

  // Penjual routes
  {
    path: '/penjual/dasbor',
    element: <PlaceholderPage title="Dasbor Penjual" />,
  },
  {
    path: '/penjual/produk',
    element: <PlaceholderPage title="Manajemen Produk" />,
  },
  {
    path: '/penjual/produk/tambah',
    element: <PlaceholderPage title="Tambah Produk" />,
  },
  {
    path: '/penjual/limbah',
    element: <PlaceholderPage title="Marketplace Limbah" />,
  },
  {
    path: '/penjual/pesanan',
    element: <PlaceholderPage title="Kelola Pesanan" />,
  },
  {
    path: '/penjual/analitik',
    element: <PlaceholderPage title="Analitik Pendapatan" />,
  },
]);
