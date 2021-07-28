import React, { useState, useContext, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { useHistory } from "react-router-dom"

import UserContext from "../../context/user/Context";
import DestinationContext from "../../context/destination/Context";
import CartContext from "../../context/cart/Context";

const Pay = () => {
  //configs for sending request to backend
  const configs = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
  //react router history to push to another route
  const history = useHistory()
  //const variables from states
  const {
    cart,
    refreshCart,
    getCartTotalAmount,
    getCartCouponWorth,
    cartTotal,
    couponWorth,
} = useContext(CartContext);
const { user, refreshUser } = useContext(UserContext);
const {
    shippingCharge,
    setShippingCharge,
    getDestination,
    destination
} = useContext(DestinationContext);

//set state variables,
//t for total amount of products on cart
//w for how much coupon is worth 
//s for how much it for transporting all cart items
const [t, sett] = useState(0)
const [w, setw] = useState(0)
const [s, sets] = useState(0)
const [amount, setAmount] = useState(0)
const [err, setErr] = useState(false);


//if there is a user, calculate the shipping charge by getting the destination
useEffect(() => {
    if (user) {
        user.destination_id !== null
            ? getDestination(parseInt(user.destination_id))
            : setShippingCharge(0);
    } else {
        setShippingCharge(0);
    }
    // eslint-disable-next-line
}, [user]);

//refresh the user object (helps in cases where user changes destination)
//refresh the cart again to filter out non existing products
//get cart total amount and coupon worth
useEffect(() => {
    refreshUser()
    refreshCart(cart);
    getCartTotalAmount();
    getCartCouponWorth();
    // eslint-disable-next-line
}, [cart]);

//if there is a destination object
useEffect(() => {
  if (destination) {
    //sett(parseInt(destination.amount))
    setw(couponWorth ? parseInt(couponWorth) : 0)
    sets(shippingCharge ? parseInt(shippingCharge) : 0)
    sett(cartTotal ? parseInt(cartTotal) : 0)
    setAmount((t-w)+s)
  }
  // eslint-disable-next-line
}, [destination, couponWorth, shippingCharge, cartTotal ])

  //configuration to send to paysatack
  const config = {
    reference: new Date().getTime(),
    email: user ? user.email : "abdulainurudeentitiaka@gmail.com",
    amount: amount * 100,
    currency: "GHS",
    publicKey: `${process.env.MIX_APP_PAYSTACK_PUBLIC_KEY}`,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    var cart_data = { cart: cart };
    axios.post(`${process.env.MIX_APP_API_URL}/verify/transaction/${reference.reference}`, cart_data, configs)
        .then(res =>{
            history.push(`/cart/checkout/success/${reference.reference}/${res.data.channel}/${res.data.amount}`);
        }).catch(err =>{
            console.log(err.response)
        })
  };


  // you can call this function anything
  const onClose = () => {
    setErr("Transaction Not processed. No amount was charged from your wallet");
  };


  //initialise payment
  const initializePayment = usePaystackPayment(config);


  //on submit of form
  const confirmPayWithPaystack = () => {
    if (!user) {
      setErr("You must login to be able to make payment");
      return false;
    }
    if (amount < 5) {
      setErr("Invalid Amount to pay");
    } else if (cart.length < 0) {
      setErr("Your cart is empty");
    } else {
      initializePayment(onSuccess, onClose);
    }
  };



  return (
    <div>
      {err && (
        <div className="text-red-600 text-sm text-center italic">{err}</div>
      )}
      <button
        onClick={confirmPayWithPaystack}
        className="bg-blue-600 py-2 text-white text-semibold w-full mt-8 outline-none">
        Pay
      </button>
    </div>
  );
};

export default Pay;
