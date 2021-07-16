import React from "react";

import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainPage from "./homePage/MainPage";
import Electronic from "./products/electronic/Electronic";
import Clothings from "./products/clothings/Clothings";
import CategoryProducts from "./products/CategoryProducts";
import Cart from "./cart/Cart";
import Checkout from "./cart/Checkout";
import SearchedItem from "./SearchPage";
import LoginPage from "./auth/LoginPage";
import Register from "./auth/Register";
import SingleProduct from "./products/SingleProduct";
import SuccessOrder from "./cart/SuccessOrder";
import Sidebar from "./inc/Sidebar";
import Shoes from "./products/shoes/Shoes";
import PageNotFound from "./inc/PageNotFound";
import Header from "./inc/Header";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import UnAuthorisedPage from "./inc/UnAuthorisedPage";
import AllProductsPage from "./homePage/AllProductsPage";

const Main = (props) => {
  return (
    <div className="block md:flex h-full">
      <>
        <Header />
      </>
      <>
        <Sidebar />
      </>
      <div className="w-full md:ml-48 mt-28 md:mt-14 px-1 md:pl-4">
        <Switch>
          <Route exact path="/electronics" component={Electronic} />
          <Route exact path="/clothings" component={Clothings} />
          <Route exact path="/shoes" component={Shoes} />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/cart/checkout" component={Checkout} />
          <ProtectedRoute
            exact
            path="/cart/checkout/success/:ref/:channel/:amount"
            component={SuccessOrder}
          />
          <Route exact path="/search" component={SearchedItem} />
          <Route exact path="/category/:cat" component={CategoryProducts} />
          <Route exact path="/product/:id" component={SingleProduct} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/allproducts" component={AllProductsPage} />
          <Route exact path="/an-authorised-page" component={UnAuthorisedPage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
