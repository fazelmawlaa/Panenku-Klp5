import type { Product, ProductType } from '@/types';

export interface ProductFilterCriteria {
  query?: string;
  type?: ProductType | 'all';
  origin?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'stock-desc';
}

export class ProductService {
  private data: Product[];

  constructor(data: Product[]) {
    this.data = data;
  }

  getAll(type?: ProductType): Product[] {
    return type ? this.data.filter(p => p.type === type) : [...this.data];
  }

  getById(id: string): Product | undefined {
    return this.data.find(p => p.id === id);
  }

  search(query: string): Product[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [...this.data];
    return this.data.filter(
      p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.origin.toLowerCase().includes(lowerQuery) ||
        p.sellerName.toLowerCase().includes(lowerQuery)
    );
  }

  filter(criteria: ProductFilterCriteria): Product[] {
    let result = [...this.data];

    if (criteria.query && criteria.query.trim()) {
      const q = criteria.query.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q)
      );
    }

    if (criteria.type && criteria.type !== 'all') {
      result = result.filter(p => p.type === criteria.type);
    }

    if (criteria.origin && criteria.origin !== 'all') {
      result = result.filter(p => p.origin.toLowerCase().includes(criteria.origin!.toLowerCase()));
    }

    if (criteria.sortBy) {
      switch (criteria.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
          break;
        case 'price-desc':
          result.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'stock-desc':
          result.sort((a, b) => b.stock - a.stock);
          break;
      }
    }

    return result;
  }

  getUniqueOrigins(): string[] {
    const origins = this.data.map(p => p.origin);
    return Array.from(new Set(origins));
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

