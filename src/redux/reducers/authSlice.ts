// src/redux/reducers/authSlice.ts  
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';  
import { authAPI } from '../../services/api';  

interface User {  
  _id: string;  
  email: string;  
  name: string;  
}  

interface AuthState {  
  user: User | null;  
  token: string | null;  
  isLoading: boolean;  
  error: string | null;  
}  

const initialState: AuthState = {  
  user: null,  
  token: null,  
  isLoading: false,  
  error: null,  
};  

export const loginUser = createAsyncThunk(  
  'auth/login',  
  async (credentials: { email: string; password: string }) => {  
    const response = await authAPI.login(credentials);  
    return response.data;  
  }  
);  

export const registerUser = createAsyncThunk(  
  'auth/register',  
  async (userData: { name: string; email: string; password: string }) => {  
    const response = await authAPI.register(userData);  
    return response.data;  
  }  
);  

export const logoutUser = createAsyncThunk('auth/logout', async () => {  
  await authAPI.logout();  
});  

const authSlice = createSlice({  
  name: 'auth',  
  initialState,  
  reducers: {  
    setCredentials: (  
      state,  
      action: PayloadAction<{ user: User; token: string }>  
    ) => {  
      state.user = action.payload.user;  
      state.token = action.payload.token;  
    },  
    clearCredentials: (state) => {  
      state.user = null;  
      state.token = null;  
    },  
  },  
  extraReducers: (builder) => {  
    builder  
      // Login  
      .addCase(loginUser.pending, (state) => {  
        state.isLoading = true;  
        state.error = null;  
      })  
      .addCase(loginUser.fulfilled, (state, action) => {  
        state.isLoading = false;  
        state.user = action.payload.user;  
        state.token = action.payload.token;  
      })  
      .addCase(loginUser.rejected, (state, action) => {  
        state.isLoading = false;  
        state.error = action.error.message || 'Login failed';  
      })  
      // Register  
      .addCase(registerUser.pending, (state) => {  
        state.isLoading = true;  
        state.error = null;  
      })  
      .addCase(registerUser.fulfilled, (state, action) => {  
        state.isLoading = false;  
        state.user = action.payload.user;  
        state.token = action.payload.token;  
      })  
      .addCase(registerUser.rejected, (state, action) => {  
        state.isLoading = false;  
        state.error = action.error.message || 'Registration failed';  
      })  
      // Logout  
      .addCase(logoutUser.fulfilled, (state) => {  
        state.user = null;  
        state.token = null;  
      });  
  },  
});  

export const { setCredentials, clearCredentials } = authSlice.actions;  
export default authSlice.reducer;  