// src/redux/reducers/index.ts  
import { combineReducers } from '@reduxjs/toolkit';  
import authReducer from './authSlice.ts';  
import formReducer from './formSlice.ts';
import formBuilderReducer from './formBuilderSlice.ts';  

export const rootReducer = combineReducers({  
  auth: authReducer,  
  forms: formReducer,  
  formBuilder: formBuilderReducer, 
});  