import { mockProducts } from '@/data/mockData';
import { ProductService } from './ProductService';
import { OrderService } from './OrderService';

export const productService = new ProductService(mockProducts);
export const orderService = new OrderService();

export { ProductService, OrderService };
