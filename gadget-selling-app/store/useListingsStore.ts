import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Listing {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  images: string[];
  variants: {
    colors?: string[];
    storage?: string[];
  };
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  productId: string;
  productName: string;
  buyerName: string;
  buyerEmail: string;
  message: string;
  reply?: string;
  isRead: boolean;
  createdAt: string;
}

interface ListingsState {
  listings: Listing[];
  inquiries: Inquiry[];
  isLoaded: boolean;

  // Listings CRUD
  loadListings: () => Promise<void>;
  addListing: (listing: Omit<Listing, 'id' | 'createdAt'>) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  removeListing: (id: string) => void;

  // Inquiries
  loadInquiries: () => void;
  markInquiryRead: (id: string) => void;
  replyToInquiry: (id: string, reply: string) => void;
  getUnreadCount: () => number;
}

const STORAGE_KEY = '@gadget_listings';

// Mock inquiries seeded for demo
const SEED_INQUIRIES: Inquiry[] = [
  {
    id: 'inq001',
    productId: 'DEMO_001',
    productName: 'Your Featured Gadget',
    buyerName: 'Arjun Sharma',
    buyerEmail: 'arjun@example.com',
    message: 'Hi! Is this product available in bulk? I need 5 units for my office.',
    isRead: false,
    createdAt: '2026-04-17T09:30:00Z',
  },
  {
    id: 'inq002',
    productId: 'DEMO_001',
    productName: 'Your Featured Gadget',
    buyerName: 'Priya Mehta',
    buyerEmail: 'priya@example.com',
    message: 'Does this come with a warranty? Can you ship to Hyderabad?',
    isRead: false,
    createdAt: '2026-04-16T15:00:00Z',
  },
  {
    id: 'inq003',
    productId: 'DEMO_002',
    productName: 'Budget Laptop',
    buyerName: 'Rohit Gupta',
    buyerEmail: 'rohit@example.com',
    message: 'Can you negotiate the price? My budget is ₹45,000.',
    reply: 'Hi Rohit! The best I can do is ₹46,500 with free delivery.',
    isRead: true,
    createdAt: '2026-04-15T11:00:00Z',
  },
];

// Mock initial listings for demo
const SEED_LISTINGS: Listing[] = [
  {
    id: 'DEMO_001',
    name: 'My Featured Gadget',
    category: 'Phones',
    price: 45000,
    originalPrice: 52000,
    discount: 13,
    description: 'A top-quality phone in excellent condition.',
    images: ['https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400&q=80'],
    variants: { colors: ['Black', 'White'] },
    stock: 5,
    isActive: true,
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'DEMO_002',
    name: 'Budget Laptop',
    category: 'Laptops',
    price: 48000,
    originalPrice: 55000,
    discount: 13,
    description: 'Refurbished laptop, great for student use.',
    images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80'],
    variants: { storage: ['256GB', '512GB'] },
    stock: 3,
    isActive: true,
    createdAt: '2026-04-05T00:00:00Z',
  },
];

export const useListingsStore = create<ListingsState>((set, get) => ({
  listings: SEED_LISTINGS,
  inquiries: SEED_INQUIRIES,
  isLoaded: false,

  loadListings: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) set({ listings: JSON.parse(stored) });
    } catch {}
    set({ isLoaded: true });
  },

  addListing: (data) => {
    const newListing: Listing = {
      ...data,
      id: `listing_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const newListings = [newListing, ...get().listings];
    set({ listings: newListings });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newListings));
  },

  updateListing: (id, updates) => {
    const newListings = get().listings.map((l) => (l.id === id ? { ...l, ...updates } : l));
    set({ listings: newListings });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newListings));
  },

  removeListing: (id) => {
    const newListings = get().listings.filter((l) => l.id !== id);
    set({ listings: newListings });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newListings));
  },

  loadInquiries: () => {
    // Already seeded above — in a real app this would fetch from storage
  },

  markInquiryRead: (id) => {
    set((state) => ({
      inquiries: state.inquiries.map((i) => (i.id === id ? { ...i, isRead: true } : i)),
    }));
  },

  replyToInquiry: (id, reply) => {
    set((state) => ({
      inquiries: state.inquiries.map((i) =>
        i.id === id ? { ...i, reply, isRead: true } : i
      ),
    }));
  },

  getUnreadCount: () => get().inquiries.filter((i) => !i.isRead).length,
}));
