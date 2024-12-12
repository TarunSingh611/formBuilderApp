// src/types/theme.d.ts  
import '@rneui/themed';  
import { PlatformColors } from '@rneui/base';  

declare module '@rneui/themed' {  
  export interface Colors {  
    primary: string;  
    secondary: string;  
    background: string;  
    white: string;  
    black: string;  
    grey0: string;  
    grey1: string;  
    grey2: string;  
    grey3: string;  
    grey4: string;  
    grey5: string;  
    greyOutline: string;  
    searchBg: string;  
    success: string;  
    error: string;  
    warning: string;  
    info: string;  
    disabled: string;  
    divider: string;  
    platform: {  
      ios: PlatformColors;  
      android: PlatformColors;  
      web: PlatformColors;  
      default: PlatformColors;  
    };  
  }  

  export interface Theme {  
    colors: Colors;  
    Button: {  
      raised: boolean;  
      borderRadius: number;  
    };  
    Input: {  
      containerStyle: {  
        paddingHorizontal: number;  
      };  
    };  
    Card: {  
      containerStyle: {  
        borderRadius: number;  
        padding: number;  
      };  
    };  
  }  
}  