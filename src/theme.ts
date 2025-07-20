import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#8B5CF6',
    secondary: '#06B6D4',
    tertiary: '#10B981',
    surface: '#FFFFFF',
    surfaceVariant: '#F3F4F6',
    background: '#F9FAFB',
    error: '#EF4444',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#111827',
    onSurfaceVariant: '#6B7280',
    outline: '#E5E7EB',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#8B5CF6',
    secondary: '#06B6D4',
    tertiary: '#10B981',
    surface: '#1F2937',
    surfaceVariant: '#374151',
    background: '#111827',
    error: '#EF4444',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#F9FAFB',
    onSurfaceVariant: '#D1D5DB',
    outline: '#4B5563',
  },
};

export const theme = lightTheme; // You can switch between light and dark