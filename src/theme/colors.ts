/**
 * Design System Theme Colors
 * Supports semantic tokens for Task Management, status badges, priorities, and dark/light modes.
 */

export const Palette = {
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Indigo base
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },
  rose: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    400: '#FB7185',
    500: '#F43F5E',
    600: '#E11D48',
    700: '#BE123C',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
} as const;

export const colors = {
  light: {
    primary: Palette.primary[600],
    primaryLight: Palette.primary[50],
    primaryBorder: Palette.primary[200],
    
    background: '#F8FAFC',
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    
    text: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    
    border: '#E2E8F0',
    inputBackground: '#FFFFFF',
    
    // Status colors
    statusTodo: Palette.slate[600],
    statusTodoBg: Palette.slate[100],
    statusInProgress: Palette.amber[600],
    statusInProgressBg: Palette.amber[50],
    statusDone: Palette.emerald[600],
    statusDoneBg: Palette.emerald[50],
    
    // Priority colors
    priorityLow: Palette.slate[500],
    priorityLowBg: Palette.slate[100],
    priorityMedium: Palette.amber[600],
    priorityMediumBg: Palette.amber[50],
    priorityHigh: Palette.rose[600],
    priorityHighBg: Palette.rose[50],
    
    // Feedback
    success: Palette.emerald[600],
    warning: Palette.amber[500],
    danger: Palette.rose[600],
    dangerBg: Palette.rose[50],
  },
  dark: {
    primary: Palette.primary[400],
    primaryLight: Palette.primary[900],
    primaryBorder: Palette.primary[700],
    
    background: '#0B0F19',
    card: '#161E2E',
    cardBorder: '#232D42',
    
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    
    border: '#232D42',
    inputBackground: '#131A29',
    
    // Status colors
    statusTodo: Palette.slate[300],
    statusTodoBg: '#1E293B',
    statusInProgress: Palette.amber[400],
    statusInProgressBg: '#3B290B',
    statusDone: Palette.emerald[400],
    statusDoneBg: '#064E3B',
    
    // Priority colors
    priorityLow: Palette.slate[400],
    priorityLowBg: '#1E293B',
    priorityMedium: Palette.amber[400],
    priorityMediumBg: '#3B290B',
    priorityHigh: Palette.rose[400],
    priorityHighBg: '#4C0519',
    
    // Feedback
    success: Palette.emerald[500],
    warning: Palette.amber[400],
    danger: Palette.rose[500],
    dangerBg: '#4C0519',
  },
};

export type ThemeColors = typeof colors.light;
