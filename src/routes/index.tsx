import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';

// Placeholder pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">Halaman ini akan segera dibuat</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  // Public routes
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

  // Pembeli routes
  {
    path: '/pembeli/dasbor',
    element: <PlaceholderPage title="Dasbor Pembeli" />,
  },
  {
    path: '/pembeli/marketplace',
    element: <PlaceholderPage title="Marketplace" />,
  },
  {
    path: '/pembeli/produk/:id',
    element: <PlaceholderPage title="Detail Produk" />,
  },
  {
    path: '/pembeli/konsultasi',
    element: <PlaceholderPage title="Konsultasi Mentor" />,
  },
  {
    path: '/pembeli/keranjang',
    element: <CartPage />,
  },
  {
    path: '/pembeli/checkout',
    element: <CheckoutPage />,
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
