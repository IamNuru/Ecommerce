import {
    ERRORS,
    CLEAR_ERRORS,
    GET_REVIEWS,
    GET_REVIEW,
    CLEAR_MESSAGES,
    SET_lOADING,
    SET_FORM_lOADING,
    SUBMIT_REVIEW,
    UPDATE_REVIEW,
  } from "../types";
  
  const ReviewReducer = (state, action) => {
    switch (action.type) {
      case GET_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
          loading: false,
          errors:null,
        };

        case GET_REVIEW:
            return {
                ...state,
                review: action.payload,
                loading: false,
                errors:null,
            };
          
        case SUBMIT_REVIEW:
        case UPDATE_REVIEW:
          return {
            ...state,
            success: action.payload,
            loading: false,
            errors:null,
          }

        case SET_lOADING:
          return {
              ...state,
              loading: action.payload
          };

        case SET_FORM_lOADING:
            return {
                ...state,
                formloading: action.payload
            };
            
        case CLEAR_MESSAGES:
            return {
                ...state,
                success: null,
                errors: null,
                loading: false
            };

        case ERRORS:
            return {
                ...state,
                errors: action.payload,
                formloading: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default ReviewReducer;
  