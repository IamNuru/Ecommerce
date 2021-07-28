import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import BrandContext from "../../../context/brand/Context";
import { Link } from "react-router-dom";

const Brand = (props) => {
  const { deleteBrand, getBrands, getBrand } = useContext(
    BrandContext
  );

  const { brand } = props;
  const history = useHistory();

  const editBrand = (id) => {
    getBrand(id);
    history.push("/admin/area/brand");
  };
  const deleteBra = (id) => {
    if (window.confirm("Are you sure you want to Delete")) {
      deleteBrand(id);
      getBrands();
    }
  };

  return brand === null ? (
    "Loading"
  ) : (
    <tr className="border-2 border-l-4 border-r-4 border-white bg-gray-400">
      <td className="pl-2 pt-2 pb-2 md:table-cell">
        <Link
          to={`/brand/${brand.id}`}
          className="w-full text-white text-md hover:text-blue-800"
        >
          {brand.name}
        </Link>
      </td>
      <td className="pt-2 pb-2 text-center">{brand.products.length}</td>
      <td className="flex pt-2 pb-2 text-right">
        <i
          onClick={() => editBrand(brand.id)}
          className="fa fa-edit text-md font-semibold text-blue-600 px-1 text-md cursor-pointer"
        >E</i>
        <i
          onClick={() => deleteBra(brand.id)}
          className="fa fa-trash text-md font-semibold text-red-600 px-1 text-md cursor-pointer mx-1"
        ></i>
      </td>
    </tr>
  );
};

export default Brand;
