import {
    ERRORS,
    CLEAR_ERRORS,
    SET_FORM_lOADING,
    CLEAR_MESSAGES,
    GET_BRANDS,
    GET_BRAND,
    ADD_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    GET_BRAND_PRODUCTS,
    SET_lOADING,
} from "../types";

const BrandReducer = (state, action) => {
    switch (action.type) {
        case ADD_BRAND:
        case UPDATE_BRAND:
        case DELETE_BRAND:
            return {
                ...state,
                success: action.payload,
                errors: null,
                formloading: false
            };

        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload,
                errors: null
            };

        case GET_BRAND:
            return {
                ...state,
                brand: action.payload,
                loading: false
            };

        case GET_BRAND_PRODUCTS:
            return {
                ...state,
                brandProducts: action.payload,
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

export default BrandReducer;
