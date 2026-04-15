# 🛒 Gadget Selling App

A modern **React Native** mobile application built with **Expo** for buying and selling gadgets — smartphones, earbuds, smartwatches, laptops, accessories, and more.

> ⚠️ **Frontend Only** — All data is mocked locally via static JSON files and AsyncStorage. No backend, database, or real payment gateway involved.

---

## 📱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo) |
| Navigation | React Navigation v6 (Stack + Bottom Tabs) |
| State Management | Zustand / Context API |
| Mock Data | Static JSON files (local) |
| Session | AsyncStorage (persisted mock login + role) |
| Payments | UI flow only — no real gateway |
| Local Storage | AsyncStorage (cart, wishlist, listings, orders) |
| Styling | StyleSheet + NativeWind |

---

## 🧭 Core App Flow

```
App Launch
    │
    ▼
┌─────────────────────┐
│  Onboarding Screen  │  (first time only)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│    Login Screen     │  ──► Register Screen
└─────────┬───────────┘
          │
          ▼
┌──────────────────────────┐
│   Role Selection Screen  │
│                          │
│   [ 🛍️ I'm a Buyer ]    │
│   [ 🏪 I'm a Seller ]   │
└────────┬─────────────────┘
         │
   ┌─────┴──────┐
   ▼            ▼
Buyer        Seller
Dashboard    Dashboard
```

> The selected role is saved to AsyncStorage. On returning visits, the user is taken directly to their dashboard — skipping role selection.

---

## 🗂️ Project Structure

```
gadget-selling-app/
├── app/
│   ├── (auth)/
│   │   ├── onboarding.tsx       # First-time welcome slides
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── role-select.tsx      # Buyer or Seller choice
│   ├── (buyer)/                 # Buyer tab navigator
│   │   ├── home.tsx
│   │   ├── explore.tsx
│   │   ├── cart.tsx
│   │   ├── wishlist.tsx
│   │   └── profile.tsx
│   ├── (seller)/                # Seller tab navigator
│   │   ├── dashboard.tsx
│   │   ├── listings.tsx
│   │   ├── add-product.tsx
│   │   ├── inquiries.tsx        # Messages/contacts from buyers
│   │   └── profile.tsx
│   ├── product/
│   │   └── [id].tsx             # Shared product detail screen
│   ├── checkout/
│   │   ├── address.tsx
│   │   ├── summary.tsx
│   │   └── payment.tsx
│   ├── orders/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   └── _layout.tsx
├── components/
│   ├── ProductCard.tsx
│   ├── CategoryPill.tsx
│   ├── SearchBar.tsx
│   ├── CartItem.tsx
│   ├── ReviewCard.tsx
│   └── ...
├── store/
│   ├── useAuthStore.ts          # role + mock user session
│   ├── useCartStore.ts
│   ├── useWishlistStore.ts
│   └── useListingsStore.ts      # seller's products
├── data/
│   ├── products.json
│   ├── categories.json
│   └── mockOrders.json
├── constants/
├── assets/
├── app.json
└── package.json
```

---

## 🔐 Auth Flow

```
App Launch
    │
    ├── No session ──► Onboarding ──► Login / Register ──► Role Selection
    │
    └── Session found (AsyncStorage)
            │
            ├── role = "buyer"  ──► Buyer Dashboard
            └── role = "seller" ──► Seller Dashboard
```

**Screens:**

| Screen | Description |
|---|---|
| Onboarding | 3-slide feature carousel, shown only on first launch |
| Login | Email + Password (mock — any input accepted) |
| Register | Name, Email, Password, Phone — saves mock user to AsyncStorage |
| Role Selection | Two cards: **Buyer** or **Seller** — choice saved to AsyncStorage |

---

## 🛍️ Buyer Flow

### Bottom Tab Navigator (Buyer)

```
┌────────────────────────────────────────────────────┐
│               BUYER TAB NAVIGATOR                  │
├─────────┬──────────┬────────┬──────────┬───────────┤
│  Home   │ Explore  │  Cart  │ Wishlist │  Profile  │
└─────────┴──────────┴────────┴──────────┴───────────┘
```

---

