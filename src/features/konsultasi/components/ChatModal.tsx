import { useState, useRef, useEffect } from "react";
import type { ChatSession, ChatMessage } from "@/types";
import { Send, Search } from "lucide-react";
import { mentorService } from "@/services";

interface ChatModalProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onBack: () => void;
  currentUserId: string;
  currentUserName: string;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

const avatarColors = [
  "bg-red-500", "bg-blue-500", "bg-purple-500",
  "bg-orange-500", "bg-teal-500", "bg-pink-500",
];

function getAvatarColor(name: string): string {
  return avatarColors[name.charCodeAt(0) % avatarColors.length];
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*"([^"]+)"\*/g, '<strong>"$1"</strong>')
    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
}

export function ChatModal({ sessions, activeSessionId, onBack: _onBack, currentUserId, currentUserName }: ChatModalProps) {
  const [currentSessionId, setCurrentSessionId] = useState(activeSessionId);
  const [sessionList, setSessionList] = useState<ChatSession[]>(sessions);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionSearch, setSessionSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessionList.find((s) => s.id === currentSessionId);

  useEffect(() => {
    const sess = sessionList.find((s) => s.id === currentSessionId);
    if (sess) setMessages([...sess.messages]);
  }, [currentSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || !currentSession) return;

    const newMsg = mentorService.sendMessage(
      currentSessionId,
      currentUserId,
      currentUserName,
      "pembeli",
      inputValue.trim()
    );

    if (newMsg) {
      setMessages((prev) => [...prev, newMsg]);
      setSessionList((prev) =>
        prev.map((s) => s.id === currentSessionId ? { ...s, lastMessage: newMsg } : s)
      );

      // Simulate mentor reply after 1.5s
      const mentorReply = `Terima kasih atas pertanyaan Anda! Saya akan bantu menjelaskan lebih lanjut tentang "${inputValue.trim()}".`;
      setTimeout(() => {
        if (!currentSession) return;
        const reply = mentorService.sendMessage(
          currentSessionId,
          currentSession.mentorId,
          currentSession.mentorName,
          "mentor",
          mentorReply
        );
        if (reply) {
          setMessages((prev) => [...prev, reply]);
        }
      }, 1500);
    }

    setInputValue("");
  };

  const filteredSessions = sessionList.filter((s) =>
    s.mentorName.toLowerCase().includes(sessionSearch.toLowerCase()) ||
    s.topic.toLowerCase().includes(sessionSearch.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: "600px" }}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-100 flex flex-col flex-shrink-0">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-base">Sesi Obrolan Aktif</h3>
            <p className="text-xs text-gray-500 mt-0.5">Sesi konsultasi Anda yang telah terkonfirmasi & lunas</p>
          </div>

          {/* Search sessions */}
          <div className="px-3 py-2 border-b border-gray-50">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari obrolan..."
                value={sessionSearch}
                onChange={(e) => setSessionSearch(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-400"
              />
            </div>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto">
            {filteredSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setCurrentSessionId(session.id)}
                className={`w-full text-left p-3 flex items-start gap-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                  currentSessionId === session.id ? "bg-green-50 border-l-2 border-l-green-600" : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-9 h-9 rounded-full overflow-hidden ${getAvatarColor(session.mentorName)} flex items-center justify-center text-white text-xs font-bold`}>
                    <img
                      src={session.mentorImage}
                      alt={session.mentorName}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-900 truncate">{session.mentorName}</p>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">1/4</span>
                  </div>
                  <p className="text-[10px] text-green-700 truncate">Topik: {session.topic}</p>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">
                    {session.lastMessage
                      ? `Halo! Saya ${session.mentorName}. Terima kasih s...`
                      : "Belum ada pesan"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentSession ? (
            <>
              {/* Chat Header */}
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full overflow-hidden ${getAvatarColor(currentSession.mentorName)} flex items-center justify-center text-white font-bold text-sm`}>
                    <img
                      src={currentSession.mentorImage}
                      alt={currentSession.mentorName}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{currentSession.mentorName}</p>
                    <p className="text-xs text-gray-500">Petani Mentor</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">TOPIK KONSULTASI</p>
                  <p className="text-xs font-semibold text-green-700">{currentSession.topic}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 bg-gray-50 flex flex-col gap-3">
                {messages.length > 0 && (
                  <div className="text-center">
                    <span className="text-[10px] text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100">
                      {formatTime(messages[0].timestamp)}
                    </span>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderRole === "pembeli" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.senderRole === "mentor" && (
                      <div className={`w-7 h-7 rounded-full ${getAvatarColor(msg.senderName)} flex items-center justify-center text-white text-[10px] font-bold mr-2 mt-1 flex-shrink-0`}>
                        {getInitials(msg.senderName)}
                      </div>
                    )}
                    <div
                      className={`max-w-[65%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.senderRole === "pembeli"
                          ? "bg-green-700 text-white rounded-tr-sm"
                          : "bg-white text-gray-800 shadow-sm rounded-tl-sm border border-gray-100"
                      }`}
                    >
                      <p
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                        className="leading-relaxed"
                      />
                      <p className={`text-[10px] mt-1 text-right ${msg.senderRole === "pembeli" ? "text-green-200" : "text-gray-400"}`}>
                        {formatShortTime(msg.timestamp)}
                        {msg.senderRole === "pembeli" && " ✓✓"}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ketik pesan obrolan..."
                  className="flex-1 border-none outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <p>Pilih sesi obrolan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
