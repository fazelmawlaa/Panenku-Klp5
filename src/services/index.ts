import { mockProducts, mockMentors, mockBuyerStats, mockBuyerTransactions } from '@/data/mockData';
import { ProductService } from './ProductService';
import { OrderService } from './OrderService';
import { MentorService } from './MentorService';
import { BuyerDashboardService } from './BuyerDashboardService';

export const productService = new ProductService(mockProducts);
export const orderService = new OrderService();
export const mentorService = new MentorService(mockMentors);
export const buyerDashboardService = new BuyerDashboardService(mockBuyerStats, mockBuyerTransactions);

export { ProductService, OrderService, MentorService, BuyerDashboardService };
