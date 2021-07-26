import React, { useContext, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Link } from "react-router-dom";
import FormLoadingCover from "../../../inc/FormLoadingCover";

import AdminContext from "../../../context/admin/Context";

const Transactions = () => {
    // destructure values from context
    const {
        setLoading,
        getTransactions,
        updateTransactionStatus,
        getFilteredTransactions,
        filtered,
        formLoading,
        setFormLoading
    } = useContext(AdminContext);
    const text = useRef("");
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        setLoading(true);
        getTransactions();

        // eslint-disable-next-line
    }, [formLoading]);

    const Toast = MySwal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: toast => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
    });

    const updateTransaction = (id, status) => {
        MySwal.fire({
            text: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: `Save Changes`
        }).then(async result => {
            if (result.isConfirmed) {
                await setFormLoading(true);
                await updateTransactionStatus(id, data);
                if (!formLoading) {
                    getTransactions();
                    Toast.fire({
                        icon: "success",
                        title: "Changes Saved succesfully"
                    });
                } else {
                    MySwal.fire("Something went wrong. Try again", "", "info");
                }
            }
        });
        let data = {
            status: status
        };
    };

    //data table variables
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
    const columns = [
        {
            name: "ID",
            selector: row => row["id"],
            sortable: true
        },
        {
            name: "Trans ID",
            selector: row => row["transaction_id"],
            cell: row => (
                <Link
                    to={`/admin/area/transaction/${row["id"]}`}
                    className="text-purple-600 hover:text-blue-600 transition duration-400"
                >
                    {row["transaction_id"]}
                </Link>
            ),
            sortable: true
        },
        {
            name: "Amount",
            selector: row => row["amount"],
            sortable: true
        },
        {
            name: "Status",
            selector: row => row["status"],
            sortable: true
        },
        {
            name: "Action",
            minWidth: "400px",
            selector: row => row["status"],
            cell: row => (
                <div className="flex flex-wrap">
                    <div
                        className={`flex whitespace-nowrap relative mx-1 my-1`}
                    >
                        <button
                            onClick={() => updateTransaction(row.id, "placed")}
                            className="text-center px-2 py-1 bg-green-300 text-white font-serif"
                        >
                            Placed
                        </button>
                        {row["status"] === "placed" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 -mt-2 right-0 absolute -ml-2 fill-current text-blue-700"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z" />
                            </svg>
                        )}
                    </div>
                    <div
                        className={`flex whitespace-nowrap relative mx-1 my-1`}
                    >
                        <button
                            onClick={() =>
                                updateTransaction(row.id, "processing")
                            }
                            className="text-center px-2 py-1 bg-green-500 text-white font-serif"
                        >
                            Processing
                        </button>
                        {row["status"] === "processing" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 -mt-2 right-0 absolute -ml-2 fill-current text-blue-700"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z" />
                            </svg>
                        )}
                    </div>
                    <div
                        className={`flex whitespace-nowrap relative mx-1 my-1`}
                    >
                        <button
                            onClick={() =>
                                updateTransaction(row.id, "onTransit")
                            }
                            className="text-center px-2 py-1 bg-pink-600 text-white font-serif"
                        >
                            onTransit
                        </button>
                        {row["status"] === "onTransit" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 -mt-2 right-0 absolute -ml-2 fill-current text-blue-700"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z" />
                            </svg>
                        )}
                    </div>
                    <div
                        className={`flex whitespace-nowrap relative mx-1 my-1`}
                    >
                        <button
                            onClick={() => updateTransaction(row.id, "ready")}
                            className="text-center px-2 py-1 bg-pink-400 text-white font-serif"
                        >
                            Ready
                        </button>
                        {row["status"] === "ready" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 -mt-2 right-0 absolute -ml-2 fill-current text-blue-700"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z" />
                            </svg>
                        )}
                    </div>
                    <div
                        className={`flex whitespace-nowrap relative mx-1 my-1`}
                    >
                        <button
                            onClick={() =>
                                updateTransaction(row.id, "completed")
                            }
                            className="text-center px-2 py-1 bg-green-700 text-white font-serif"
                        >
                            Completed
                        </button>
                        {row["status"] === "completed" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 -mt-2 right-0 absolute -ml-2 fill-current text-blue-700"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z" />
                            </svg>
                        )}
                    </div>
                </div>
            ),
            sortable: true,
            center: true
        }
    ];

    const handleSearchInputChanges = e => {
        e.preventDefault();
        if (text.current.value !== "") {
            getFilteredTransactions(text.current.value);
        } else {
            getTransactions();
        }
    };

    return (
        <div className="m-auto px-4 block">
            {formLoading && <FormLoadingCover />}
            <div className="w-full">
                <form onSubmit={handleSearchInputChanges} className="flex">
                    <input
                        required
                        ref={text}
                        onChange={handleSearchInputChanges}
                        type="text"
                        placeholder="Search"
                        className="pl-2 py-1.5 w-full mr-2 border border-gray-300 focus:border-purple-300 outline-none"
                    />
                    <button
                        type="submit"
                        className="outline-none bg-blue-600 py-1 text-white px-4 text-times font-semibold"
                    >
                        search
                    </button>
                </form>
            </div>
            {filtered?.length > 0 ? (
                <DataTable
                    title="Transactions"
                    columns={columns}
                    data={filtered}
                    customStyles={customStyles}
                    pagination={true}
                />
            ) : (
                <h2 className="mt-16 text-center font-serif font-medium xl">
                    No Data
                </h2>
            )}
        </div>
    );
};

export default Transactions;
