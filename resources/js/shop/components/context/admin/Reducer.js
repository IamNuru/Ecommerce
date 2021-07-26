import {
    ERRORS,
    CLEAR_ERRORS,
    GET_ORDERS,
    CLEAR_MESSAGES,
    SUCCESS_MESSAGES,
    SET_lOADING,
    GET_SALES,
    GET_DAILY_SALES,
    GET_WEEKLY_SALES,
    GET_MONTHLY_SALES,
    GET_CUSTOMERS,
    SET_SINGLE_TO_NULL,
    GET_TRANSACTION,
    SET_CUSTOMER_TO_NULL,
    GET_CUSTOMER,
    GET_TRANSACTIONS,
    SET_FORM_lOADING,
    SET_FILTERED_TO_NULL,
    FILTER_BY_SEARCH,
  } from "../types";
  
  const AdminReducer = (state, action) => {
    switch (action.type) {
      case GET_ORDERS:
        return {
          ...state,
          orders: action.payload,
          loading: false,
        };
      case GET_SALES:
        return {
          ...state,
          sales: action.payload,
          loading: false,
        };
      case GET_DAILY_SALES:
        return {
          ...state,
          dailySales: action.payload,
          loading: false,
        };
      case GET_WEEKLY_SALES:
        return {
          ...state,
          weeklySales: action.payload,
          loading: false,
        };
      case GET_MONTHLY_SALES:
        return {
          ...state,
          monthlySales: action.payload,
          loading: false,
        };

      case GET_CUSTOMERS:
        return {
          ...state,
          customers: action.payload,
          loading: false,
        };

      case GET_CUSTOMER:
        return {
          ...state,
          customer: action.payload,
          loading: false,
        };

      case GET_TRANSACTIONS:
        return{
          ...state,
          transactions: action.payload,
          filtered: action.payload,
          loading: false,
        }


      case GET_TRANSACTION:
        return{
          ...state,
          transaction: action.payload,
          loading: false,
        }

      case FILTER_BY_SEARCH:
			return {
				...state,
				filtered: state.transactions.filter((trans) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return (
						trans.transaction_id.match(regex) || trans.status.match(regex)
					);
				}),
			};








      case SET_FORM_lOADING:
        return{
          ...state,
          formLoading: action.payload,
        }


      case SET_lOADING:
        return{
          ...state,
          loading: action.payload,
        }

        case SET_SINGLE_TO_NULL:
          return{
            ...state,
            transaction: null,
            loading: false,
          }

        case SET_FILTERED_TO_NULL:
          return{
            ...state,
            filtered: null,
            loading: false,
          }

        case SET_CUSTOMER_TO_NULL:
          return{
            ...state,
            customer: null,
            loading: false,
          }





      default:
        return {
          ...state,
        };
    }
  };
  
  export default AdminReducer;
  