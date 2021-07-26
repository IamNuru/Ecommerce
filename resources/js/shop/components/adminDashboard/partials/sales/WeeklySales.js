import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import AdminContext from "../../../context/admin/Context";
import DataTable from "react-data-table-component";

const WeeklySales = () => {
    // destructure values from context
    const { getSales, weeklySales } = useContext(AdminContext);

    const history = useHistory();

    useEffect(() => {
        getSales("weekly");

        // eslint-disable-next-line
    }, []);

    const customStyles = {
        headCells: {
          style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            backgroundColor: "rgba(37, 99, 235)",
            color: 'white',
            fontFamily:'ui-serif times',
            fontSize: '1.25rem',
            lineHeight: '1.75rem'
          }
      }
    }

    //set datables columns
    const columns = [
        {
            name: "Person",
            selector: row => row.user["first_name"] || row.user["last_name"],
            sortable: true
        },
        {
            name: "Amount",
            selector: row => row["amount"],
            sortable: true,
            right: true
        },
        {
            name: "Status",
            selector: row => row["status"],
            sortable: true,
            right: true
        },
        {
            name: "Orders",
            selector: row => row.orders.length,
            sortable: true,
            right: true
        },
        {
            name: "",
            cell: row => (
                <div className="flex">
                    <Link
                        to={`/admin/area/transaction/${row.id}`}
                        className="bg-green-600 text-white py-1 px-2 hover:bg-blue-600 transition duration-400"
                    >
                        Details
                    </Link>
                </div>
            ),
            right: true
        }
    ];

    return (
        <>
            <div className="w-full block px-2 mx-2 bg-white py-2 pl-2 ">
                <div className="flex flex-wrap justify-center flex-shrink-0 my-2">
                    <div className="my-2">
                        <Link
                            to="/admin/area/sales/daily"
                            className="mx-4 px-16 py-4 shadow-stripe-bodered text-xl text-center hover:bg-blue-600 hover:text-white transition duration-400"
                        >
                            Today
                        </Link>
                    </div>
                    <div className="my-2">
                        <Link
                            to="/admin/area/sales/weekly"
                            className="mx-4 px-16 py-4 shadow-stripe-bodered text-xl text-center bg-blue-600 text-white transition duration-400"
                        >
                            This Week
                        </Link>
                    </div>
                    <div className="my-2">
                        <Link
                            to="/admin/area/sales/monthly"
                            className="mx-4 px-16 py-4 shadow-stripe-bodered text-xl text-center hover:bg-blue-600 hover:text-white transition duration-400"
                            >
                            This Month
                        </Link>
                    </div>
                    <div className="my-2">
                        <Link
                            to="/admin/area/sales"
                            className="mx-4 px-16 py-4 shadow-stripe-bodered text-xl text-center hover:bg-blue-600 hover:text-white transition duration-400"
                        >
                            All
                        </Link>
                    </div>
                </div>
                <div>
                    {weeklySales?.length > 0 && (
                        <DataTable
                            title="Sales"
                            columns={columns}
                            data={weeklySales}
                            customStyles={customStyles}
                            pagination={true}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default WeeklySales;
