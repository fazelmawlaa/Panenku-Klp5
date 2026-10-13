import type { CartItem, Product } from '@/types';
import cabaiBusukImg from '@/assets/cabai_busuk.jpg';

const CART_STORAGE_KEY = 'panenku_cart_items';

export const initialCartItems: CartItem[] = [
  {
    product: {
      id: 'limbah-1',
      name: 'Cabai Busuk',
      type: 'limbah',
      category: 'Limbah Pertanian',
      origin: 'Aceh Jaya',
      sellerName: 'Urfan Husain',
      pricePerUnit: 10000,
      unit: 'kg',
      stock: 50,
      image: cabaiBusukImg,
      description: 'Limbah cabai sortir berkualitas untuk bahan baku pupuk organik dan ekstraksi capsaicin.',
    },
    qty: 4,
  },
];

export class CartService {
  private getStoredItems(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse cart items', e);
    }
    // Set default initial cart item
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(initialCartItems));
    return initialCartItems;
  }

  public getItems(): CartItem[] {
    return this.getStoredItems();
  }

  public saveItems(items: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
    }
  }

  public addItem(product: Product, qty: number = 1): CartItem[] {
    const items = this.getItems();
    const existingIndex = items.findIndex((i) => i.product.id === product.id);

    if (existingIndex > -1) {
      items[existingIndex].qty += qty;
    } else {
      items.push({ product, qty });
    }

    this.saveItems(items);
    return items;
  }

  public updateQty(productId: string, qty: number): CartItem[] {
    let items = this.getItems();
    if (qty <= 0) {
      items = items.filter((i) => i.product.id !== productId);
    } else {
      const item = items.find((i) => i.product.id === productId);
      if (item) {
        item.qty = qty;
      }
    }
    this.saveItems(items);
    return items;
  }

  public removeItem(productId: string): CartItem[] {
    const items = this.getItems().filter((i) => i.product.id !== productId);
    this.saveItems(items);
    return items;
  }

  public clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
    }
  }

  public getSubtotal(): number {
    return this.getItems().reduce(
      (sum, item) => sum + item.product.pricePerUnit * item.qty,
      0
    );
  }
}

export const cartService = new CartService();
