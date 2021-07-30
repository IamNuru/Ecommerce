import React from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import Details from "./account/Details";
import Address from "./account/Address";
import ResetPassword from "./account/ResetPassword";
import Orders from "./tstore/Orders";
import WishList from "./tstore/WishList";
import Sidebar from "../../inc/Sidebar";
import Header from "../../inc/Header"
import ReviewProduct from "../../products/reviews/ReviewProduct";
import Profile from "./profile-page/Profile";

const ProfileMain = () => {
  const history = useHistory();
  return (
    <div className="block h-full">
      <div className="md:hidden mt-28">
        <><Header /></>
        <><Sidebar /></>
      </div>
      <div className="flex justify-between w-full shadow-md mb-2">
        <div>
          <i
          className="fa fa-angle-left text-3xl text-green-600 m-1 font-bold cursor-pointer px-2 py-1"
          onClick={() => history.goBack()}
          title="go back"
        ></i>
        </div>
        <div className="mr-4 flex">
          <Link to="/account" className="text-purple-400 hover:text-purple-800 mr-2">Account</Link>
          <Link to="/" className="text-purple-400 hover:text-purple-800">Home</Link>
        </div>
        
      </div>
      <div className="w-full">
        <Switch>
          <Route exact path="/account/profile" component={Profile} />
          <Route
            exact
            path="/account/resetpassword"
            component={ResetPassword}
          />
          <Route exact path="/account/orders" component={Orders} />
          <Route exact path="/account/wishlist" component={WishList} />
          <Route exact path="/account/product/:id/review" component={ReviewProduct} />
        </Switch>
      </div>
    </div>
  );
};

export default ProfileMain;
