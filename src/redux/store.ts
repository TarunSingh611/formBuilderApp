// src/redux/store.ts  
import { configureStore } from '@reduxjs/toolkit';  
import { persistStore, persistReducer } from 'redux-persist';  
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { rootReducer } from './reducers';  

const persistConfig = {  
  key: 'root',  
  storage: AsyncStorage,  
  whitelist: ['auth'], // Add reducers you want to persist  
};  

const persistedReducer = persistReducer(persistConfig, rootReducer);  

export const store = configureStore({  
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>  
    getDefaultMiddleware({  
      serializableCheck: {  
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],  
      },  
    }),  
});  

export const persistor = persistStore(store);  

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;  