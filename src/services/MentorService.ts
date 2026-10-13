import type { Mentor, ChatSession, ChatMessage, MentorCategory } from '@/types';
import { mockChatSessions } from '@/data/mockData';

export interface MentorFilterCriteria {
  query?: string;
  category?: MentorCategory | 'Semua';
}

export class MentorService {
  private mentors: Mentor[];
  private sessions: ChatSession[];

  constructor(mentors: Mentor[]) {
    this.mentors = mentors;
    this.sessions = [...mockChatSessions];
  }

  getAll(): Mentor[] {
    return this.mentors;
  }

  getById(id: string): Mentor | undefined {
    return this.mentors.find((m) => m.id === id);
  }

  filter(criteria: MentorFilterCriteria): Mentor[] {
    return this.mentors.filter((mentor) => {
      const matchQuery =
        !criteria.query ||
        mentor.name.toLowerCase().includes(criteria.query.toLowerCase()) ||
        mentor.expertise.toLowerCase().includes(criteria.query.toLowerCase()) ||
        mentor.specializations.some((s) =>
          s.toLowerCase().includes(criteria.query!.toLowerCase())
        );

      const matchCategory =
        !criteria.category ||
        criteria.category === 'Semua' ||
        mentor.category === criteria.category;

      return matchQuery && matchCategory;
    });
  }

  getCategories(): MentorCategory[] {
    const cats = new Set(this.mentors.map((m) => m.category));
    return Array.from(cats);
  }

  getSessionsByBuyer(buyerId: string): ChatSession[] {
    return this.sessions.filter((s) => s.buyerId === buyerId);
  }

  getSessionById(sessionId: string): ChatSession | undefined {
    return this.sessions.find((s) => s.id === sessionId);
  }

  startSession(
    mentor: Mentor,
    buyerId: string,
    buyerName: string,
    topic: string
  ): ChatSession {
    const sessionId = `session-${Date.now()}`;
    const now = new Date().toISOString();
    const greetingMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId,
      senderId: mentor.id,
      senderName: mentor.name,
      senderRole: 'mentor',
      content: `Halo! Saya ${mentor.name}. Terima kasih sudah memesan sesi konsultasi dengan topik "${topic}". Ada yang bisa saya bantu hari ini?`,
      timestamp: now,
      isRead: false,
    };
    const session: ChatSession = {
      id: sessionId,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorImage: mentor.image,
      buyerId,
      buyerName,
      topic,
      status: 'aktif',
      createdAt: now,
      isPaid: true,
      messages: [greetingMsg],
      lastMessage: greetingMsg,
    };
    this.sessions.push(session);
    return session;
  }

  sendMessage(
    sessionId: string,
    senderId: string,
    senderName: string,
    senderRole: 'pembeli' | 'mentor',
    content: string
  ): ChatMessage | null {
    const session = this.sessions.find((s) => s.id === sessionId);
    if (!session) return null;

    const msg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      sessionId,
      senderId,
      senderName,
      senderRole,
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    session.messages.push(msg);
    session.lastMessage = msg;
    return msg;
  }
}

