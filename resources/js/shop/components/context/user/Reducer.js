import {
    ADD_TO_ORDERS,
    ERRORS,
    CLEAR_ERRORS,
    GET_USER,
    CLEAR_MESSAGES,
    SUCCESS_MESSAGES,
    SET_lOADING,
    UPDATE_USER,
    SET_FORM_lOADING,
    
} from "../types";

const UserReducer = (state, action) => {
    switch (action.type) {

        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };

        case UPDATE_USER:
            return {
                ...state,
                success: action.payload,
                formloading: false,
                errors: null
            };


        case CLEAR_ERRORS:
            return {
                errors: null,
                loading: false
            };

        case ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                formloading: false,
            };

        case ADD_TO_ORDERS:
            return {
                ...state,
                orders: [...state.orders, action.payload]
            };

        case SUCCESS_MESSAGES:
            return {
                ...state,
                success: action.payload,
                loading: false
            };

        case CLEAR_MESSAGES:
            return {
                ...state,
                success: null,
                errors: null,
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

        default:
            return {
                ...state
            };
    }
};

export default UserReducer;
