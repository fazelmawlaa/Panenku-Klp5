import { createBrowserRouter } from 'react-router-dom';
import { BuyerLayout } from '@/components/layout/BuyerLayout';
import { BuyerDashboardPage } from '@/features/dashboard/pages/BuyerDashboardPage';
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import SellerOrdersPage from '@/pages/SellerOrdersPage';

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
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/masuk',
    element: <LoginPage />,
  },
  {
    path: '/daftar',
    element: <RegisterPage />,
  },
  {
    path: '/pembeli',
    element: <BuyerLayout />,
    children: [
      {
        path: 'marketplace',
        element: <MarketplacePage />,
      },
      {
        path: 'dasbor',
        element: <BuyerDashboardPage />,
      },
      {
        path: 'produk/:id',
        element: <PlaceholderPage title="Detail Produk" />,
      },
      {
        path: 'konsultasi',
        element: <PlaceholderPage title="Konsultasi Mentor" />,
      },
      {
        path: 'keranjang',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
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
    element: <SellerOrdersPage />,
  },
  {
    path: '/penjual/analitik',
    element: <PlaceholderPage title="Analitik Pendapatan" />,
  },
]);
