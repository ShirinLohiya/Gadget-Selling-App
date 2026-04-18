import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItemType {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

interface CartState {
  items: CartItemType[];
  promoCode: string;
  promoDiscount: number; // percentage
  isLoaded: boolean;

  // Actions
  loadCart: () => Promise<void>;
  addItem: (item: Omit<CartItemType, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;

  // Computed selectors (call as functions)
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const STORAGE_KEY = '@gadget_cart';
const VALID_PROMOS: Record<string, number> = {
  GADGET10: 10,
  SALE20: 20,
  TECH15: 15,
};

const persistCart = async (items: CartItemType[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  promoCode: '',
  promoDiscount: 0,
  isLoaded: false,

  loadCart: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) set({ items: JSON.parse(stored) });
    } catch {}
    set({ isLoaded: true });
  },

  addItem: (item) => {
    const { items } = get();
    const existing = items.find((i) => i.productId === item.productId);
    let newItems: CartItemType[];
    if (existing) {
      newItems = items.map((i) =>
        i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newItems = [...items, { ...item, quantity: 1 }];
    }
    set({ items: newItems });
    persistCart(newItems);
  },

  removeItem: (productId) => {
    const newItems = get().items.filter((i) => i.productId !== productId);
    set({ items: newItems });
    persistCart(newItems);
  },

  updateQty: (productId, qty) => {
    if (qty <= 0) {
      get().removeItem(productId);
      return;
    }
    const newItems = get().items.map((i) =>
      i.productId === productId ? { ...i, quantity: qty } : i
    );
    set({ items: newItems });
    persistCart(newItems);
  },

  clearCart: () => {
    set({ items: [], promoCode: '', promoDiscount: 0 });
    AsyncStorage.removeItem(STORAGE_KEY);
  },

  applyPromo: (code) => {
    const discount = VALID_PROMOS[code.toUpperCase()];
    if (discount) {
      set({ promoCode: code.toUpperCase(), promoDiscount: discount });
      return true;
    }
    return false;
  },

  removePromo: () => set({ promoCode: '', promoDiscount: 0 }),

  getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  getDiscount: () => {
    const subtotal = get().getSubtotal();
    return Math.round(subtotal * (get().promoDiscount / 100));
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscount();
    const delivery = subtotal > 50000 ? 0 : 99;
    return subtotal - discount + delivery;
  },

  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