### 🏠 Home Tab
```
Home Screen
    │
    ├── Search Bar ──────────────────► Explore Screen (pre-filtered)
    ├── Hero Banner Carousel
    │       └── Tap ─────────────────► Product Detail
    ├── Categories Row (horizontal)
    │       └── Tap Category ─────────► Explore Screen (filtered)
    ├── Featured Gadgets Grid
    │       └── Tap ─────────────────► Product Detail
    └── Flash Sale Section
            └── Tap ─────────────────► Product Detail
```

**Elements:** Personalised greeting, notification bell, category pills (Phones · Laptops · Audio · Wearables · Accessories · Gaming · Cameras), flash sale countdown timer.

---

### 🔍 Explore Tab
```
Explore Screen
    │
    ├── Search Bar (auto-focused)
    ├── Filters: Category | Price Range | Brand | Rating
    ├── Sort: Relevance | Price ↑↓ | Newest | Popular
    └── Product Grid / List (toggle)
            └── Tap ─────────────────► Product Detail
```

---

### 📦 Product Detail Screen *(shared — navigated from anywhere)*
```
Product Detail
    │
    ├── Image Gallery (swipeable)
    ├── Name, Brand, Rating, Price + Discount Badge
    ├── Variant Selector (Color / Storage)
    ├── Quantity Picker
    │
    ├── [Add to Cart] ───────────────► Cart (toast shown)
    ├── [Buy Now] ───────────────────► Checkout Flow
    ├── [♡ Wishlist] Toggle
    │
    ├── Description + Specs Table
    ├── Reviews Section
    │       └── [See All] ───────────► All Reviews Screen
    └── Related Products
            └── Tap ─────────────────► Product Detail
```

---

### 🛒 Cart Tab
```
Cart Screen
    │
    ├── Cart Items (quantity +/-, remove, save to wishlist)
    ├── Promo Code Input (hardcoded valid codes)
    ├── Price Summary (subtotal, discount, delivery, total)
    └── [Proceed to Checkout] ───────► Checkout Flow
```

---

### 💳 Checkout Flow
```
Cart
  │
  ▼
Step 1 — Address Screen
    ├── Saved Addresses
    ├── [+ Add New Address]
    └── [Continue]
  │
  ▼
Step 2 — Order Summary
    ├── Review items, address, total
    └── [Proceed to Pay]
  │
  ▼
Step 3 — Payment Screen (UI only)
    ├── Select: UPI | Card | Net Banking | COD
    └── [Pay Now] → brief loading animation
  │
  ▼
✅ Order Confirmation Screen
    └── [Track My Order] ────────────► Order Tracking
```

---

### ❤️ Wishlist Tab
```
Wishlist Screen
    ├── Saved Products Grid
    │       ├── Tap ─────────────────► Product Detail
    │       └── [Move to Cart]
    └── Empty state illustration (if no items)
```

---

### 👤 Buyer Profile Tab
```
Profile Screen
    ├── Avatar, Name, Email
    ├── [My Orders] ─────────────────► Orders Screen
    │       └── Tap Order ───────────► Order Detail + Tracking Timeline
    ├── [My Addresses]
    ├── [Settings] (Dark Mode, Change Password)
    ├── [Help & Support]
    └── [Logout] ────────────────────► Role Selection Screen
```

---

## 🏪 Seller Flow

### Bottom Tab Navigator (Seller)

```
┌──────────────────────────────────────────────────────┐
│                SELLER TAB NAVIGATOR                  │
├─────────────┬──────────────┬────────────┬────────────┤
│  Dashboard  │   Listings   │ Inquiries  │  Profile   │
└─────────────┴──────────────┴────────────┴────────────┘
```

---

### 📊 Dashboard Tab
```
Seller Dashboard
    │
    ├── Summary Cards
    │       ├── Total Listings
    │       ├── Total Inquiries (unread badge)
    │       └── Mock Revenue (static dummy data)
    │
    ├── Recent Inquiries (preview list)
    │       └── Tap ─────────────────► Inquiries Tab
    │
    └── Quick Actions
            ├── [+ Add New Listing] ─► Add Product Screen
            └── [View All Listings] ─► Listings Tab
```

