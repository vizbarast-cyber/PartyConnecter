import { create } from 'zustand';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { api } from '../services/api';

export const useAuthStore = create((set) => ({
  user: null,
  userProfile: null,
  loading: true,
  setUser: async (firebaseUser) => {
    set({ user: firebaseUser, loading: false });
    if (firebaseUser) {
      try {
        // Add timeout to prevent hanging (reduced to 5 seconds)
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 5000)
        );
        
        const response = await Promise.race([
          api.get('/user/me'),
          timeoutPromise
        ]);
        
        if (response.data?.user) {
          set({ userProfile: response.data.user });
        }
      } catch (error) {
        // Silently handle errors - user might be in the process of being created
        // Only log if it's not a 404 (user not found yet) or network error
        if (error.response?.status !== 404 && error.response?.status !== 401 && error.message !== 'Request timeout') {
          console.error('Error fetching user profile:', error.response?.status || error.message);
        }
        // Don't set userProfile to null on error - keep existing profile if available
        // App will continue to work even if profile fetch fails
      }
    } else {
      set({ userProfile: null });
    }
  },
  signOut: async () => {
    await signOut(auth);
    set({ user: null, userProfile: null });
  },
  updateUserProfile: (profile) => {
    set((state) => ({
      userProfile: { ...state.userProfile, ...profile },
    }));
  },
}));

