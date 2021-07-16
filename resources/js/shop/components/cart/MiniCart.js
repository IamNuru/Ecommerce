import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import CartContext from "../context/cart/CartContext";

const MiniCart = () => {
    const { cart } = useContext(CartContext);

    const columns = [
        {
            name: "Title",
            selector: "title",
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Price",
            selector: "price",
            sortable: true,
            right: true
        }
    ];
    return (
        <div>
            <DataTable title="Cart Items" columns={columns} data={cart} />
            <div className="w-full text-right">
                <Link to="/cart" className="text-purple-600 hover:text-blue-600 transition duartion-400 text-monospace">View Cart</Link>
            </div>
        </div>
    );
};

export default MiniCart;
