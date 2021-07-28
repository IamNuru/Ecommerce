import React, { useContext } from "react";
import CartContext from "../context/cart/Context";
import AuthContext from "../context/auth/Context";
import SettingsContext from "../context/settings/Context";

import { Link } from "react-router-dom";

const Header = () => {
  const { logedin , user} = useContext(AuthContext);
  const { isNavbarOpen, closeNavbar } = useContext(SettingsContext);
  const { cart } = useContext(CartContext);

  const toggleBar = () => {
    if (isNavbarOpen === true) {
      closeNavbar(false);
    } else {
      closeNavbar(true);
    }
  };
  return (
    <div className="bg-white pt-1 flex fixed w-full top-0 z-30 mb-2 shadow-md min-h-2 py-1">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-1">
        <div
          onClick={toggleBar}
          className={`z-40 cursor-pointer ml-2 md:hidden inline-flex items-center 
          justify-center p-2 text-white bg-purple-600`}
        >
          <span className="sr-only">Open main menu</span>

          <svg
            className={`${isNavbarOpen && "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <svg
            className={`${isNavbarOpen ? "block" : "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* <Link to="/" className="ml-2 text-4xl px-1">
          <i className="fa fa-cart-plus text-purple-600"></i>
        </Link> */}
        <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
            <nav>
                <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                    <li><Link to="/about" className="inline-block no-underline hover:text-black hover:underline py-2 px-4">About</Link></li>
                </ul>
            </nav>
        </div>

        <div className="order-1 md:order-2">
          <Link to="/" className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
              <svg className="fill-current text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z" />
              </svg>
              NURU
          </Link>
      </div>


      <div className="order-2 md:order-3 flex items-center" id="nav-content">
        {!logedin ? (
          <div className="flex">
            
            <Link
              to="/register"
              className="mx-1"
              title="register"
            >
              <i className="md:hidden fa fa-user-plus"></i>
              <i className="hidden md:block">Register</i>
            </Link>
            <Link to="/login" className=" flex" title="sign in">
              <i className="md:hidden fa fa-sign-in"></i>
              <i className="hidden md:block">Login</i>
            </Link>
          </div>
        ) : (
          <div className="flex">
            {
              user && user.role === 'admin' 
              ? <Link to="/admin/area" className="px-2 py-1 " title="Dashboard">
                  <svg className="fill-current hover:text-black w-4 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/></svg>
                </Link>
              :
                <Link to="/account" className="px-2 py-1 " title="profile">
                    <svg className="fill-current hover:text-black w-4 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/></svg>
                </Link>
            }
            
          </div>
        )}
        <Link to="/cart"  className="px-2 ml-2">
          <div className="flex text-center">
          <svg className="fill-current hover:text-black w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                <circle cx="10.5" cy="18.5" r="1.5" />
                <circle cx="17.5" cy="18.5" r="1.5" />
            </svg>
            {/* <svg
              className="stroke-current text-purple-600 text-sm inline-block w-8 h-8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="2"></circle>
              <circle cx="20" cy="21" r="2"></circle>
              <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1"></path>
            </svg> */}

            <div className="-mt-3 -ml-3 text-md font-light">
              {cart === null ? 0 : cart.length}
            </div>
          </div>
        </Link>
      </div>

      </div>
      

      
    </div>
  );
};

export default Header;
