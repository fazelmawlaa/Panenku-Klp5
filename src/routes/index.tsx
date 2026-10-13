import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';

// Buyer Layout & Pages
import { BuyerLayout } from '@/components/layout/BuyerLayout';
import { BuyerDashboardPage } from '@/features/dashboard/pages/BuyerDashboardPage';
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage';

// Seller Layout & Pages
import { SellerLayout } from '@/components/seller/SellerLayout';
import SellerDashboardPage from '@/pages/seller/SellerDashboardPage';
import SellerMarketplacePage from '@/pages/seller/SellerMarketplacePage';
import AddProductPage from '@/pages/seller/AddProductPage';
import SellerWastePage from '@/pages/seller/SellerWastePage';
import AddWastePage from '@/pages/seller/AddWastePage';
import SellerOrdersPage from '@/pages/seller/SellerOrdersPage';
import SellerAnalyticsPage from '@/pages/seller/SellerAnalyticsPage';
import SellerProfilePage from '@/pages/seller/SellerProfilePage';
import SellerConsultationPage from '@/pages/seller/SellerConsultationPage';

// Placeholder pages for buyer/seller items in development
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-xs max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{title}</h1>
      <p className="text-xs text-gray-500">Halaman ini sedang dalam tahap pengembangan.</p>
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

  // Pembeli routes (with BuyerLayout)
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
        path: 'limbah/tambah',
        element: <AddWastePage />,
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
