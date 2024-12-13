// src/redux/reducers/formBuilderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { formAPI } from '../../services/api';
import { Question, FormData, QuestionValidation } from '../../type/form';

interface FormBuilderState {
  currentForm: FormData;
  loading: boolean;
  error: string | null;
}

const initialState: FormBuilderState = {
  currentForm: {
    title: '',
    description: '',
    headerImage: undefined,
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
    updateFormField: (state, action: PayloadAction<Partial<FormData>>) => {
      state.currentForm = { ...state.currentForm, ...action.payload };
    },
    addQuestion: (state, action: PayloadAction<Partial<Question>>) => {
      const newQuestion: Question = {
        _id: Date.now().toString(),
        type: action.payload.type || 'text',
        title: action.payload.title || '',
        description: action.payload.description,
        required: action.payload.required || false,
        imageUrl: action.payload.imageUrl,
        options: action.payload.type === 'checkbox' ? ['Option 1'] : undefined,
        gridOptions: action.payload.type === 'grid' ? {
          rows: ['Row 1'],
          columns: ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5']
        } : undefined,
        validation: {
          required: false,
          minLength: action.payload.type === 'text' ? undefined : undefined,
          maxLength: action.payload.type === 'text' ? undefined : undefined,
          minSelections: action.payload.type === 'checkbox' ? undefined : undefined,
          maxSelections: action.payload.type === 'checkbox' ? undefined : undefined,
        }
      };
      state.currentForm.questions.push(newQuestion);
    },
    removeQuestion: (state, action: PayloadAction<number>) => {
      state.currentForm.questions = state.currentForm.questions.filter(
        (_:any, index:any) => index !== action.payload
      );
    },
    updateQuestion: (state, action: PayloadAction<{ index: number; updates: Partial<Question> }>) => {
      const { index, updates } = action.payload;
      if (state.currentForm.questions[index]) {
        state.currentForm.questions[index] = {
          ...state.currentForm.questions[index],
          ...updates,
          validation: {
            ...state.currentForm.questions[index].validation,
            ...(updates.validation || {})
          }
        };
      }
    },
    reorderQuestions: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const questions = [...state.currentForm.questions];
      const [removed] = questions.splice(fromIndex, 1);
      questions.splice(toIndex, 0, removed);
      state.currentForm.questions = questions;
    },
    duplicateQuestion: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const questionToDuplicate = { 
        ...state.currentForm.questions[index],
        _id: Date.now().toString() // Ensure new ID for duplicated question
      };
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