import type { Order, OrderStatus } from '@/types';

const ORDERS_KEY = 'panenku_orders';

export class OrderService {
  private orders: Order[] = [];

  constructor() {
    this.orders = this.loadOrders();
  }

  private loadOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse orders from localStorage', e);
    }
    return [];
  }

  private saveOrders(): void {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(this.orders));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('orders-updated', { detail: this.orders }));
      }
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }

  create(order: Order): Order {
    this.orders.unshift(order);
    this.saveOrders();
    return order;
  }

  getAll(): Order[] {
    return [...this.orders];
  }

  getById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  getByStatus(status: OrderStatus): Order[] {
    return this.orders.filter(o => o.status === status);
  }

  getByBuyer(buyerId?: string): Order[] {
    if (!buyerId) return [...this.orders];
    return this.orders.filter(o => o.buyerId === buyerId);
  }

  updateStatus(id: string, status: OrderStatus): Order | undefined {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      this.saveOrders();
    }
    return order;
  }
}
