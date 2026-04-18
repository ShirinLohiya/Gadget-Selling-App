import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistState {
  productIds: string[];
  isLoaded: boolean;

  loadWishlist: () => Promise<void>;
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clear: () => void;
}

const STORAGE_KEY = '@gadget_wishlist';

export const useWishlistStore = create<WishlistState>((set, get) => ({
  productIds: [],
  isLoaded: false,

  loadWishlist: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) set({ productIds: JSON.parse(stored) });
    } catch {}
    set({ isLoaded: true });
  },

  toggle: (productId) => {
    const { productIds } = get();
    const newIds = productIds.includes(productId)
      ? productIds.filter((id) => id !== productId)
      : [...productIds, productId];
    set({ productIds: newIds });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
  },

  isWishlisted: (productId) => get().productIds.includes(productId),

  clear: () => {
    set({ productIds: [] });
    AsyncStorage.removeItem(STORAGE_KEY);
  },
}));
