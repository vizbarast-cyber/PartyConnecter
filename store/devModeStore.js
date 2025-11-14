import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useDevModeStore = create((set, get) => ({
  isDevMode: false,
  tapCount: 0,
  lastTapTime: 0,
  shouldShowModal: false,
  checkDevMode: async () => {
    const devMode = await AsyncStorage.getItem('devMode');
    set({ isDevMode: devMode === 'true' });
  },
  handleLogoPress: () => {
    const now = Date.now();
    const state = get();
    
    // Reset if more than 2 seconds passed
    if (now - state.lastTapTime > 2000) {
      set({ tapCount: 1, lastTapTime: now, shouldShowModal: false });
      return;
    }
    
    const newCount = state.tapCount + 1;
    
    if (newCount >= 10) {
      // Trigger modal before resetting
      set({ tapCount: 0, lastTapTime: 0, shouldShowModal: true });
      return;
    }
    
    set({ tapCount: newCount, lastTapTime: now, shouldShowModal: false });
  },
  clearModalFlag: () => {
    set({ shouldShowModal: false });
  },
  unlockDevMode: async (password) => {
    if (password === 'tomasdievas') {
      await AsyncStorage.setItem('devMode', 'true');
      set({ isDevMode: true, tapCount: 0 });
      return true;
    }
    return false;
  },
  lockDevMode: async () => {
    await AsyncStorage.removeItem('devMode');
    set({ isDevMode: false });
  },
}));

