// src/hooks/useFormBuilder.ts  
import { useCallback } from 'react';  
import { useDispatch, useSelector } from 'react-redux'; 
import {  
  updateFormField,  
  addQuestion,  
  removeQuestion,  
  updateQuestion,  
  reorderQuestions,  
  duplicateQuestion,  
  saveFormAsync,  
  Question,  
} from '../redux/reducers/formBuilderSlice';  

export const useFormBuilder = () => {  
  const dispatch = useDispatch();  
  const { currentForm, loading, error } = useSelector(  
    (state:any) => state.formBuilder  
  );  

  const updateForm = useCallback(  
    (updates: Partial<typeof currentForm>) => {  
      dispatch(updateFormField(updates));  
    },  
    [dispatch]  
  );  

  const handleAddQuestion = useCallback((newQuestion: Question) => {  
    dispatch(addQuestion(newQuestion));  
  }, [dispatch]);  

  const handleRemoveQuestion = useCallback(  
    (index: number) => {  
      dispatch(removeQuestion(index));  
    },  
    [dispatch]  
  );  

  const handleUpdateQuestion = useCallback(  
    (index: any, updates: Partial<Question>) => {  
      dispatch(updateQuestion({ index, updates }));  
    },  
    [dispatch]  
  );  

  const handleReorderQuestions = useCallback(  
    (fromIndex: number, toIndex: number) => {  
      dispatch(reorderQuestions({ fromIndex, toIndex }));  
    },  
    [dispatch]  
  );  

  const handleDuplicateQuestion = useCallback(  
    (index: number) => {  
      dispatch(duplicateQuestion(index));  
    },  
    [dispatch]  
  );  

  const validateForm = useCallback((): boolean => {  
    if (!currentForm.title.trim()) {  
      return false;  
    }  

    if (currentForm.questions.length === 0) {  
      return false;  
    }  

    return currentForm.questions.every(  
      (question:any) =>  
        question.title.trim() &&  
        (question.type !== 'checkbox' &&  
          question.type !== 'grid' ||  
          (question.options && question.options.length > 0))  
    );  
  }, [currentForm]);  

  const saveForm = useCallback(async () => {  
    if (!validateForm()) {  
      return;  
    }  

    try {  
    //   await dispatch(saveFormAsync(currentForm)).unwrap();  
    } catch (err) {  
      // Error handling is managed in the slice  
      console.error('Failed to save form:', err);  
    }  
  }, [dispatch, currentForm, validateForm]);  

  return {  
    form: currentForm,  
    loading,  
    error,  
    updateForm,  
    addQuestion: handleAddQuestion,  
    removeQuestion: handleRemoveQuestion,  
    updateQuestion: handleUpdateQuestion,  
    saveForm,  
    reorderQuestions: handleReorderQuestions,  
    duplicateQuestion: handleDuplicateQuestion,  
  };  
};  