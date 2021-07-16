import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/Context";
import CartContext from "../../context/cart/CartContext";
import { usePaystackPayment } from "react-paystack";
import { useHistory } from "react-router-dom"

const Pay = (props) => {
  const configs = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
  const history = useHistory()
  const { user } = useContext(AuthContext);
  const { cart, couponValue, shippingCharge } = useContext(CartContext);

  //get cart amount to payy
  const [amount] = useState(
    cart
      .map((item) => (item.price-item.deduction) * item.qty)
      .reduce((prev, next) => parseInt(prev) + parseInt(next), 0) -
      couponValue -
      shippingCharge
  );

  const [err, setErr] = useState(false);


  
  //configuration to send to paysatack
  const config = {
    reference: new Date().getTime(),
    email: user ? user.email : "abdulainurudeentitiaka@gmail.com",
    amount:
      (cart
        .map((item) => (item.price-item.deduction) * item.qty)
        .reduce((prev, next) => parseInt(prev) + parseInt(next), 0) -
        cart
          .map((item) => (item.price-item.deduction) * item.qty)
          .reduce((prev, next) => parseInt(prev) + parseInt(next), 0) *
          (couponValue / 100) +
        parseInt(shippingCharge)) *
      100,
    currency: "GHS",
    publicKey: "pk_test_388414fe90e87507b1a57b42840c0ee3c7723ddb",
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
