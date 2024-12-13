// src/utils/validation.ts
import { Question } from '../type/form';

export const validateQuestion = (question: Question, value: any) => {
    const errors = [];
    
    if (question.required && !value) {
      errors.push('This field is required');
    }
    
    if (question.validation) {
      const { minLength, maxLength, minSelections, maxSelections } = question.validation;
      
      switch (question.type) {
        case 'text':
          if (minLength && value.length < minLength) {
            errors.push(`Minimum ${minLength} characters required`);
          }
          if (maxLength && value.length > maxLength) {
            errors.push(`Maximum ${maxLength} characters allowed`);
          }
          break;
          
        case 'checkbox':
          const selectedCount = Array.isArray(value) ? value.length : 0;
          if (minSelections && selectedCount < minSelections) {
            errors.push(`Select at least ${minSelections} options`);
          }
          if (maxSelections && selectedCount > maxSelections) {
            errors.push(`Select at most ${maxSelections} options`);
          }
          break;
      }
    }
    
    return errors;
  };