// ─────────────────────────────────────────────
//  Design System — Gadget Selling App
//  Author: Person E (Core Infrastructure)
// ─────────────────────────────────────────────

export const Colors = {
  primary: '#6C5CE7',       // Electric Violet
  primaryLight: '#8B7FF0',
  primaryDark: '#5244C5',
  accent: '#00CEC9',        // Robin's Egg Blue
  accentLight: '#33DBD6',

  background: '#0F0F13',    // Deep Dark
  surface: '#1A1A24',       // Card/Surface
  surfaceAlt: '#22222F',    // Slightly lighter surface
  border: '#2C2C3E',

  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
  textMuted: '#606070',

  success: '#00B894',
  warning: '#FDCB6E',
  error: '#D63031',
  info: '#74B9FF',

  // Gradient stops
  gradientStart: '#6C5CE7',
  gradientEnd: '#00CEC9',

  // Tab bar
  tabActive: '#6C5CE7',
  tabInactive: '#606070',
  tabBar: '#12121A',
} as const;

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  primary: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
} as const;

export const Animation = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;
