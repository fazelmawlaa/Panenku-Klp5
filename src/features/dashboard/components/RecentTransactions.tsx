import React from 'react';
import { ArrowRight, ShoppingBag, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BuyerTransaction } from '@/types';

interface RecentTransactionsProps {
  transactions: BuyerTransaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">Transaksi Terbaru</h2>
        <Link
          to="/pembeli/pesanan"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider flex items-center gap-1 transition-colors"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-50 flex-1">
        {transactions.map((trx) => (
          <div
            key={trx.id}
            className="py-4 flex items-center justify-between gap-4 hover:bg-gray-50/50 -mx-2 px-2 rounded-xl transition-colors"
          >
            {/* Left: Icon & Details */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-50/80 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
                {trx.type === 'konsultasi' ? (
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                ) : (
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">{trx.title}</h4>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {trx.code} • {trx.date}
                </p>
              </div>
            </div>

            {/* Right: Amount & Status Badge */}
            <div className="flex flex-col items-end shrink-0 leading-tight">
              <span className="text-sm font-extrabold text-gray-900">
                Rp{trx.amount.toLocaleString('id-ID')}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 tracking-wider uppercase ${
                  trx.status === 'PAID' || trx.status === 'SELESAI'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}
              >
                {trx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
