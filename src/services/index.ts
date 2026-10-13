import { mockProducts, mockBuyerStats, mockBuyerTransactions } from '@/data/mockData';
import { ProductService } from './ProductService';
import { OrderService } from './OrderService';
import { BuyerDashboardService } from './BuyerDashboardService';
import { authService, AuthService } from './AuthService';
import { cartService, CartService } from './CartService';

export const productService = new ProductService(mockProducts);
export const orderService = new OrderService();
export const buyerDashboardService = new BuyerDashboardService(mockBuyerStats, mockBuyerTransactions);

export { ProductService, OrderService, authService, AuthService, cartService, CartService };
export { BuyerDashboardService };
