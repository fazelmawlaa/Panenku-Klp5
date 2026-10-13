import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { SellerLayout } from '@/components/seller/SellerLayout';
import SellerDashboardPage from '@/pages/seller/SellerDashboardPage';
import SellerMarketplacePage from '@/pages/seller/SellerMarketplacePage';
import AddProductPage from '@/pages/seller/AddProductPage';
import SellerOrdersPage from '@/pages/seller/SellerOrdersPage';
import SellerWastePage from '@/pages/seller/SellerWastePage';
import SellerAnalyticsPage from '@/pages/seller/SellerAnalyticsPage';
import SellerProfilePage from '@/pages/seller/SellerProfilePage';
import SellerConsultationPage from '@/pages/seller/SellerConsultationPage';

// Placeholder pages for buyer
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
    element: <PlaceholderPage title="Keranjang Belanja" />,
  },
  {
    path: '/pembeli/checkout',
    element: <PlaceholderPage title="Checkout" />,
  },

  // Penjual routes (Nested under SellerLayout)
  {
    path: '/penjual',
    element: <SellerLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/penjual/dasbor" replace />,
      },
      {
        path: 'dasbor',
        element: <SellerDashboardPage />,
      },
      {
        path: 'marketplace',
        element: <SellerMarketplacePage />,
      },
      {
        path: 'produk',
        element: <SellerMarketplacePage />,
      },
      {
        path: 'produk/tambah',
        element: <AddProductPage />,
      },
      {
        path: 'limbah',
        element: <SellerWastePage />,
      },
      {
        path: 'pesanan',
        element: <SellerOrdersPage />,
      },
      {
        path: 'analitik',
        element: <SellerAnalyticsPage />,
      },
      {
        path: 'profil',
        element: <SellerProfilePage />,
      },
      {
        path: 'konsultasi',
        element: <SellerConsultationPage />,
      },
      {
        path: 'kalender',
        element: <SellerDashboardPage />,
      },
    ],
  },
]);
