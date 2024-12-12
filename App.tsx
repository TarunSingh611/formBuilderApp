/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// Replace react-native-elements with @rneui/themed
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/redux/store';
import { AppNavigator } from './src/navigation';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const LoadingSpinner = () => (
  <View style={styles.spinnerContainer}>
    <ActivityIndicator size="large" color="#2196F3" />
  </View>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
       <Provider store={store}>
         <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
           <QueryClientProvider client={queryClient}>
             <SafeAreaProvider>
               <ThemeProvider theme={theme}>
                 <NavigationContainer>
                   <AppNavigator/>
                 </NavigationContainer>
                 <Toast />
               </ThemeProvider>
             </SafeAreaProvider>
           </QueryClientProvider>
         </PersistGate>
       </Provider>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  highlight: {
    fontWeight: '700',
  },
});

export default App;
