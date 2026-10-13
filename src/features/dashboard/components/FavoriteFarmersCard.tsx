import React from 'react';

export const FavoriteFarmersCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-6 flex flex-col">
      <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
        Petani Favorit
      </h2>
      <div className="py-10 text-center flex flex-col items-center justify-center">
        <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
          Belum ada petani favorit. Lakukan transaksi untuk melihat petani favorit Anda.
        </p>
      </div>
    </div>
  );
};
