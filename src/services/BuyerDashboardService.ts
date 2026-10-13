import type { BuyerStats, BuyerTransaction } from '@/types';

export class BuyerDashboardService {
  private stats: BuyerStats;
  private transactions: BuyerTransaction[];

  constructor(stats: BuyerStats, transactions: BuyerTransaction[]) {
    this.stats = stats;
    this.transactions = transactions;
  }

  getStats(): BuyerStats {
    return { ...this.stats };
  }

  getRecentTransactions(limit?: number): BuyerTransaction[] {
    const list = [...this.transactions];
    return limit ? list.slice(0, limit) : list;
  }

  getTransactionById(id: string): BuyerTransaction | undefined {
    return this.transactions.find((t) => t.id === id);
  }

  getTotalActiveOrders(): number {
    return this.stats.pesananAktif;
  }

  getTotalSavings(): number {
    return this.stats.penghematan;
  }
}
