import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckOrderStatus = (props) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const checkOrder = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/checkorderstatus/${props.previousStep.value}`
        )
        .then((res) => {
          setMessage(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          setMessage("Not Found");
        });
    };
    checkOrder();

    // eslint-disable-next-line
  },[props.previousStep.value]);
  return (
    <div>
      {message === null || message === "" || message === "Not Found" ? (
        <p>
          Sorry your order number <i className="text-red-600">{props.previousStep.value}</i>{" "}
          <span className="text-pink-600">{props.orderNum}</span> not found
        </p>
      ) : (
        <p>Your Order status : {message.status}</p>
      )}
    </div>
  );
};

export default CheckOrderStatus;
