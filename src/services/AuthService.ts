import type { User } from '@/types';
import { mockUsers } from '@/data/mockData';

const USERS_STORAGE_KEY = 'panenku_users';
const CURRENT_USER_STORAGE_KEY = 'panenku_current_user';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'pembeli' | 'penjual';
  phone?: string;
  location?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export class AuthService {
  private initUsers(): User[] {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse users from localStorage', e);
    }
    // Default to mock users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
    return mockUsers;
  }

  public getUsers(): User[] {
    return this.initUsers();
  }

  public getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse current user from localStorage', e);
    }
    return null;
  }

  public login(email: string, _password?: string): AuthResult {
    const trimmedEmail = email.trim().toLowerCase();
    const users = this.getUsers();

    const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      return {
        success: false,
        error: 'Email tidak ditemukan. Silakan periksa kembali atau daftar akun baru.',
      };
    }

    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
    return {
      success: true,
      user,
    };
  }

  public register(payload: RegisterPayload): AuthResult {
    const trimmedEmail = payload.email.trim().toLowerCase();
    const trimmedName = payload.name.trim();

    if (!trimmedName) {
      return { success: false, error: 'Nama lengkap wajib diisi.' };
    }
    if (!trimmedEmail) {
      return { success: false, error: 'Email wajib diisi.' };
    }
    if (!payload.password || payload.password.length < 6) {
      return { success: false, error: 'Kata sandi minimal 6 karakter.' };
    }

    const users = this.getUsers();
    const exists = users.some((u) => u.email.toLowerCase() === trimmedEmail);

    if (exists) {
      return {
        success: false,
        error: 'Email ini sudah terdaftar. Silakan gunakan email lain atau masuk.',
      };
    }

    const newUser: User = {
      id: String(Date.now()),
      name: trimmedName,
      email: trimmedEmail,
      role: payload.role,
      phone: payload.phone?.trim() || undefined,
      location: payload.location?.trim() || undefined,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(newUser));

    return {
      success: true,
      user: newUser,
    };
  }

  public logout(): void {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }
}

export const authService = new AuthService();
