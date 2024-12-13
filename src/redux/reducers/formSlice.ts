// src/redux/reducers/formSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formAPI } from '../../services/api';

interface Form {
  _id: string;
  title: string;
  description: string;
  questions: any;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface FormState {
  forms: Form[];
  currentForm: Form | null;
  responses: any[]; // Define a proper type based on your response structure
  analytics: any; // Define a proper type based on your analytics structure
  isLoading: boolean;
  error: string | null;
}

const initialState: FormState = {
  forms: [],
  currentForm: null,
  responses: [],
  analytics: null,
  isLoading: false,
  error: null,
};

// Fetch forms
export const fetchForms = createAsyncThunk('forms/fetchAll', async () => {
  const response = await formAPI.getForms();
  return response.data;
});

// Get form by ID
export const getFormById = createAsyncThunk('forms/getById', async (formId: string) => {
  const response = await formAPI.getFormById(formId);
  return response.data;
});

// Get form responses
export const getFormResponses = createAsyncThunk('forms/getResponses', async (formId: string) => {
  const response = await formAPI.getFormResponses(formId);
  return response.data;
});

// Get form analytics
export const getFormAnalytics = createAsyncThunk('forms/getAnalytics', async (formId: string) => {
  const response = await formAPI.getFormAnalytics(formId);
  return response.data;
});

// Create form
export const createForm = createAsyncThunk('forms/create', async (formData: Omit<Form, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => {
  const response = await formAPI.createForm(formData);
  return response.data;
});

// Update form
export const updateForm = createAsyncThunk('forms/update', async ({ formId, formData }: { formId: string; formData: Partial<Form> }) => {
  const response = await formAPI.updateForm(formId, formData);
  return response.data;
});

// Delete form
export const deleteForm = createAsyncThunk('forms/delete', async (formId: string) => {
  await formAPI.deleteForm(formId);
  return formId;
});

export const submitFormResponse = createAsyncThunk( 'forms/submitResponse', async ({ formId, responses }:any) => {
    const response = await formAPI.submitResponse(formId, responses);
    return response.data;
  }
);

export const saveFormProgress = createAsyncThunk( 'forms/saveProgress', async ({ formId, responses }:any) => {
    const response = await formAPI.saveProgress(formId, responses);
    return response.data;
  }
);

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setCurrentForm: (state, action) => {
      state.currentForm = action.payload;
    },
    clearCurrentForm: (state) => {
      state.currentForm = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms = action.payload;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch forms';
      })
      .addCase(getFormById.fulfilled, (state, action) => {
        state.currentForm = action.payload;
      })
      .addCase(getFormResponses.fulfilled, (state, action) => {
        state.responses = action.payload;
      })
      .addCase(getFormAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { setCurrentForm, clearCurrentForm } = formSlice.actions;
export default formSlice.reducer;