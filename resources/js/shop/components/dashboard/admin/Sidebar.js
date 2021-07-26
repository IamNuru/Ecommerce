import React, { Fragment, useContext, useState , useRef} from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/user/Context"
import SettingsContext from "../../context/settings/Context";
import "../../../styles/sidebar.css"

const Sidebar = () => {
  const { logout} = useContext(AuthContext);
  const { isNavbarOpen, closeNavbar } = useContext(SettingsContext);
  const { pathname } = useLocation()
  const navdrop = useRef("navdrop")
  
 


  const onMobileNavClick = () => {
    window.addEventListener('click', function(e){   
      if (document.getElementById('mobile-navs') && document.getElementById('mobile-navs').contains(e.target)){
        closeNavbar(false)
      } 
      else if (document.getElementById('mobile-nav') && document.getElementById('mobile-nav').contains(e.target)){
        closeNavbar(true)
      } 
      else if (document.getElementById('cover') && document.getElementById('cover').contains(e.target)){
        closeNavbar(false)
      } 
    });
    
  }
  return (
    <Fragment>
    <div className="md:pb-8 md:pt-6 transition-all duration-1000 -mt-14 md:mt-12 bg-white md:shadow-2xl px-2 py-2 z-20 w-full text-center md:w-48 md:h-screen fixed">
      <nav className="hidden md:block">
        <ul className="border-b pb-6 block whitespace-nowrap overflow-auto justify-center text-left">
          <li className={`${pathname==='/' && 'text-red-600 ml-2'} nav-li text-gray-600 hover:text-black mb-1 transition duration-1000 px-4 py-2 md:px-0 md:py-0`}>
            <Link to="/" className="px-2 inline-block w-full">
              Home
            </Link>
          </li>
          <details className={`${pathname==='/admin/area/product' && 'text-red-600'} nav-li  text-gray-600 hover:text-black mb-1  px-4 py-2 md:px-0 md:py-0`}>
            <summary id="fireNext" className="px-2  cursor-pointer flex w-full justify-between">
                <div className="">Manage Product</div>
                <i className="fa fa-plus"></i>
            </summary>
            <ul className={`items overflow-hidden`}>
              <li className={`${pathname==='/admin/area/product' && 'text-red-600'}  text-gray-600 hover:text-black  px-4 py-2 md:pl-4 md:py-0`}>
                <Link to="/admin/area/product" className="px-2 inline-block w-full">
                  Add Product
                </Link>
              </li>
              <li className={`${pathname==='/admin/area/products' && 'text-red-600'}  text-gray-600 hover:text-black  px-4 py-2 md:pl-4 md:py-0`}>
                <Link to="/admin/area/products" className="px-2 inline-block w-full">
                  List Products
                </Link>
              </li>
            </ul>
          </details>
          <details className={` text-gray-600 hover:text-black mb-1  px-4 py-2 md:px-0 md:py-0`}>
            <summary className="px-2  cursor-pointer flex w-full justify-between">
                <div className="">Category</div>
                <i className="fa fa-plus"></i>
            </summary>
            <ul className={`items overflow-hidden`}>
              <li className={`${pathname==='/admin/area/category' && 'text-red-600'}  text-gray-600 hover:text-black  px-4 py-2 md:pl-4 md:py-0`}>
                <Link to="/admin/area/category" className="px-2 inline-block w-full">
                  Add Category
                </Link>
              </li>
              <li className={`${pathname==='/admin/area/categories' && 'text-red-600'}  text-gray-600 hover:text-black  px-4 py-2 md:pl-4 md:py-0`}>
                <Link to="/admin/area/categories" className="px-2 inline-block w-full">
                  List Categories
                </Link>
              </li>
            </ul>
          </details>
          <details className={` text-gray-600 hover:text-black mb-1  px-4 py-2 md:px-0 md:py-0`}>
            <summary className="px-2  cursor-pointer flex w-full justify-between">
                <div className="">Destination</div>
                <i className="fa fa-plus"></i>
            </summary>
            <ul className={`items overflow-hidden`}>
              <li className={`${pathname==='/admin/area/destination' && 'text-red-600'}  text-gray-600 hover:text-black  px-4 py-2 md:pl-4 md:py-0`}>
                <Link to="/admin/area/destination" className="px-2 inline-block w-full">
                  Add Destination
                </Link>
              </li>
              <li className={`${pathname==='/admin/area/destinations' && 'text-red-600'}  text-gray-600 hover:text-black  px-4 py-2 md:pl-4 md:py-0`}>
                <Link to="/admin/area/destinations" className="px-2 inline-block w-full">
                  List Destinations
                </Link>
              </li>
            </ul>
          </details>
          
          <li className={`${pathname==='/admin/area/chatlist' && 'text-red-600 ml-2'} text-gray-600 hover:text-black mb-1  px-4 py-2 md:px-0 md:py-0`}>
            <Link to="/admin/area/chatlist" className="px-2 inline-block w-full">
              Chatlist
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="mt-8 hidden md:block">
        <ul className="flex whitespace-nowrap overflow-auto px-8 md:px-2 md:block justify-center md:text-left">
          {
            <li className="">
              <button onClick={() => logout()} className="outline-none">Logout</button>
            </li>
          }
        </ul>
      </nav>
    </div>


    {/* Mobile view navs */}
    {/* <div onClick={onMobileNavClick} id="mobile-nav" className={`${!isNavbarOpen ? 'invisible opacity-0' : 'visible opacity-full'} md:hidden transition-all duration-1000 -mt-14 bg-gray-200 px-2 py-1 z-20 w-72 h-screen fixed`}> */}
    <div onClick={onMobileNavClick} id="cover" className={`${!isNavbarOpen ? 'w-0' : 'w-full'} md:hidden fixed transition-all duration-300 z-20 -mt-14 h-screen bg-black bg-opacity-25`}>
    <div id="mobile-nav" className={`${!isNavbarOpen ? '-ml-60' : 'w-60'} transition-all duration-700 md:hidden bg-white px-1 z-40 h-screen`}>
      <nav id="mobile-navs" className="block z-40">
        <ul className="block whitespace-nowrap overflow-auto px-1">
          <li className="hover:bg-purple-400  py-2">
            <Link to="/" className="px-2 inline-block w-full">
              Home
            </Link>
          </li>
          <li className="hover:bg-purple-400  py-2">
            <Link to="/admin/area/product" className="px-2 inline-block w-full">
              Product
            </Link>
          </li>
          <li className="hover:bg-purple-400  py-2">
            <Link to="/admin/area/category" className="px-2 inline-block w-full">
            Category
            </Link>
          </li>
          <li className="hover:bg-purple-400  py-2">
            <Link to="/admin/area/destination" className="px-2 inline-block w-full">
              Destination
            </Link>
          </li>
          <li className="hover:bg-purple-400  py-2">
            <Link to="/admin/area/chatlist" className="px-2 inline-block w-full">
              Chat List
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="mt-8 block">
        <ul className="flex whitespace-nowrap overflow-auto px-8">
          {
            <li className="hover:bg-purple-400 hover:rounded-md rounded  px-4 py-2 md:px-0 md:py-0">
              <button onClick={() => logout()} className="outline-none">Logout</button>
            </li>

          }
        </ul>
      </nav>
    </div>
    </div>
    </Fragment>
  );
};

export default Sidebar;
