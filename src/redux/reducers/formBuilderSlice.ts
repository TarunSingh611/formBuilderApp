// src/redux/reducers/formBuilderSlice.ts  
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  
import { formAPI } from '../../services/api';  

export interface Question {  
  _id?: string;  
  type: 'text' | 'checkbox' | 'grid';  
  title: string;  
  options?: string[];  
  required: boolean;  
  imageUrl?: string;  
}  

export interface FormData {  
  title: string;  
  description: string;  
  questions: Question[];  
}  

interface FormBuilderState {  
  currentForm: FormData;  
  loading: boolean;  
  error: string | null;  
}  

const initialState: FormBuilderState = {  
  currentForm: {  
    title: '',  
    description: '',  
    questions: [],  
  },  
  loading: false,  
  error: null,  
};  

export const saveFormAsync = createAsyncThunk(  
  'formBuilder/saveForm',  
  async (formData: FormData) => {  
    const response = await formAPI.createForm(formData);  
    return response.data;  
  }  
);  

const formBuilderSlice = createSlice({  
  name: 'formBuilder',  
  initialState,  
  reducers: {  
    updateFormField: (state, action) => {  
      state.currentForm = { ...state.currentForm, ...action.payload };  
    },  
    addQuestion: (state) => {  
      const newQuestion: Question = {  
        type: 'text',  
        title: '',  
        required: false,  
        options: [],  
      };  
      state.currentForm.questions.push(newQuestion);  
    },  
    removeQuestion: (state, action) => {  
      state.currentForm.questions = state.currentForm.questions.filter(  
        (_, index) => index !== action.payload  
      );  
    },  
    updateQuestion: (state, action) => {  
      const { index, updates } = action.payload;  
      state.currentForm.questions[index] = {  
        ...state.currentForm.questions[index],  
        ...updates,  
      };  
    },  
    reorderQuestions: (state, action) => {  
      const { fromIndex, toIndex } = action.payload;  
      const questions = [...state.currentForm.questions];  
      const [removed] = questions.splice(fromIndex, 1);  
      questions.splice(toIndex, 0, removed);  
      state.currentForm.questions = questions;  
    },  
    duplicateQuestion: (state, action) => {  
      const index = action.payload;  
      const questionToDuplicate = { ...state.currentForm.questions[index] };  
      state.currentForm.questions.splice(index + 1, 0, questionToDuplicate);  
    },  
    resetForm: (state) => {  
      state.currentForm = initialState.currentForm;  
      state.error = null;  
    },  
  },  
  extraReducers: (builder) => {  
    builder  
      .addCase(saveFormAsync.pending, (state) => {  
        state.loading = true;  
        state.error = null;  
      })  
      .addCase(saveFormAsync.fulfilled, (state) => {  
        state.loading = false;  
        state.currentForm = initialState.currentForm;  
      })  
      .addCase(saveFormAsync.rejected, (state, action) => {  
        state.loading = false;  
        state.error = action.error.message || 'Failed to save form';  
      });  
  },  
});  

export const {  
  updateFormField,  
  addQuestion,  
  removeQuestion,  
  updateQuestion,  
  reorderQuestions,  
  duplicateQuestion,  
  resetForm,  
} = formBuilderSlice.actions;  

export default formBuilderSlice.reducer;  