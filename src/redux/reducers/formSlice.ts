// src/redux/reducers/formSlice.ts  
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';  
import { formAPI } from '../../services/api';  

interface Question {  
  _id: string;  
  type: 'text' | 'checkbox' | 'grid';  
  title: string;  
  options?: string[];  
  required: boolean;  
  imageUrl?: string;  
}  

interface Form {  
  _id: string;  
  title: string;  
  description: string;  
  questions: Question[];  
  createdBy: string;  
  createdAt: string;  
  updatedAt: string;  
}  

interface FormState {  
  forms: Form[];  
  currentForm: Form | null;  
  isLoading: boolean;  
  error: string | null;  
}  

const initialState: FormState = {  
  forms: [],  
  currentForm: null,  
  isLoading: false,  
  error: null,  
};  

export const fetchForms = createAsyncThunk('forms/fetchAll', async () => {  
  const response = await formAPI.getForms();  
  return response.data;  
});  

export const createForm = createAsyncThunk(  
  'forms/create',  
  async (formData: Omit<Form, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => {  
    const response = await formAPI.createForm(formData);  
    return response.data;  
  }  
);  

export const updateForm = createAsyncThunk(  
  'forms/update',  
  async ({ formId, formData }: { formId: string; formData: Partial<Form> }) => {  
    const response = await formAPI.updateForm(formId, formData);  
    return response.data;  
  }  
);  

export const getFormById = createAsyncThunk(  
  'forms/getById',  
  async (formId: string) => {  
    const response = await formAPI.getFormById(formId);  
    return response.data;  
  }  
);  

export const getFormResponses = createAsyncThunk(  
  'forms/getResponses',  
  async (formId: string) => {  
    const response = await formAPI.getFormResponses(formId);  
    return response.data;  
  }  
);  

export const getForms = createAsyncThunk('forms/get', async () => {
  const response = await formAPI.getForms();
  return response.data;
})

export const deleteForm = createAsyncThunk(  
  'forms/delete',  
  async (formId: string) => {  
    await formAPI.deleteForm(formId);  
    return formId;  
  }  
);  

const formSlice = createSlice({  
  name: 'forms',  
  initialState,  
  reducers: {  
    setCurrentForm: (state, action: PayloadAction<Form>) => {  
      state.currentForm = action.payload;  
    },  
    clearCurrentForm: (state) => {  
      state.currentForm = null;  
    },  
    addQuestion: (state, action: PayloadAction<Question>) => {  
      if (state.currentForm) {  
        state.currentForm.questions.push(action.payload);  
      }  
    },  
    updateQuestion: (  
      state,  
      action: PayloadAction<{ questionId: string; updates: Partial<Question> }>  
    ) => {  
      if (state.currentForm) {  
        const questionIndex = state.currentForm.questions.findIndex(  
          (q) => q._id === action.payload.questionId  
        );  
        if (questionIndex !== -1) {  
          state.currentForm.questions[questionIndex] = {  
            ...state.currentForm.questions[questionIndex],  
            ...action.payload.updates,  
          };  
        }  
      }  
    },  
    removeQuestion: (state, action: PayloadAction<string>) => {  
      if (state.currentForm) {  
        state.currentForm.questions = state.currentForm.questions.filter(  
          (q) => q._id !== action.payload  
        );  
      }  
    },  
  },  
  extraReducers: (builder) => {  
    builder  
      // Fetch Forms  
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
      // Create Form  
      .addCase(createForm.fulfilled, (state, action) => {  
        state.forms.push(action.payload);  
        state.currentForm = action.payload;  
      })  
      // Update Form  
      .addCase(updateForm.fulfilled, (state, action) => {  
        const index = state.forms.findIndex((f) => f._id === action.payload._id);  
        if (index !== -1) {  
          state.forms[index] = action.payload;  
        }  
        if (state.currentForm?._id === action.payload._id) {  
          state.currentForm = action.payload;  
        }  
      })  
      // Delete Form  
      .addCase(deleteForm.fulfilled, (state, action) => {  
        state.forms = state.forms.filter((f) => f._id !== action.payload);  
        if (state.currentForm?._id === action.payload) {  
          state.currentForm = null;  
        }  
      });  
  },  
});  

export const {  
  setCurrentForm,  
  clearCurrentForm,  
  addQuestion,  
  updateQuestion,  
  removeQuestion,  
} = formSlice.actions;  

export default formSlice.reducer;  