// frontend/src/hooks/useForms.js  
import { useState, useEffect } from 'react';  
import { formAPI } from '../services/api';  
// import { useToast } from './useToast';  

export const useForms = () => {  
  const [forms, setForms] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  // const { showToast } = useToast();  

  const fetchForms = async () => {  
    try {  
      setLoading(true);  
      const data = await formAPI.getForms();  
      setForms(data);  
    } catch (err) {  
      setError(err.message);  
      // showToast('error', 'Failed to load forms');  
    } finally {  
      setLoading(false);  
    }  
  };  

  const deleteForm = async (formId) => {  
    try {  
      await formAPI.deleteForm(formId);  
      setForms(forms.filter(form => form._id !== formId));  
      // showToast('success', 'Form deleted successfully');  
    } catch (err) {  
      // showToast('error', 'Failed to delete form');  
    }  
  };  

  useEffect(() => {  
    fetchForms();  
  }, []);  

  return { forms, loading, error, deleteForm, refreshForms: fetchForms };  
};  