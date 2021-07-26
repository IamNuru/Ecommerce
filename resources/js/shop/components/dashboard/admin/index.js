import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

//states
import AdminState from "../../context/admin/State";
import DestinationState from "../../context/destination/State";

// ** end state
import Sidebar from "./Sidebar";
import AddProduct from "./products/AddProduct";
import ListProducts from "./products/ListProducts";
import AddCategory from "./categories/AddCategory";
import ListCategories from "./categories/ListCategories";
import Header from "../../inc/Header";
import AddDestination from "./destinations/AddDestination";
import ListDestinations from "./destinations/ListDestinations";

//chats
import ChatList from "./chat/ChatList";
import ChatBox from "./chat/ChatBox";

const AdminDashboard = () => {
    const history = useHistory();
    return (
        <AdminState>
                <>
                    <Header />
                </>
                <div className="mt-28 md:mt-0">
                    <Sidebar />
                </div>
                <div className="block md:ml-48 md:pt-16 mb-16">
                    <div className="block px-4">
                        <Switch>
                            <Route
                                exact
                                path="/admin/area"
                                component={AddProduct}
                            />
                            <Route
                                exact
                                path="/admin/area/product"
                                component={AddProduct}
                            />
                            <Route
                                exact
                                path="/admin/area/products"
                                component={ListProducts}
                            />
                            <Route
                                exact
                                path="/admin/area/category"
                                component={AddCategory}
                            />
                            <Route
                                exact
                                path="/admin/area/destination"
                                component={AddDestination}
                            />
                            <Route
                                exact
                                path="/admin/area/destinations"
                                component={ListDestinations}
                            />
                            <Route
                                exact
                                path="/admin/area/chatlist"
                                component={ChatList}
                            />
                            <Route
                                exact
                                path="/admin/area/chat/:from_id/:name"
                                component={ChatBox}
                            />
                            <Route
                                exact
                                path="/admin/area/categories"
                                component={ListCategories}
                            />
                        </Switch>
                    </div>
                </div>
        </AdminState>
    );
};

export default AdminDashboard;
