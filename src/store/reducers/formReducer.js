// mobile/src/store/reducers/formReducer.js  
import {  
    CREATE_FORM,  
    FETCH_FORMS,  
    SUBMIT_RESPONSE,  
  } from '../actions/formActions';  
  
  const initialState = {  
    forms: [],  
    responses: [],  
  };  
  
  export default function formReducer(state = initialState, action) {  
    switch (action.type) {  
      case CREATE_FORM:  
        return {  
          ...state,  
          forms: [...state.forms, action.payload],  
        };  
  
      case FETCH_FORMS:  
        return {  
          ...state,  
          forms: action.payload,  
        };  
  
      case SUBMIT_RESPONSE:  
        return {  
          ...state,  
          responses: [...state.responses, action.payload],  
        };  
  
      default:  
        return state;  
    }  
  }  