// mobile/src/store/actions/formActions.js  
import api from '../../services/api';  

export const CREATE_FORM = 'CREATE_FORM';  
export const FETCH_FORMS = 'FETCH_FORMS';  
export const SUBMIT_RESPONSE = 'SUBMIT_RESPONSE';  

export const createForm = (formData) => async (dispatch) => {  
  try {  
    const response = await api.post('/forms', formData);  
    dispatch({  
      type: CREATE_FORM,  
      payload: response.data,  
    });  
    return response.data;  
  } catch (error) {  
    throw error;  
  }  
};  

export const fetchForms = () => async (dispatch) => {  
  try {  
    const response = await api.get('/forms');  
    dispatch({  
      type: FETCH_FORMS,  
      payload: response.data,  
    });  
  } catch (error) {  
    throw error;  
  }  
};  

export const submitFormResponse = (formId, responses) => async (dispatch) => {  
  try {  
    const response = await api.post(`/forms/${formId}/responses`, { responses });  
    dispatch({  
      type: SUBMIT_RESPONSE,  
      payload: response.data,  
    });  
    return response.data;  
  } catch (error) {  
    throw error;  
  }  
};  