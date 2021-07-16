import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";


import Category from "./Category";
import ProductsContext from "../../../context/products/ProductsContext";
import PieChart from "../../charts/PieChart";

const ListCategories = () => {
  // destructure values from context
  const { categories, getCategories, success } = useContext(ProductsContext);
  useEffect(() => {
      getCategories();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="w-screen flex px-2 bg-white py-2 -ml-4 pl-2 -mt-1">
        <li className="list-none">
          <Link to="/admin/area/category" className="text-purple-600 px-2 py-1 flex">New Category <i className="fa fa-plus"></i></Link>
        </li>
      </div>
    <div className="m-auto md:w-2/3 px-4 block">
      
      <table className="w-full text-sm lg:text-base" cellSpacing="0">
        <thead>
          <tr className="h-12 uppercase">
            <th className="text-left">Name</th>
            <th className="text-center md:table-cell">Qty</th>
            <th className="text-right md:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 ? (
            categories.map((category, index) => {
              return <Category category={category} key={index} />;
            })
          ) : (
            <tr className="text-center">
              <td>No categories yet</td>
            </tr>
          )}
        </tbody>
      </table>
      {success && (
        <div className="py-4 text-blue-800 text-md italic text-center">
          {success.message}
        </div>
      )}
      <div className="mt-4">
        {
          categories?.length > 0 && <PieChart categories={categories}/>
        }
      </div>
    </div>
    </div>
  );
};

export default ListCategories;
