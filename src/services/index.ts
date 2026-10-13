import { mockProducts, mockMentors } from '@/data/mockData';
import { ProductService } from './ProductService';
import { OrderService } from './OrderService';
import { MentorService } from './MentorService';

export const productService = new ProductService(mockProducts);
export const orderService = new OrderService();
export const mentorService = new MentorService(mockMentors);

export { ProductService, OrderService, MentorService };
