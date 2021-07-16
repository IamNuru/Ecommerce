import {
    ERRORS,
    CLEAR_ERRORS,
    GET_DESTINATIONS,
    SET_FORM_lOADING,
    GET_DESTINATION,
    ADD_DESTINATION,
    UPDATE_DESTINATION,
    DELETE_DESTINATION,
    CLEAR_MESSAGES
} from "../types";

const DestinationReducer = (state, action) => {
    switch (action.type) {
        case ADD_DESTINATION:
        case UPDATE_DESTINATION:
        case DELETE_DESTINATION:
            return {
                ...state,
                success: action.payload,
                errors: null,
                formloading: false
            };

        case GET_DESTINATIONS:
            return {
                ...state,
                destinations: action.payload,
                errors: null
            };

        case GET_DESTINATION:
            return {
                ...state,
                destination: action.payload,
                loading: false
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

export default DestinationReducer;
