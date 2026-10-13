import type { BuyerStats, BuyerTransaction } from '@/types';

const TRANSACTIONS_KEY = 'panenku_buyer_transactions';
const STATS_KEY = 'panenku_buyer_stats';

export class BuyerDashboardService {
  private stats: BuyerStats;
  private transactions: BuyerTransaction[];

  constructor(initialStats: BuyerStats, initialTransactions: BuyerTransaction[]) {
    this.stats = this.loadStats(initialStats);
    this.transactions = this.loadTransactions(initialTransactions);
  }

  private loadTransactions(fallback: BuyerTransaction[]): BuyerTransaction[] {
    try {
      const stored = localStorage.getItem(TRANSACTIONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse transactions from localStorage', e);
    }
    try {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(fallback));
    } catch {}
    return [...fallback];
  }

  private loadStats(fallback: BuyerStats): BuyerStats {
    try {
      const stored = localStorage.getItem(STATS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stats from localStorage', e);
    }
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(fallback));
    } catch {}
    return { ...fallback };
  }

  private saveTransactions(): void {
    try {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(this.transactions));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('dashboard-updated'));
      }
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }

  private saveStats(): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(this.stats));
    } catch (e) {
      console.error('Failed to save stats to localStorage', e);
    }
  }

  getStats(): BuyerStats {
    return { ...this.stats };
  }

  getRecentTransactions(limit?: number): BuyerTransaction[] {
    const list = [...this.transactions];
    return limit ? list.slice(0, limit) : list;
  }

  getAllTransactions(): BuyerTransaction[] {
    return [...this.transactions];
  }

  getTransactionById(id: string): BuyerTransaction | undefined {
    return this.transactions.find((t) => t.id === id);
  }

  addTransaction(transaction: BuyerTransaction): void {
    this.transactions.unshift(transaction);
    this.stats.pesananAktif = (this.stats.pesananAktif || 0) + 1;
    this.stats.totalTransaksi = (this.stats.totalTransaksi || 0) + 1;
    this.saveTransactions();
    this.saveStats();
  }

  getTotalActiveOrders(): number {
    return this.stats.pesananAktif;
  }

  getTotalSavings(): number {
    return this.stats.penghematan;
  }
}
