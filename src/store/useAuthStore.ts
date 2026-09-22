/**
 * Zustand Auth State Store
 * Manages public/guest mode for Exam 1, ready for full auth in Exam 2
 */

import { create } from 'zustand';
import { User } from '@/models/User';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  loginAsGuest: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: {
    id: 'guest-user',
    name: 'Student Evaluator',
    email: 'guest@fpt.edu.vn',
    role: 'GUEST',
  },
  isAuthenticated: true,
  isGuest: true,

  loginAsGuest: () =>
    set({
      user: {
        id: 'guest-user',
        name: 'Student Evaluator',
        email: 'guest@fpt.edu.vn',
        role: 'GUEST',
      },
      isAuthenticated: true,
      isGuest: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isGuest: false,
    }),
}));
