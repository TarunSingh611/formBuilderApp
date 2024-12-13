// src/types/form.ts

export interface QuestionValidation {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  minSelections?: number;
  maxSelections?: number;
}

export interface GridOptions {
  rows: string[];
  columns: string[];
}

export interface Question {
  _id: string;
  type: 'text' | 'checkbox' | 'grid';
  title: string;
  description?: string;
  required: boolean;
  imageUrl?: string;
  options?: string[];
  gridOptions?: GridOptions;
  validation: QuestionValidation;
  value?: any;
}

export interface FormData {
  title: string;
  description: string;
  headerImage?: string;
  questions: Question[];
}