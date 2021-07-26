import React from "react";
import { Switch, Route } from "react-router-dom";
import DailySales from "../partials/sales/DailySales";
import WeeklySales from "../partials/sales/WeeklySales";
import MonthlySales from "../partials/sales/MonthlySales";
import AllSales from "../partials/sales/AllSales";
import PageNotFound from "../../inc/PageNotFound";


const SalesPage = () => {
    return (
        <>
            <Switch>
                <Route exact path="/admin/area/sales" component={AllSales} />
                <Route exact path="/admin/area/sales/all" component={AllSales} />
                <Route exact path="/admin/area/sales/daily" component={DailySales} />
                <Route exact path="/admin/area/sales/weekly" component={WeeklySales} />
                <Route exact path="/admin/area/sales/monthly" component={MonthlySales} />
                
                <Route exact path="/admin/area/sales/*" component={PageNotFound} />
            </Switch>
        </>
    );
};

export default SalesPage;
