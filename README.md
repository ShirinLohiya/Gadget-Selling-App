# 🛒 Gadget Selling App

A modern, feature-rich **React Native** mobile application built with **Expo** for buying and selling gadgets. Think smartphones, earbuds, smartwatches, laptops, accessories, and more — all in one sleek marketplace.

> ⚠️ **Frontend Only** — This is a fully functional UI/UX prototype. All data is mocked locally via static JSON files. No backend, database, or real payment gateway is involved.

---

## 📱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo) |
| Navigation | React Navigation v6 (Stack + Bottom Tabs) |
| State Management | Zustand / Context API |
| Mock Data | Static JSON files (local) |
| Auth Simulation | AsyncStorage (persisted mock login state) |
| Payments | UI flow only — no real gateway |
| Local Storage | AsyncStorage (cart, wishlist, orders) |
| Styling | StyleSheet + NativeWind |

---

## 🗂️ Project Structure

```
gadget-selling-app/
├── app/                        # Expo Router file-based routing (if using Expo Router)
│   ├── (auth)/                 # Auth group (unauthenticated routes)
│   │   ├── welcome.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                 # Main tab navigator (authenticated)
│   │   ├── home.tsx
│   │   ├── explore.tsx
│   │   ├── cart.tsx
│   │   ├── wishlist.tsx
│   │   └── profile.tsx
│   ├── product/
│   │   └── [id].tsx            # Dynamic product detail screen
│   ├── checkout/
│   │   ├── index.tsx           # Cart review
│   │   ├── address.tsx         # Delivery address
│   │   └── payment.tsx         # Payment gateway
│   ├── orders/
│   │   ├── index.tsx           # Order history list
│   │   └── [id].tsx            # Order detail & tracking
│   ├── seller/
│   │   ├── dashboard.tsx       # Seller dashboard
│   │   ├── add-product.tsx     # List a new gadget
│   │   └── my-listings.tsx     # Manage existing listings
│   └── _layout.tsx             # Root layout
├── components/                 # Reusable UI components
│   ├── ProductCard.tsx
│   ├── CategoryPill.tsx
│   ├── SearchBar.tsx
│   ├── CartItem.tsx
│   ├── ReviewCard.tsx
│   ├── RatingStars.tsx
│   └── ...
├── store/                      # Global state (Zustand)
│   ├── useCartStore.ts
│   ├── useAuthStore.ts
│   └── useWishlistStore.ts
├── hooks/                      # Custom hooks
├── data/                       # Mock/static data (JSON)
│   ├── products.json
│   ├── categories.json
│   ├── orders.json
│   └── users.json
├── constants/                  # Colors, fonts, sizes
├── assets/                     # Images, icons, fonts
├── app.json
└── package.json
```

---

## 🧭 Full Navigation & Screen Flow

### 1. 🔐 Auth Flow (Unauthenticated Stack)

> Auth is **fully simulated** — no real validation. A mock user object is persisted in AsyncStorage to maintain login state across app restarts.

```
App Launch
    │
    ├── [First Time User] ──────► Welcome / Onboarding Screen
    │                                   │
    │                          ┌────────┴────────┐
    │                          ▼                 ▼
    │                     Login Screen     Register Screen
    │                          │                 │
    │                          └────────┬────────┘
    │                                   │
    │                     (Mock user saved to AsyncStorage)
    │                                   │
    └── [Returning User] ─────► Auto-login (reads AsyncStorage)
                                    │
                                    ▼
                            Main App (Tab Navigator)
```

**Screens:**
- **Welcome / Onboarding** — 3-slide carousel showcasing app features, "Get Started" CTA
- **Login** — Email + Password fields (any input accepted), "Forgot Password" link
- **Register** — Name, Email, Password, Phone Number — stores mock user locally
- **Forgot Password** — Email input → shows a UI success message only

---

### 2. 🏠 Main Tab Navigator (Bottom Tabs)

```
┌──────────────────────────────────────────────┐
│           BOTTOM TAB NAVIGATOR               │
├──────┬───────┬────────┬──────────┬───────────┤
│ Home │Explore│  Cart  │ Wishlist │  Profile  │
└──────┴───────┴────────┴──────────┴───────────┘
```

---

### 3. 🏠 Home Tab

