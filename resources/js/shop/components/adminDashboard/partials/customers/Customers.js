import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Customer from "./Customer";
import DataTable from "react-data-table-component";
import AdminContext from "../../../context/admin/Context";

const Customers = () => {
    // destructure values from context
    const { customers, getCustomers, deleteCustomer, getCustomer } = useContext(
        AdminContext
    );

    const history = useHistory();

    const deleteCust = id => {
        if (window.confirm("Are you sure you want to delete")) {
            deleteCustomer(id);
            getCustomers();
        }
    };
    const editCust = id => {
        getCustomer(id);
        history.push("/admin/area/customer");
    };

    useEffect(() => {
        getCustomers();

        // eslint-disable-next-line
    }, []);

    const customStyles = {
        headCells: {
            style: {
                paddingLeft: "8px", // override the cell padding for head cells
                paddingRight: "8px",
                backgroundColor: "rgba(37, 99, 235)",
                fontSize: "1rem",
                fontWeight: "400"
            }
        }
    };

    //set datables columns
    const columns = [
        {
            name: "First Name",
            selector: row => row["first_name"],
            sortable: true
        },
        {
            name: "Last Name",
            selector: row => row["last_name"],
            sortable: true,
        },
        {
            name: "email",
            selector: row => row["email"],
            sortable: true,
        },
        {
            name: "Phone",
            selector: row => row["phone"],
            sortable: true,
        },
        {
            name: "Transactions",
            selector: row => row.transactions.length,
            sortable: true,
        },
        {
            name: "spent",
            selector: row => row['total_purchases'],
            sortable: true,
        },
        {
            name: "",
            cell: row => (
                <div className="flex">
                    <Link
                        to={`/admin/area/customer/${row.id}`}
                        className="bg-green-600 text-white py-1 px-2 hover:bg-blue-600 transition duration-400"
                    >
                        Details
                    </Link>
                </div>
            ),
        },
        {
            name: "",
            cell: row => (
                <div className="flex">
                    <i
                        onClick={() => editCust(row.id)}
                        className="fa fa-edit text-md font-semibold text-blue-600 px-1 text-md cursor-pointer"
                    ></i>
                    <i
                        onClick={() => deleteCust(row.id)}
                        className="fa fa-trash text-md font-semibold text-red-600 px-1 text-md cursor-pointer mx-1"
                    ></i>
                </div>
            ),
            right: true
        }
    ];

    return (
        <>
            <div className="w-full block px-2 bg-white py-2 -ml-4 pl-2 -mt-1">
                
                {customers?.length > 0 && (
                    <DataTable
                        title="Customers"
                        columns={columns}
                        data={customers}
                        customStyles={customStyles}
                        pagination={true}
                    />
                )}
            </div>
        </>
    );
};

export default Customers;
