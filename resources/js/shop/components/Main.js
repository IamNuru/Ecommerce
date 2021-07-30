import React, {useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../styles/style.css"

import { Switch, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainPage from "./homePage/MainPage";
import Electronic from "./products/categories/electronic/Electronic";
import Clothings from "./products/categories/clothings/Clothings";
import CategoryProducts from "./products/categories/CategoryProducts";
import Cart from "./cart/Cart";
import Checkout from "./cart/inc/Checkout";
import SearchedItem from "./SearchPage";
import SingleProduct from "./products/SingleProduct";
import SuccessOrder from "./cart/inc/SuccessOrder";
import Sidebar from "./inc/Sidebar";
import Shoes from "./products/categories/shoes/Shoes";
import PageNotFound from "./inc/PageNotFound";
import Header from "./inc/Header";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import UnAuthorisedPage from "./inc/UnAuthorisedPage";
import AllProductsPage from "./products/all/AllProductsPage";
import WishList from "./dashboard/profile/tstore/WishList";
import Login from "./auth/Login";
import Register from "./auth/Register";
import About from "./About";

const Main = (props) => {
  const location = useLocation();
  const nodeRef = useRef(null)

  return (
    <div className="block h-full">
      <>
        <Header />
      </>
      <>
        <Sidebar />
      </>
      <div className="w-full md:ml-48 mt-28 md:mt-14 px-1 md:pl-4">

        <TransitionGroup>
          <CSSTransition
          nodeRef={nodeRef} in timeout={500}
          classNames="fade"
          >
           <div ref={nodeRef}>
        <Switch>
          
          <Route exact path="/electronics" component={Electronic} />
          <Route exact path="/clothings" component={Clothings} />
          <Route exact path="/shoes" component={Shoes} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/wishlist" component={WishList} />
          <ProtectedRoute exact path="/cart/checkout" component={Checkout} />
          <ProtectedRoute
            exact
            path="/cart/checkout/success/:ref/:channel/:amount"
            component={SuccessOrder}
          />
          <Route exact path="/about" component={About} />
          <Route exact path="/search" component={SearchedItem} />
          <Route exact path="/category/:cat" component={CategoryProducts} />
          <Route exact path="/product/:id" component={SingleProduct} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/allproducts" component={AllProductsPage} />



          <Route exact path="/an-authorised-page" component={UnAuthorisedPage} />
          <Route path="*" component={PageNotFound} />
        </Switch></div> 
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Main;