```
Home Screen
    │
    ├── Search Bar ─────────────────► Search Results Screen
    │
    ├── Banner / Deals Carousel
    │       └── Tap Banner ─────────► Product Detail Screen
    │
    ├── Categories Row (horizontal scroll)
    │       └── Tap Category ───────► Category Listing Screen
    │
    ├── Featured Gadgets Grid
    │       └── Tap Product ────────► Product Detail Screen
    │
    ├── Flash Sale Section
    │       └── Tap Product ────────► Product Detail Screen
    │
    └── Brand Spotlights
            └── Tap Brand ──────────► Brand Products Screen
```

**Home Screen Elements:**
- Personalized greeting with user avatar
- Notification bell (badge for unread)
- Hero banner carousel (timed or swipeable)
- Category pills: Phones · Laptops · Audio · Wearables · Accessories · Gaming · Cameras
- Featured / trending products
- Flash Sale countdown timer with product cards
- "Recently Viewed" horizontal list (for returning users)

---

### 4. 🔍 Explore Tab

```
Explore Screen
    │
    ├── Search Bar (auto-focused)
    │
    ├── Filter & Sort Bar
    │       ├── Category
    │       ├── Price Range Slider
    │       ├── Brand
    │       ├── Rating (4★ and above, etc.)
    │       └── Sort: Relevance | Price ↑ | Price ↓ | Newest | Popular
    │
    ├── Product Grid / List (toggle view)
    │       └── Tap Product ────────► Product Detail Screen
    │
    └── Pagination / Infinite Scroll
```

---

### 5. 📦 Product Detail Screen

```
Product Detail Screen
    │
    ├── Image Gallery (swipeable, zoom-enabled)
    ├── Product Name, Brand, Rating
    ├── Price (with discount % badge)
    ├── Color / Storage / Variant Selector
    ├── Quantity Picker
    │
    ├── [Add to Cart] Button ───────► Cart Screen (with toast notification)
    ├── [Buy Now] Button ───────────► Checkout Flow
    ├── [♡ Wishlist] Toggle
    │
    ├── Product Description (expandable)
    ├── Specifications Table
    │
    ├── Seller Info Card
    │       └── Tap ────────────────► Seller Profile Screen
    │
    ├── Reviews & Ratings Section
    │       └── Tap "See All" ──────► All Reviews Screen
    │
    └── Related Products (horizontal scroll)
            └── Tap ─────────────────► Product Detail Screen
```

---

### 6. 🛒 Cart Tab

```
Cart Screen
    │
    ├── Cart Items List
    │       ├── Quantity +/- controls
    │       ├── Remove Item
    │       └── Save to Wishlist
    │
    ├── Promo Code / Coupon Input
    │
    ├── Price Summary Card
    │       ├── Subtotal
    │       ├── Discount
    │       ├── Delivery Charges
    │       └── Total Amount
    │
    └── [Proceed to Checkout] ──────► Checkout Flow
```

---

### 7. 💳 Checkout Flow (Stack Navigator)

```
Cart Screen
    │
    ▼
Step 1: Address Screen
    ├── Saved Addresses List
    ├── [Add New Address] ──────────► Add/Edit Address Screen
    └── [Continue] ─────────────────► Step 2
    │
    ▼
Step 2: Order Summary Screen
    ├── Review items, address, totals
    └── [Proceed to Pay] ───────────► Step 3
    │
    ▼
Step 3: Payment Screen (UI only — no real transaction)
    ├── UPI / Net Banking / Card / COD options (visual selection only)
    └── [Pay Now] — simulates a brief loading state
    │
    └── ✅ Mock Success ──────────────► Order Confirmation Screen
                                              └── [Track Order] ► Order Tracking
```

---

### 8. ❤️ Wishlist Tab

```
Wishlist Screen
    │
    ├── Saved Products Grid
    │       ├── Tap Product ────────► Product Detail Screen
    │       └── [Move to Cart]
    │
    └── [Share Wishlist] (social share)
```

---

### 9. 👤 Profile Tab

```
Profile Screen
    │
    ├── User Avatar + Name + Email
    │
    ├── [My Orders] ───────────────► Orders Screen
    │       └── Tap Order ─────────► Order Detail + Tracking Screen
    │
    ├── [My Addresses] ────────────► Address Manager Screen
    │
    ├── [Become a Seller] ─────────► Seller Onboarding Screen
    │       └── (if already seller) ► Seller Dashboard
    │
    ├── [Notifications] ───────────► Notification Settings Screen
    │
    ├── [Settings]
    │       ├── Dark Mode Toggle
    │       ├── Language Preference
    │       ├── Change Password
    │       └── Delete Account
    │
    ├── [Help & Support] ──────────► Support / FAQ Screen
    │       └── [Chat with Support]
    │
    └── [Logout] ──────────────────► Welcome Screen
```

