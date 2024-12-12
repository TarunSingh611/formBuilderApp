// src/styles/theme.ts
import { Theme, createTheme, ThemeMode, lightColors } from '@rneui/themed';
import { ButtonProps, InputProps, CardProps } from '@rneui/base';

declare module '@rneui/themed' {
  export interface Theme {
    mode: ThemeMode;
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    components: {
      Button: Partial<ButtonProps>;
      Input: Partial<InputProps>;
      Card: Partial<CardProps>;
    };
  }
}

export const theme = createTheme({
  mode: 'light',
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  lightColors: {
    ...lightColors,
    primary: '#2196F3',
    secondary: '#4CAF50',
    background: '#ffffff',
    white: '#ffffff',
    black: '#000000',
    grey0: '#f5f5f5',
    grey1: '#e0e0e0',
    grey2: '#bdbdbd',
    grey3: '#9e9e9e',
    grey4: '#757575',
    grey5: '#616161',
    greyOutline: '#bbb',
    searchBg: '#f5f5f5',
    success: '#4CAF50',
    error: '#f44336',
    warning: '#ff9800',
    disabled: '#bdbdbd',
    divider: '#e0e0e0',
    platform: {
      ios: {
        primary: '#007AFF',
        secondary: '#5856D6',
        success: '#4CD964',
        error: '#FF3B30',
        warning: '#FF9500',
      },
      android: {
        primary: '#2196F3',
        secondary: '#9C27B0',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
      },
      web: {
        primary: '#2196F3',
        secondary: '#9C27B0',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
      },
      default: {
        primary: '#2196F3',
        secondary: '#9C27B0',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
      },
    },
  },
  components: {
    Button: {
      raised: true,
      buttonStyle: {
        borderRadius: 8,
      },
    },
    Input: {
      containerStyle: {
        paddingHorizontal: 0,
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 12,
        padding: 16,
      },
    },
  },
});

export type AppTheme = typeof theme;