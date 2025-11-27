// Color constants for MagicCard
export const COLORS = {
  // Primary - Purple (Фіолетовий)
  PURPLE_MAIN: '#8B5CF6',
  PURPLE_DARK: '#6D28D9',
  PURPLE_LIGHT: '#DDD6FE',

  // Secondary - Gold (Золотий)
  GOLD_MAIN: '#F59E0B',
  GOLD_DARK: '#D97706',
  GOLD_LIGHT: '#FEF3C7',

  // Semantic colors
  SUCCESS: '#10B981',
  SUCCESS_LIGHT: '#D1FAE5',
  ERROR: '#EF4444',
  ERROR_LIGHT: '#FEE2E2',
  INFO: '#3B82F6',
  INFO_LIGHT: '#DBEAFE',

  // Neutrals
  WHITE: '#FFFFFF',
  GRAY_50: '#F9FAFB',
  GRAY_200: '#E5E7EB',
  GRAY_400: '#9CA3AF',
  GRAY_600: '#6B7280',
  GRAY_900: '#1F2937',
};

// Spacing constants (in px)
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
};

// Breakpoints (in px)
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
};

// Animation durations (in ms)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
};

// Certificate amounts
export const AMOUNTS = [100, 200, 500, 1000, 2000, 5000, 10000];

// Form validation patterns
export const VALIDATION_PATTERNS = {
  PHONE: /^\+380\d{9}$/,
  CERTIFICATE: /^\d{4}-?\d{4}-?\d{4}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Mock partners data (later will come from API)
export const MOCK_PARTNERS = [
  { id: 1, name: 'Rozetka', logo: '🛍️' },
  { id: 2, name: 'ATB', logo: '🏪' },
  { id: 3, name: 'Silpo', logo: '🛒' },
  { id: 4, name: 'Comfy', logo: '💻' },
  { id: 5, name: 'Auchan', logo: '🏬' },
  { id: 6, name: 'Fora', logo: '🍎' },
];