---

### 10. 🏪 Seller Flow (Stack Navigator)

> Seller onboarding is **UI-only** — no real verification or bank integration. All listings and order data are managed in local state.

```
Seller Onboarding (first time)
    ├── Business Name & Category (form — stored locally)
    └── "You're now a Seller!" success screen (instant, no real review)
    │
    ▼
Seller Dashboard
    ├── Sales Overview (charts with dummy data)
    │
    ├── [My Listings] ─────────────► Listings Screen
    │       ├── Active / Inactive toggle (local state)
    │       ├── Edit Listing ──────► Edit Product Screen
    │       └── [Add New Product] ─► Add Product Screen
    │              ├── Product Name, Category, Description
    │              ├── Price, Discount
    │              ├── Stock Quantity
    │              ├── Pick Images (from local device / mock URLs)
    │              └── Variants (Color, Storage, etc.)
    │
    ├── [Mock Orders to Fulfill] ──► Seller Orders Screen
    │       └── Tap to toggle status (Pending → Shipped → Delivered)
    │
    └── [Earnings Overview] ───────► Static earnings UI screen
```

---

### 11. 📬 Orders & Tracking

> Orders are created locally on checkout and persisted via AsyncStorage. Tracking stages are simulated with a static timeline UI.

```
Orders Screen
    │
    └── Order Card (status badge: Placed | Packed | Shipped | Delivered | Cancelled)
            │
            ▼
        Order Detail Screen
            ├── Items Ordered
            ├── Delivery Address
            ├── Payment Method (as selected)
            ├── Simulated Tracking Timeline
            │       └── Stages: Placed → Confirmed → Packed → Shipped → Delivered
            ├── [Cancel Order] (updates local state only)
            └── [Return / Refund] (UI form only)
```

---

### 12. 🔔 Notifications Screen

> Notifications are **static / pre-seeded mock data** — no real push notification service.

```
Notifications Screen
    │
    ├── Mock Order Updates
    ├── Flash Sale Alerts (hardcoded)
    ├── Price Drop Alerts (based on wishlist items in local state)
    ├── Promotional Offers (static)
    └── Tap Notification ──────────► Relevant Screen (Product / Order)
```

---

## 🔄 Full App Flow Summary

```
┌──────────┐    ┌──────────┐    ┌────────────────────────────────────────────────┐
│  Launch  │───►│   Auth   │───►│                  Main App                      │
│  Screen  │    │   Flow   │    │  ┌────────────────────────────────────────────┐ │
└──────────┘    └──────────┘    │  │            Bottom Tab Navigator             │ │
                                │  ├─────────┬────────┬───────┬──────┬──────────┤ │
                                │  │  Home   │Explore │ Cart  │ ♡   │ Profile  │ │
                                │  └────┬────┴───┬────┴───┬───┴──┬───┴────┬─────┘ │
                                │       │        │        │      │        │        │
                                │  Products  Products  Checkout Orders  Seller    │
                                │  Detail    Listing   Flow    Track   Dashboard  │
                                └──────────────────────────────────────────────────┘
```

---

## 🎨 Design System (Planned)

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

## 📋 Key Feature Checklist

### Buyer Features
- [x] Browse & search gadgets (mock JSON data)
- [x] Category & brand filtering (client-side)
- [x] Product detail with image gallery
- [x] Add to cart & wishlist (AsyncStorage persisted)
- [x] Apply coupons & promo codes (hardcoded codes, UI feedback)
- [x] Multi-step checkout UI (address → summary → payment)
- [x] Simulated order placement & order history (AsyncStorage)
- [x] Static order tracking timeline UI
- [x] Write & view reviews (stored locally)

### Seller Features
- [x] Seller onboarding UI (instant, no real verification)
- [x] Add / edit / delete product listings (local state)
- [x] Manage stock & variants (UI only)
- [x] View & toggle mock order statuses
- [x] Sales analytics UI (dummy chart data)
- [x] Earnings overview screen (static UI)

### Platform Features
- [x] Simulated auth with AsyncStorage session persistence
- [x] Dark mode support
- [x] Smooth animations (React Native Reanimated)
- [x] Fully offline — zero network dependency
- [x] Persistent cart, wishlist & orders via AsyncStorage
- [x] Static notification feed

---

## 🤝 Contributing

This project is currently in early development. No external contributions yet. Stay tuned.

---

## 📄 License

MIT © Shirin Lohiya
