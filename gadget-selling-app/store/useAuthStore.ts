import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'buyer' | 'seller' | null;

export interface MockUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  businessName?: string; // for sellers
}

interface AuthState {
  user: MockUser | null;
  role: UserRole;
  isLoggedIn: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  setRole: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
}

const STORAGE_KEYS = {
  USER: '@gadget_user',
  ROLE: '@gadget_role',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoggedIn: false,
  isLoading: true,

  loadSession: async () => {
    try {
      const [userStr, role] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.ROLE),
      ]);
      if (userStr && role) {
        set({
          user: JSON.parse(userStr),
          role: role as UserRole,
          isLoggedIn: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  login: async (email: string, _password: string) => {
    // Mock login — any credentials accepted
    const user: MockUser = {
      id: 'mock_user',
      name: email.split('@')[0].replace(/[._]/g, ' '),
      email,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    set({ user, isLoggedIn: true });
  },

  register: async (name: string, email: string, _password: string, phone: string) => {
    const user: MockUser = {
      id: 'mock_user',
      name,
      email,
      phone,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      businessName: `${name}'s Store`,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    set({ user, isLoggedIn: true });
  },

  setRole: async (role: UserRole) => {
    if (role) await AsyncStorage.setItem(STORAGE_KEYS.ROLE, role);
    set({ role });
  },

  logout: async () => {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.USER),
      AsyncStorage.removeItem(STORAGE_KEYS.ROLE),
    ]);
    set({ user: null, role: null, isLoggedIn: false });
  },
}));
