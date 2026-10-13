import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { Mentor, ChatSession, MentorCategory } from "@/types";
import { mentorService } from "@/services";
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
      <div className="w-full">
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
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xs w-full bg-[#1b4332]">
        <img
          src="/images/konsultasi-hero.jpg"
          alt="Tanya Petani Mentor di PANENKU"
          className="w-full h-auto object-cover object-center max-h-[300px]"
        />
        <h1 className="sr-only">Tanya Petani Mentor di PANENKU</h1>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex items-center gap-3">
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
            className="px-6 py-2.5 bg-[#baef53] hover:bg-[#a8e53d] text-[#1b4332] text-sm font-semibold rounded-xl transition-colors shadow-2xs"
          >
            Cari
          </button>
          <button
            onClick={() => sessions.length > 0 && handleOpenExistingChat(sessions[0].id)}
            className="px-5 py-2.5 bg-[#247e3b] hover:bg-[#1b632e] text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2 shadow-2xs"
          >
            💬 Chat Sesi
            {sessions.length > 0 && (
              <span className="bg-white text-[#247e3b] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {sessions.length}
              </span>
            )}
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory("Semua")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === "Semua"
                ? "bg-[#247e3b] text-white shadow-2xs"
                : "bg-white border border-gray-200 text-gray-600 hover:border-green-400"
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#247e3b] text-white shadow-2xs"
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
