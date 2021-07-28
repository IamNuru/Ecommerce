import React, { useState } from "react";
import { Switch, } from "react-router-dom";
import AdminRoute from "../../routes/AdminRoute";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

import Main from "./Main";
import ListProducts from "../../dashboard/admin/products/ListProducts";
import ListCategories from "../../dashboard/admin/categories/ListCategories";
import ChatBox from "../../dashboard/admin/chat/ChatBox";
import ChatList from "../../dashboard/admin/chat/ChatList";
import ListDestinations from "../../dashboard/admin/destinations/ListDestinations";
import AddDestination from "../../dashboard/admin/destinations/AddDestination";
import AddCategory from "../../dashboard/admin/categories/AddCategory";
import AddProduct from "../../dashboard/admin/products/AddProduct";
import PageNotFound from "../../inc/PageNotFound";
import UserChatBox from "../../dashboard/admin/chat/ChatBox";
import AdminState from "../../context/admin/State";
import Transaction from "../partials/sales/transaction/Transaction";
import SalesPage from "./SalesPage";
import TrackOrder from "../partials/sales/transaction/TrackOrder";
import Profile from "../../dashboard/profile/profile-page/Profile";
import Customers from "../partials/customers/Customers"
import Customer from "../partials/customers/Customer"
import Transactions from "../partials/transactions/Transactions";
import AddBrand from "../../dashboard/admin/brands/AddBrand";
import ListBrands from "../../dashboard/admin/brands/ListBrands";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AdminState>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/*  Site header */}
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <main>
                        <Switch>
                            <AdminRoute exact path="/admin/area/" component={Main} />
                            <AdminRoute
                                exact
                                path="/admin/area/product"
                                component={AddProduct}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/products"
                                component={ListProducts}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/category"
                                component={AddCategory}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/destination"
                                component={AddDestination}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/destinations"
                                component={ListDestinations}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/chatlist"
                                component={ChatList}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/chat/:id/:name"
                                component={UserChatBox}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/profile"
                                component={Profile}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/categories"
                                component={ListCategories}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/:id/new"
                                component={ChatBox}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/sales/*"
                                component={SalesPage}
                            /> 
                            <AdminRoute
                                exact
                                path="/admin/area/customers"
                                component={Customers}
                            /> 
                            <AdminRoute
                                exact
                                path="/admin/area/customer/:id"
                                component={Customer}
                            /> 
                            <AdminRoute
                                exact
                                path="/admin/area/sales"
                                component={SalesPage}
                            /> 
                            <AdminRoute
                                exact
                                path="/admin/area/transactions"
                                component={Transactions}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/transaction/:id"
                                component={Transaction}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/trackorder"
                                component={TrackOrder}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/brand"
                                component={AddBrand}
                            />
                            <AdminRoute
                                exact
                                path="/admin/area/brands"
                                component={ListBrands}
                            />







                            {/* if no Admin return 404 page within here */}
                            <AdminRoute
                                exact
                                path="/admin/area/*"
                                component={PageNotFound}
                            />
                        </Switch>
                    </main>
                    <Banner />
                </div>
            </div>
        </AdminState>
    );
}

export default Dashboard;
