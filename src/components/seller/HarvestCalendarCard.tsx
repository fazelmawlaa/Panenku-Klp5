import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Sparkles, ChevronRight, Sprout, AlertCircle } from 'lucide-react';

interface HarvestItem {
  id: string;
  day: number;
  month: string;
  cropName: string;
  quantity: string;
  harvestDateFormatted: string;
  daysRemaining: number;
  progressPercent: number;
  stage: string;
  grade: string;
}

const harvestScheduleList: HarvestItem[] = [
  {
    id: 'h-1',
    day: 9,
    month: 'JUL',
    cropName: 'Bawang Merah',
    quantity: '500 kg',
    harvestDateFormatted: '09 Juli 2026',
    daysRemaining: 3,
    progressPercent: 92,
    stage: 'Masa Pematangan Umbi',
    grade: 'Super Grade A',
  },
  {
    id: 'h-2',
    day: 20,
    month: 'NOV',
    cropName: 'Tomat Segar',
    quantity: '80 kg',
    harvestDateFormatted: '20 November 2026',
    daysRemaining: 38,
    progressPercent: 65,
    stage: 'Fase Pembuahan',
    grade: 'Organik Lembang',
  },
  {
    id: 'h-3',
    day: 15,
    month: 'DES',
    cropName: 'Kopi Arabika Gayo',
    quantity: '100 kg',
    harvestDateFormatted: '15 Desember 2026',
    daysRemaining: 63,
    progressPercent: 45,
    stage: 'Pematangan Cherry',
    grade: 'Specialty Organik',
  },
];

export const HarvestCalendarCard: React.FC = () => {
  const [selectedHarvestId, setSelectedHarvestId] = useState<string>('h-1');
  const [activeTab, setActiveTab] = useState<'terdekat' | 'semua'>('terdekat');

  const selectedItem =
    harvestScheduleList.find((item) => item.id === selectedHarvestId) ||
    harvestScheduleList[0];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h2 className="text-xl font-bold text-[#111827] tracking-tight">
              Kalender Panen
            </h2>
            <p className="text-xs text-[#6b7280] mt-0.5">
              Jadwal estimasi berdasarkan produk pre-order aktif
            </p>
          </div>
          <div className="p-2 rounded-xl bg-[#ecfdf5] text-[#006738]">
            <CalendarIcon className="w-5 h-5 stroke-[2]" />
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-4 mb-4 border-b border-[#f1f3f1] pb-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('terdekat')}
            className={`pb-1 px-1 transition-all relative ${
              activeTab === 'terdekat'
                ? 'text-[#006738] font-bold border-b-2 border-[#006738]'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Panen Terdekat
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('semua')}
            className={`pb-1 px-1 transition-all relative ${
              activeTab === 'semua'
                ? 'text-[#006738] font-bold border-b-2 border-[#006738]'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Semua Jadwal ({harvestScheduleList.length})
          </button>
        </div>

        {/* Main Featured Harvest Card (Exact match to screenshot) */}
        <div
          onClick={() => setSelectedHarvestId('h-1')}
          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedHarvestId === 'h-1'
              ? 'bg-[#fbfdfb] border-[#006738]/30 shadow-xs ring-1 ring-[#006738]/20'
              : 'bg-[#fafbfa] border-[#e8ece8] hover:border-gray-300'
          }`}
        >
          {/* Round Date Badge */}
          <div className="w-13 h-13 rounded-full bg-[#006738] text-white flex flex-col items-center justify-center shrink-0 shadow-sm shadow-[#006738]/20">
            <span className="text-lg font-black leading-none">{harvestScheduleList[0].day}</span>
            <span className="text-[10px] font-bold tracking-widest leading-tight uppercase mt-0.5">
              {harvestScheduleList[0].month}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-extrabold text-base text-[#111827] leading-tight">
              {harvestScheduleList[0].cropName}
            </h3>
            <p className="text-xs font-semibold text-[#6b7280] mt-0.5">
              {harvestScheduleList[0].quantity}
            </p>
          </div>

          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full shrink-0">
            {harvestScheduleList[0].daysRemaining} Hari Lagi
          </span>
        </div>

        {/* Section Panen Terdekat - Details & Progress */}
        {activeTab === 'terdekat' ? (
          <div className="mt-4 p-4 rounded-xl bg-[#f7faf7] border border-[#e6eee6] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Kesiapan Panen</span>
              <span className="font-extrabold text-[#006738]">
                {selectedItem.progressPercent}% Selesai
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#006738] h-full rounded-full transition-all duration-500"
                style={{ width: `${selectedItem.progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-white p-2 rounded-lg border border-[#e5ebe5]">
                <span className="text-gray-400 block text-[10px]">Fase Tanaman</span>
                <span className="font-bold text-gray-800 truncate block">
                  {selectedItem.stage}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-[#e5ebe5]">
                <span className="text-gray-400 block text-[10px]">Kualitas Mutu</span>
                <span className="font-bold text-[#006738] truncate block">
                  {selectedItem.grade}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#006738] font-medium pt-1">
              <Sprout className="w-3.5 h-3.5" />
              <span>3 pembeli telah pre-order untuk komoditas ini</span>
            </div>
          </div>
        ) : (
          /* List of all harvest schedules */
          <div className="mt-3 space-y-2 max-h-[170px] overflow-y-auto pr-1 scrollbar-thin">
            {harvestScheduleList.slice(1).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedHarvestId(item.id)}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                  selectedHarvestId === item.id
                    ? 'bg-[#fbfdfb] border-[#006738]/30 shadow-xs'
                    : 'bg-white border-[#edf1ed] hover:bg-[#f9faf9]'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#006738] flex flex-col items-center justify-center shrink-0 font-bold">
                  <span className="text-xs leading-none font-extrabold">{item.day}</span>
                  <span className="text-[8px] uppercase tracking-wider">{item.month}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-gray-900 truncate">{item.cropName}</p>
                  <p className="text-[11px] text-gray-500">{item.quantity}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="mt-4 pt-3 border-t border-[#f1f3f1] flex items-center justify-between text-xs text-[#006738] font-bold hover:underline cursor-pointer">
        <span>Kelola Semua Jadwal Panen</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
