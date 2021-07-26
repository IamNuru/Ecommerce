import {
    ERRORS,
    CLEAR_ERRORS,
    SET_FORM_lOADING,
    CLEAR_MESSAGES,
    GET_CATEGORIES,
    GET_CATEGORY,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORY_PRODUCTS,
    SET_lOADING,
} from "../types";

const CategoryReducer = (state, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
        case UPDATE_CATEGORY:
        case DELETE_CATEGORY:
            return {
                ...state,
                success: action.payload,
                errors: null,
                formloading: false
            };

        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                errors: null
            };

        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false
            };

        case GET_CATEGORY_PRODUCTS:
            return {
                ...state,
                catProducts: action.payload,
                loading: false
            };

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
                ...state
            };
    }
};

export default CategoryReducer;
