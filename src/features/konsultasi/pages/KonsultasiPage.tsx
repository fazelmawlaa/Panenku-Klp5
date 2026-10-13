import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { Mentor, ChatSession, MentorCategory } from "@/types";
import { mentorService } from "@/services";
import { BuyerNavbar } from "@/components/layout/BuyerNavbar";
import { MentorCard } from "../components/MentorCard";
import { ChatModal } from "../components/ChatModal";
import { StartSessionModal } from "../components/StartSessionModal";
import { Search } from "lucide-react";

type View = "list" | "chat";

const CURRENT_USER = { id: "user-1", name: "fazel", initial: "F" };

export function KonsultasiPage() {
  const [view, setView] = useState<View>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MentorCategory | "Semua">("Semua");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>(
    mentorService.getSessionsByBuyer(CURRENT_USER.id)
  );
  const [activeChatSessionId, setActiveChatSessionId] = useState<string>("");

  const categories = mentorService.getCategories();

  const filteredMentors = useMemo(() => {
    return mentorService.filter({
      query: searchQuery,
      category: selectedCategory,
    });
  }, [searchQuery, selectedCategory]);

  // Group mentors by category
  const mentorsByCategory = useMemo(() => {
    const groups: Record<string, Mentor[]> = {};
    const filtered = filteredMentors;
    for (const mentor of filtered) {
      if (!groups[mentor.category]) groups[mentor.category] = [];
      groups[mentor.category].push(mentor);
    }
    return groups;
  }, [filteredMentors]);

  const handleChatClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
  };

  const handleSessionStart = (topic: string) => {
    if (!selectedMentor) return;
    const newSession = mentorService.startSession(
      selectedMentor,
      CURRENT_USER.id,
      CURRENT_USER.name,
      topic
    );
    setSessions((prev) => [newSession, ...prev]);
    setActiveChatSessionId(newSession.id);
    setSelectedMentor(null);
    setView("chat");
  };

  const handleOpenExistingChat = (sessionId: string) => {
    setActiveChatSessionId(sessionId);
    setView("chat");
  };

  if (view === "chat" && activeChatSessionId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BuyerNavbar userName={CURRENT_USER.name} userInitial={CURRENT_USER.initial} />
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setView("list"); }}
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 text-sm mb-5 font-medium"
          >
            <ArrowLeft size={16} />
            Kembali ke Konsultasi
          </Link>
          <ChatModal
            sessions={sessions}
            activeSessionId={activeChatSessionId}
            onBack={() => setView("list")}
            currentUserId={CURRENT_USER.id}
            currentUserName={CURRENT_USER.name}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BuyerNavbar userName={CURRENT_USER.name} userInitial={CURRENT_USER.initial} />

      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ height: "260px" }}>
        <img
          src="/images/konsultasi-hero.jpg"
          alt="Konsultasi Petani"
          className="w-full h-full object-cover object-top"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        {/* Hero text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
            Tanya Petani Mentor di{" "}
            <span className="text-yellow-400">PANENKU</span>
          </h1>
        </div>
        {/* Fallback gradient if no image */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-green-800 via-green-600 to-emerald-500 flex items-center justify-center"
        >
          <h1 className="text-4xl font-bold text-white text-center">
            Tanya Petani Mentor di{" "}
            <span className="text-yellow-400">PANENKU</span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama mentor, keahlian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white"
            />
          </div>
          <button
            onClick={() => {}}
            className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Cari
          </button>
          {sessions.length > 0 && (
            <button
              onClick={() => handleOpenExistingChat(sessions[0].id)}
              className="px-5 py-2.5 border border-green-700 text-green-700 hover:bg-green-50 text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
            >
              💬 Chat Sesi
              <span className="bg-green-700 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {sessions.length}
              </span>
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <button
            onClick={() => setSelectedCategory("Semua")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === "Semua"
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-green-400"
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-green-700 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-green-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mentor Groups */}
        {Object.keys(mentorsByCategory).length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">Mentor tidak ditemukan</p>
            <p className="text-sm mt-1">Coba kata kunci yang berbeda</p>
          </div>
        ) : (
          Object.entries(mentorsByCategory).map(([category, mentors]) => (
            <div key={category} className="mb-8">
              <h2 className="text-base font-bold text-gray-800 mb-3">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentors.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onChat={handleChatClick}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Start Session Modal */}
      {selectedMentor && (
        <StartSessionModal
          mentor={selectedMentor}
          onConfirm={handleSessionStart}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </div>
  );
}
