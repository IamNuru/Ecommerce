import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import AddProduct from "./products/AddProduct";
import ListProducts from "./products/ListProducts";
import AddCategory from "./categories/AddCategory";
import ListCategories from "./categories/ListCategories";
import Header from "../inc/Header";

//chats
import ChatList from "./chat/ChatList"
import ChatBox from "./chat/ChatBox";

const Dashboard = () => {
  const history = useHistory();
  return (
    <>
      <>
        <Header />
      </>
      <div className="mt-28 md:mt-0">
        <Sidebar />
      </div>
      <div className="block md:ml-48 md:pt-16 mb-16">
        <div className="w-full shadow-md mb-2">
          <i
            className="fa fa-angle-left text-3xl text-green-600 m-1 font-bold cursor-pointer px-2 py-1"
            onClick={() => history.goBack()}
            title="go back"
          ></i>
        </div>
        <div className="block px-4">
          <Switch>
            <Route exact path="/dashboard/product" component={AddProduct} />
            <Route exact path="/dashboard/products" component={ListProducts} />
            <Route exact path="/dashboard/category" component={AddCategory} />
            <Route exact path="/dashboard/chatlist" component={ChatList} />
            <Route exact path="/dashboard/chat/:from_id/:name" component={ChatBox} />
            <Route
              exact
              path="/dashboard/categories"
              component={ListCategories}
            />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
