import { useState } from "react";
import type { Mentor } from "@/types";
import { X, MessageSquare } from "lucide-react";

interface StartSessionModalProps {
  mentor: Mentor;
  onConfirm: (topic: string) => void;
  onClose: () => void;
}

function formatRate(rate: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(rate);
}



const avatarColors = ["bg-red-500","bg-blue-500","bg-purple-500","bg-orange-500","bg-teal-500","bg-pink-500"];

export function StartSessionModal({ mentor, onConfirm, onClose }: StartSessionModalProps) {
  const [topic, setTopic] = useState("");
  const bgColor = avatarColors[mentor.name.charCodeAt(0) % avatarColors.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">Mulai Sesi Konsultasi</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Mentor Info */}
        <div className="px-6 pt-5 pb-4 flex items-start gap-4 border-b border-gray-100">
          <div className={`w-14 h-14 rounded-xl overflow-hidden ${bgColor} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-green-700">{mentor.expertise}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
              <span>⏱ {mentor.experience}</span>
              <span>⭐ {mentor.rating}% Kepuasan</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topik Konsultasi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: pembukaan sawah, hama padi, dll."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />

          {/* Specializations hint */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {mentor.specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => setTopic(spec)}
                className="text-[11px] px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full hover:bg-green-100 transition-colors"
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Cost Info */}
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-gray-700">Biaya sesi</span>
            <span className="font-bold text-green-700">{formatRate(mentor.rate)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => topic.trim() && onConfirm(topic.trim())}
            disabled={!topic.trim()}
            className="flex-1 py-2.5 bg-green-700 hover:bg-green-800 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare size={14} />
            Chat Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
