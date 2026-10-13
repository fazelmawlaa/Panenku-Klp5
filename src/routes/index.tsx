import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { BuyerLayout } from '@/components/layout/BuyerLayout';
import { BuyerDashboardPage } from '@/features/dashboard/pages/BuyerDashboardPage';
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';

// Buyer Layout & Pages
import { BuyerLayout } from '@/components/layout/BuyerLayout';
import { BuyerDashboardPage } from '@/features/dashboard/pages/BuyerDashboardPage';
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage';
import { ProductDetailPage } from '@/features/marketplace/pages/ProductDetailPage';
import { KonsultasiPage } from '@/features/konsultasi/pages/KonsultasiPage';

// Seller Layout & Pages
import { SellerLayout } from '@/components/seller/SellerLayout';
import SellerDashboardPage from '@/pages/seller/SellerDashboardPage';
import SellerMarketplacePage from '@/pages/seller/SellerMarketplacePage';
import SellerProductsPage from '@/pages/seller/SellerProductsPage';
import AddProductPage from '@/pages/seller/AddProductPage';
import SellerWastePage from '@/pages/seller/SellerWastePage';
import AddWastePage from '@/pages/seller/AddWastePage';
import SellerOrdersPage from '@/pages/seller/SellerOrdersPage';
import SellerAnalyticsPage from '@/pages/seller/SellerAnalyticsPage';
import SellerProfilePage from '@/pages/seller/SellerProfilePage';
import SellerConsultationPage from '@/pages/seller/SellerConsultationPage';

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
        path: '',
        element: <Navigate to="dasbor" replace />,
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
