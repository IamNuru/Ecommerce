import * as React from "react";
import CartContext from "../../context/cart/Context";

const ApplyCoupon = () => {
    const { coupons, setCouponValue } = React.useContext(CartContext);

    const [coupon, setCoupon] = React.useState('')
    const [couponError, setCouponError] = React.useState('')

    const onChange = (e) => {
        setCoupon(e.target.value)
        setCouponError('')
    }


    const submitCoupon = (e) =>{
        e.preventDefault()
        if (coupon === '') {
            setCouponError('Please Enter Coupon code')
        }else if(!coupons[coupon]){
            setCouponError('Invalid Coupon code')
        }else{
            setCouponValue(coupon)
        }
    }


  return (
    <div className="w-full">
      <div className="pt-1 pb-4">
        <p className="py-1 text-xs italic">
          If you have a coupon code, please enter it in the box below
        </p>
        <div className="w-full">
        <form onSubmit={submitCoupon}>
            <div className="flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full">
              <input
                type="coupon"
                name="coupon"
                value={coupon}
                onChange={onChange}
                placeholder="Apply coupon"
                className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"
              />
              <button
                type="submit"
                className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
              >
                <svg
                  aria-hidden="true"
                  data-prefix="fas"
                  data-icon="gift"
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                  />
                </svg>
                <span className="font-medium px-1">Apply</span>
              </button>
            </div>
            {
                couponError && 
                <p className="text-center text-red-400 text-sm capitalize">{couponError}</p>
            }
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyCoupon;
