import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  badgeText: string;
  badgeType?: 'positive' | 'neutral' | 'negative';
  iconColorClass?: string;
  iconBgClass?: string;
  badgeColorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  badgeText,
  iconColorClass = 'text-[#006738]',
  iconBgClass = 'bg-[#eaf5ed]',
  badgeColorClass = 'bg-[#eaf5ed] text-[#006738]',
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e8ece8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        {/* Icon in soft pastel container */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBgClass} ${iconColorClass}`}
        >
          <Icon className="w-5 h-5 stroke-[2.2]" />
        </div>

        {/* Badge in top right */}
        <div
          className={`inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColorClass}`}
        >
          {badgeText.startsWith('+') || badgeText.startsWith('-') || !badgeText.includes('↗') ? (
            <>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{badgeText}</span>
            </>
          ) : (
            <span>{badgeText}</span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase">
          {label}
        </p>
        <p className="text-2xl lg:text-[26px] font-extrabold text-[#111827] mt-1 tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
};
