import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Brand from "./Brand";
import BrandContext from "../../../context/brand/Context";
import PieChart from "../charts/PieChart";
import DataTable from "react-data-table-component";

const ListBrands = () => {
    // destructure values from context
    const {
        brands,
        getBrands,
        deleteBrand,
        getBrand,
        success
    } = useContext(BrandContext);
    const history = useHistory();

    useEffect(() => {
        getBrands();

        // eslint-disable-next-line
    }, []);

    const editBrand = id => {
        getBrand(id);
        history.push("/admin/area/Brand");
    };
    const deleteCat = id => {
        if (window.confirm("Are you sure you want to Delete")) {
            deleteBrand(id);
            getBrands();
        }
    };

    const customStyles = {
      headCells: {
        style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
          backgroundColor: "rgba(37, 99, 235)",
          fontSize: "1rem",
          fontWeight: "400",
        }
    }
  }

    //set datables columns
    const columns = [
        {
            name: "Name",
            selector: row => row["name"],
            sortable: true
        },
        {
            name: "Qty",
            selector: row => row.products.length,
            sortable: true,
            right: true
        },
        {
          name: "",
          cell: row => (
              <div className="flex">
                  <i
                      onClick={() => editBrand(row.id)}
                      className="fa fa-edit text-md font-semibold text-blue-600 px-1 text-md cursor-pointer"
                  >
                  </i>
                  <i
                      onClick={() => deleteCat(row.id)}
                      className="fa fa-trash text-md font-semibold text-red-600 px-1 text-md cursor-pointer mx-1"
                  ></i>
              </div>
          ),
          selector: row => row.products.length,
          sortable: true,
          right: true
      },
    ];

    return (
        <>
            <div className="w-screen flex px-2 bg-white py-2 -ml-4 pl-2 -mt-1">
                <li className="list-none">
                    <Link
                        to="/admin/area/brand"
                        className="text-purple-600 px-2 py-1 flex"
                    >
                        New Brand
                    </Link>
                </li>
            </div>
            <div className="m-auto md:w-2/3 px-4 block">
                {brands?.length > 0 && (
                    <DataTable
                        title="Brands"
                        columns={columns}
                        data={brands}
                        customStyles={customStyles}
                        pagination={true}
                    />
                )}

                {success && (
                    <div className="py-4 text-blue-800 text-md italic text-center">
                        {success.message}
                    </div>
                )}
                <div className="mt-4">
                    {brands?.length > 0 && (
                        <PieChart brands={brands} />
                    )}
                </div>
            </div>
        </>
    );
};

export default ListBrands;
