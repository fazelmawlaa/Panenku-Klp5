import React from 'react';
import { MessageSquare, Calendar, Video, Clock, CheckCircle2 } from 'lucide-react';

export const SellerConsultationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Sesi Konsultasi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Jadwal bimbingan agritech dan konsultasi budidaya tanaman langsung bersama mentor ahli.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#e8ece8] shadow-xs">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
          <div className="w-12 h-12 rounded-xl bg-[#006738] text-white flex items-center justify-center font-bold">
            <Video className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-white px-2 py-0.5 rounded-full">
              Sesi Mendatang • SES-325-3967
            </span>
            <h3 className="font-bold text-gray-900 text-sm mt-1">
              Optimasi Pemupukan Organik & Mitigasi Hama Bawang
            </h3>
            <p className="text-xs text-gray-500">
              Bersama: Mentor Pak Harto • Jadwal: Besok, 14:00 - 15:00 WIB
            </p>
          </div>
          <button className="px-4 py-2 text-xs font-bold text-white bg-[#006738] hover:bg-[#00522c] rounded-xl transition-colors">
            Masuk Ruang
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerConsultationPage;