---

### 📋 Listings Tab
```
Listings Screen
    │
    ├── My Products Grid (from local state / mock data)
    │       ├── [Edit] ──────────────► Edit Product Screen
    │       │       ├── Edit name, price, description, images, variants
    │       │       └── [Save Changes] (updates local state)
    │       │
    │       └── [Delete] ────────────► Confirm dialog → removes from list
    │
    └── [+ Add New Listing] ─────────► Add Product Screen
            ├── Product Name
            ├── Category
            ├── Price + Discount
            ├── Description
            ├── Pick Images (local device / mock URLs)
            ├── Variants (Color, Storage, etc.)
            └── [Publish Listing] (adds to local listings state)
```

---

### 💬 Inquiries Tab
*(Buyers can tap "Contact Seller" on a product — seller sees the messages here)*
```
Inquiries Screen
    │
    ├── List of buyer inquiries (mock data + any submitted via product page)
    │       ├── Buyer name, product they asked about, message preview
    │       └── Tap ─────────────────► Inquiry Detail Screen
    │                                       ├── Full message
    │                                       ├── Product snapshot
    │                                       └── [Reply] (UI only — no real messaging)
    │
    └── Unread badge shown on tab icon
```

---

### 👤 Seller Profile Tab
```
Profile Screen
    ├── Avatar, Business Name, Email
    ├── [Settings] (Dark Mode, Change Password)
    ├── [Help & Support]
    └── [Logout] ────────────────────► Role Selection Screen
```

---

## 🔄 Complete App Flow Summary

```
┌─────────────┐
│ App Launch  │
└──────┬──────┘
       │
  AsyncStorage?
  ┌────┴─────────────────────┐
  │ No session               │ Session exists
  ▼                          │
Onboarding                   ├── role=buyer  ──► Buyer Tabs
  │                          └── role=seller ──► Seller Tabs
  ▼
Login / Register
  │
  ▼
Role Selection
  │
  ├── Buyer  ──────────────► [ Home | Explore | Cart | Wishlist | Profile ]
  │                                │
  │                         Product Detail ──► Checkout ──► Order Confirmation
  │
  └── Seller ──────────────► [ Dashboard | Listings | Inquiries | Profile ]
                                     │
                              Add / Edit / Delete Listings
                              View & Reply to Buyer Inquiries
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Color | `#6C5CE7` (Electric Violet) |
| Accent Color | `#00CEC9` (Robin's Egg Blue) |
| Background | `#0F0F13` (Deep Dark) |
| Surface | `#1A1A24` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `#A0A0B0` |
| Success | `#00B894` |
| Warning | `#FDCB6E` |
| Error | `#D63031` |
| Font | **Inter** (via Expo Google Fonts) |
| Border Radius | `8dp`, `12dp`, `16dp` |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start Expo dev server
npx expo start

# Run on Android emulator / device
npx expo start --android

# Run on iOS simulator / device
npx expo start --ios

# Run in web browser (quick preview)
npx expo start --web
```

> No `.env` file or API keys required — this is a fully offline, frontend-only app.

---

## 📋 Feature Checklist

### Buyer
- [ ] Onboarding carousel
- [ ] Mock login / register
- [ ] Role selection (saved to AsyncStorage)
- [ ] Home feed (banners, categories, featured, flash sale)
- [ ] Explore with filters & sort
- [ ] Product detail (gallery, variants, specs, reviews)
- [ ] Add to cart & wishlist (AsyncStorage)
- [ ] Promo code (hardcoded)
- [ ] Multi-step checkout UI
- [ ] Order confirmation + tracking timeline

### Seller
- [ ] Seller dashboard (summary cards, quick actions)
- [ ] Add / Edit / Delete listings (local state)
- [ ] Inquiries list + detail view
- [ ] Unread inquiry badge

### Platform
- [ ] Role-based navigation (buyer vs seller)
- [ ] AsyncStorage session persistence
- [ ] Dark mode
- [ ] Smooth animations (React Native Reanimated)
- [ ] Fully offline — zero network dependency

---

## 📄 License

MIT © Shirin Lohiya
