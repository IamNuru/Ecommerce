import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import AdminContext from "../../../context/admin/Context";
import DataTable from "react-data-table-component";

const AllSales = () => {
    // destructure values from context
    const { getSales, sales, getSalesByDateRange } = useContext(AdminContext);
    const startDate = useRef(null)
    const endDate = useRef(null)
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)

    const history = useHistory();

    useEffect(() => {
        getSales("all");
        endDate.current.valueAsDate = new Date();
        startDate.current.valueAsDate = new Date();
        endDate.current.setAttribute('min', new Date().toISOString().split('T')[0])

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
            selector: row => row.user && row.user["first_name"] && row.user["first_name"] ||row.user && row.user["last_name"] && row.user["last_name"],
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


    //filter by dates
    const handleDateChanges = () =>{
        setFromDate(startDate.current.value)
        setToDate(endDate.current.value)
    }

    const handleDateResults = () =>{
        if (fromDate > toDate) {
            alert('Invalid Date Range')
        }else{
            getSalesByDateRange(fromDate, toDate)
        }
    }
    const handleEndDateClick = () =>{
        /* var today = new Date().toISOString().split('T')[0];
        endDate.current.setAttribute('min', today) */
    }

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
                            className="mx-4 px-16 py-4 shadow-stripe-bodered text-xl text-center hover:bg-blue-600 hover:text-white transition duration-400"
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
                            className="mx-4 px-16 py-4 shadow-stripe-bodered text-xl text-center bg-blue-600 text-white transition duration-400"
                        >
                            All
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border border-gray-200 p-2 overflow-auto mb-2 mt-6 mx-auto" style={{maxWidth:"37rem"}}>
                    <div className="flex">
                        <label className="text-gray-700 whitespace-nowrap text-xs font-medium mt-1">Start Date &nbsp;</label>
                        <input type="date" name="startDate" ref={startDate} onChange={handleDateChanges} className="text-center text-md font-medium text-pink-400" style={{maxWidth:"250px"}} />
                    </div>
                    <div className="flex">
                        <label className="text-gray-700 whitespace-nowrap text-xs font-medium mt-1">End Date &nbsp;</label>
                        <input type="date" name="endDate" ref={endDate}  onChange={handleDateChanges} onClick={handleEndDateClick} className="text-center text-md font-medium text-pink-400" style={{maxWidth:"250px"}}/>
                        <button type="submit" onClick={handleDateResults} className="px-4 ml-1 bg-blue-600 text-white">View</button>
                    </div>
                </div>
                <div>
                    {sales?.length > 0 && (
                        <DataTable
                            columns={columns}
                            data={sales}
                            customStyles={customStyles}
                            pagination={true}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default AllSales;
