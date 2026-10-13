import { mockProducts, mockBuyerStats, mockBuyerTransactions } from '@/data/mockData';
import { ProductService } from './ProductService';
import { OrderService } from './OrderService';
import { BuyerDashboardService } from './BuyerDashboardService';

export const productService = new ProductService(mockProducts);
export const orderService = new OrderService();
export const buyerDashboardService = new BuyerDashboardService(mockBuyerStats, mockBuyerTransactions);

export { ProductService, OrderService, BuyerDashboardService };

