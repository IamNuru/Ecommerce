import React, { useContext, useEffect } from "react";

import Destination from "./Destination";
import ProductsContext from "../../../context/products/ProductsContext";
import DestinationContext from "../../../context/destination/Context";
import { Link } from "react-router-dom";

const ListDestinations = () => {
  // destructure values from context
  const {  success } = useContext(ProductsContext);
  const { destinations, getDestinations } = useContext(DestinationContext);
  useEffect(() => {
      getDestinations();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
    <div className="w-screen flex px-2 bg-white py-2 -ml-4 pl-2 -mt-1">
        <li className="list-none">
          <Link to="/admin/area/destination" className="text-purple-600 px-2 py-1">Add New Destination <i className="fa fa-plus"></i></Link>
        </li>
      </div>
    <div className="m-auto px-4 block">
      
      <table className="w-full text-sm lg:text-base" cellSpacing="0">
        <thead>
          <tr className="h-12 uppercase">
            <th className="text-left">Name</th>
            <th className="text-center md:table-cell">Station</th>
            <th className="text-center md:table-cell">Phone</th>
            <th className="text-center md:table-cell">Days to Arrive</th>
            <th className="text-center md:table-cell">Charge</th>
            <th className="text-center md:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {destinations !== null ?
          destinations.length > 0 ? (
            destinations.map((destination, index) => {
              return <Destination destination={destination} key={index} />;
            })
          ) : (
            <tr className="text-center">
              <td>No destinations yet</td>
            </tr>
          ):(
            <tr className="text-center">
              <td>Loading</td>
            </tr>
          )
        }
        </tbody>
      </table>
      {success && (
        <div className="py-4 text-blue-800 text-md italic text-center">
          {success.message}
        </div>
      )}
    </div>
    </div>
  );
};

export default ListDestinations;
