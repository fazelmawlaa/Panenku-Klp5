import type { Order, OrderStatus } from '@/types';

export class OrderService {
  private orders: Order[] = [];

  create(order: Order): Order {
    this.orders.push(order);
    return order;
  }

  getAll(): Order[] {
    return this.orders;
  }

  getById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  getByStatus(status: OrderStatus): Order[] {
    return this.orders.filter(o => o.status === status);
  }

  updateStatus(id: string, status: OrderStatus): Order | undefined {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
    }
    return order;
  }
}
