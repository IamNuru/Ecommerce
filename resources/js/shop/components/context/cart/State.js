import { useReducer } from "react";
import CartReducer from "./Reducer";
import CartContext from "./Context";
import axios from "axios";

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_CART_ITEM_QTY,
    DECREASE_CART_ITEM_QTY,
    CLEAR_CART,
    SET_COUPON_VALUE,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    ERRORS,
    CLEAR_ERRORS,
    SET_FORM_lOADING,
    SET_SHIPPING_CHARGE,
    GET_CART_TOTALS,
    GET_CART_COUPON_WORTH
} from "../types";

const CartState = props => {
    const initialState = {
        cart: [],
        cartTotal: 0,
        couponWorth: 0,
        wishList: [],
        coupons: {
            NewComer: 5,
            loyal: 55,
            promo: 45
        },
        couponValue: 0,
        shippingCharge: 15,
        errors: null,
        formloading: false
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    //configuration
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    //if there is a cart object in localstorage
    //use data in it and fill cart
    if (localStorage.getItem("cart")) {
        initialState.cart = initialState.cart.concat(
            JSON.parse(localStorage.getItem("cart"))
        );
    }

    //if there is a wish object in localstorage
    //use data in it and fill wish list
    if (localStorage.getItem("wish")) {
        initialState.wishList = initialState.wishList.concat(
            JSON.parse(localStorage.getItem("wish"))
        );
    }

    //actions
    //set localstorage
    const setLocalstorage = () => {
        if (localStorage.getItem("cart")) {
            initialState.cart = initialState.cart.concat(
                JSON.parse(localStorage.getItem("cart"))
            );
        }
    };

    //Add product to cart
    const addToCart = ({ id, price, title, description, image, deduction }) => {
        dispatch({
            type: ADD_TO_CART,
            payload: Object.assign(
                { id, price, title, description, image, deduction },
                { qty: 1 }
            )
        });
        //Add to local storage
        var scart = [];
        if (localStorage.getItem("cart")) {
            scart = JSON.parse(localStorage.getItem("cart"));
        }
        scart.push({
            id: id,
            price: price,
            title: title,
            image: image,
            deduction: deduction,
            qty: 1,
        });
        localStorage.setItem("cart", JSON.stringify(scart));
    };

    //Remove product from cart
    const removeFromCart = id => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: id
        });

        //remove from local storage
        if (localStorage.getItem("cart")) {
            let scart = JSON.parse(localStorage.getItem("cart"));
            let filteredScart = scart.filter(item => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(filteredScart));
        }
    };

    //Add product to my wish list
    const addToWishList = product => {
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: product
        });

        //Add to local storage
        var swishList = [];
        if (localStorage.getItem("wish")) {
            swishList = JSON.parse(localStorage.getItem("wish"));
            console.log("no");
        }
        swishList.push({
            id: product.id,
            image: product.image,
            price: product.price,
            deduction: product.deduction,
            description: product.description,
            qty: product.qty,
            title: product.title
        });
        window.localStorage.setItem("wish", JSON.stringify(swishList));
    };

    //Remove product from my wish list
    const removeFromWishList = id => {
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: id
        });

        //remove wish list item from local storage
        if (localStorage.getItem("wish")) {
            let swishList = JSON.parse(localStorage.getItem("wish"));
            let filteredSwishList = swishList.filter(item => item.id !== id);
            localStorage.setItem("wish", JSON.stringify(filteredSwishList));
        }
    };

    //Increase product in cart quantity
    const increaseCartItemQty = id => {
        dispatch({
            type: INCREASE_CART_ITEM_QTY,
            payload: id
        });
        // handle local storage
        if (localStorage.getItem("cart")) {
            let scart = JSON.parse(localStorage.getItem("cart"));
            let fileredScart = scart.map(item =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            );
            localStorage.setItem("cart", JSON.stringify(fileredScart));
        }
    };

    //decrease product in cart quantity
    const decreaseCartItemQty = id => {
        dispatch({
            type: DECREASE_CART_ITEM_QTY,
            payload: id
        });

        // handle local storage
        if (localStorage.getItem("cart")) {
            let scart = JSON.parse(localStorage.getItem("cart"));
            let fileredScart = scart.map(item =>
                item.id === id ? { ...item, qty: item.qty - 1 } : item
            );
            localStorage.setItem("cart", JSON.stringify(fileredScart));
        }
    };

    //push items to cart
    //refresh cart to make sure that invalid products are NOT
    //added to cart 
    const refreshCart = async cart => {
        if (cart?.length > 0) {
            const idsInCart =
                cart?.length > 0 &&
                cart.map(i => {
                    return i.id;
                });
            try {
                const res = await axios.get(
                    `${process.env.MIX_APP_API_URL}/cart/items/${cart}?ids=${idsInCart}`,
                    config
                );
                cart =
                    res.data?.length > 0 &&
                    cart.forEach(oldCartItem => {
                        let updatedCart = res.data.find(
                            newCartItem => newCartItem.id === oldCartItem.id
                        );

                        if (updatedCart) {
                            oldCartItem.price = parseInt(updatedCart.price);
                            oldCartItem.deduction = parseInt(updatedCart.deduction);
                            if (updatedCart.qty < 1) {
                                dispatch({
                                    type: ERRORS,
                                    payload: `${updatedCart.title} is currently out of stock`
                                });
                            } else if (updatedCart.qty < oldCartItem.qty) {
                                dispatch({
                                    type: ERRORS,
                                    payload: `${updatedCart.title} Quantity requested is more than quantity available`
                                });
                            }
                        }
                    });
            } catch (error) {}
        }
    };


    //calculate total amount of products in cart
    const getCartTotalAmount = () =>{
        dispatch({
            type: GET_CART_TOTALS
        })
    }


    //total amount worth for a coupon.
    //NB Coupons are in percentages
    const getCartCouponWorth = () =>{
        dispatch({
            type:GET_CART_COUPON_WORTH
        })
    }


    //clear cart
    const clearCart = () => {
        dispatch({
            type: CLEAR_CART
        });
        // handle local storage
        if (localStorage.getItem("cart")) {
            localStorage.removeItem("cart");
        }
    };



    //clearErrors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    };



    //set the value of the coupon
    const setCouponValue = coupon => {
        dispatch({
            type: SET_COUPON_VALUE,
            payload: coupon
        });
    };

    

    

    //Set state of form when clicked
    const setFormLoading = loadingValue => {
        dispatch({
            type: SET_FORM_lOADING,
            payload: loadingValue
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                cartTotal: state.cartTotal,
                couponWorth: state.couponWorth,
                wishList: state.wishList,
                coupons: state.coupons,
                couponValue: state.couponValue,
                shippingCharge: state.shippingCharge,
                errors: state.errors,
                formloading: state.formloading,
                addToCart,
                removeFromCart,
                addToWishList,
                removeFromWishList,
                increaseCartItemQty,
                decreaseCartItemQty,
                clearCart,
                setLocalstorage,
                setCouponValue,
                refreshCart,
                clearErrors,
                setFormLoading,
                getCartTotalAmount,
                getCartCouponWorth,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
