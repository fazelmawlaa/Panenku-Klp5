import type { Mentor } from "@/types";
import { MessageSquare, Star, Clock } from "lucide-react";

interface MentorCardProps {
  mentor: Mentor;
  onChat: (mentor: Mentor) => void;
}

const statusConfig = {
  aktif: { label: "AKTIF", color: "bg-green-500 text-white" },
  sibuk: { label: "SIBUK", color: "bg-orange-500 text-white" },
  offline: { label: "OFFLINE", color: "bg-gray-400 text-white" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatRate(rate: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(rate);
}

function AvatarWithFallback({ src, name }: { src: string; name: string }) {
  const initials = getInitials(name);
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-purple-500",
    "bg-orange-500", "bg-teal-500", "bg-pink-500",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        className={`hidden w-full h-full ${bgColor} items-center justify-center text-white text-xl font-bold`}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {initials}
      </div>
    </div>
  );
}

export function MentorCard({ mentor, onChat }: MentorCardProps) {
  const statusCfg = statusConfig[mentor.status];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <AvatarWithFallback src={mentor.image} name={mentor.name} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-gray-900 text-base truncate">{mentor.name}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusCfg.color}`}>
              {statusCfg.label}
            </span>
          </div>
          <p className="text-sm text-green-700 font-medium mb-2 truncate">{mentor.expertise}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {mentor.experience}
            </span>
            <span className="flex items-center gap-1 text-yellow-600 font-medium">
              <Star size={12} fill="currentColor" />
              {mentor.rating}% Kepuasan
            </span>
          </div>

          {/* Rate */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">BIAYA SESI</p>
              <p className="text-green-700 font-bold text-base">{formatRate(mentor.rate)}</p>
            </div>

            <button
              onClick={() => onChat(mentor)}
              disabled={mentor.status === "offline"}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              <MessageSquare size={14} />
              Chat Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
