import type { Product, ProductType } from '@/types';

export class ProductService {
  private data: Product[];

  constructor(data: Product[]) {
    this.data = data;
  }

  getAll(type?: ProductType): Product[] {
    return type ? this.data.filter(p => p.type === type) : this.data;
  }

  getById(id: string): Product | undefined {
    return this.data.find(p => p.id === id);
  }

  search(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.data.filter(
      p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.origin.toLowerCase().includes(lowerQuery)
    );
  }

  filterByOrigin(origin: string): Product[] {
    return this.data.filter(p => p.origin === origin);
  }

  sortByPrice(ascending: boolean = true): Product[] {
    return [...this.data].sort((a, b) =>
      ascending ? a.pricePerUnit - b.pricePerUnit : b.pricePerUnit - a.pricePerUnit
    );
  }
}
