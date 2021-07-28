import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT,
    SEARCH_PRODUCTS,
    GET_RELATED_PRODUCTS,
    ERRORS,
    CLEAR_MESSAGES,
    CLEAR_ERRORS,
    SET_lOADING,
    SET_FORM_lOADING,
    SORT_PRODUCTS,
    FILTER_PRODUCTS,
    SORT_PRICE,
    GET_ALL_PRODUCTS,
    FILTER_BY_SEARCH,
} from "../types";

const ProductsReducer = (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
        case UPDATE_PRODUCT:
        case DELETE_PRODUCT:
            return {
                ...state,
                success: action.payload,
                errors: null,
                formloading: false
            };

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allproducts: action.payload,
                loading: false
            };

            
        case SEARCH_PRODUCTS:
            return {
                ...state,
                searchedItems: action.payload,
                loading: false
            };
        /* case SEARCH_PRODUCTS:
      return {
        ...state,
        searchedItems: state.products.filter((product) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            product.title.match(regex) ||
            product.description.match(regex) ||
            product.category.match(regex)
          );
        }),
      }; */
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            };
            
        case GET_RELATED_PRODUCTS:
            return {
                ...state,
                relatedProducts: action.payload,
                loading: false
            };

        case CLEAR_MESSAGES:
            return {
                ...state,
                success: null,
                errors: null,
                formloading: false
            };

        case SORT_PRODUCTS:
            return {
                ...state,
                products: [],
                loading: false
            };
        case SORT_PRICE:
            return {
                ...state,
                allproducts: state.allproducts.sort((a, b) => {
                    if (action.payload == "asc") {
                        return parseFloat(a.price) - parseFloat(b.price);
                    } else if (action.payload == "des") {
                        return parseFloat(b.price) - parseFloat(a.price);
                    }
                }),
                loading: false
            };
        case FILTER_PRODUCTS:
            return {
                ...state,
                allproducts: state.products.filter(item => {
                  if (action.payload.length > 0) {
                    return action.payload.includes(item.brand_id)
                  }else{
                    return state.products
                  }
                  
                }),
                loading: false
            };
        
            case FILTER_BY_SEARCH:
			return {
				...state,
				allproducts: state.products.filter((product) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return (
						product.title.match(regex) || product.description.match(regex)|| product.brand.match(regex)
					);
				}),
			};


        case ERRORS:
            return {
                ...state,
                errors: action.payload,
                success: null,
                loading: false,
                formloading: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                formloading: false
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

export default ProductsReducer;
