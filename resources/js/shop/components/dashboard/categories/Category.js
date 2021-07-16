import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ProductsContext from "../../context/products/ProductsContext";
import { Link } from "react-router-dom";

const Category = (props) => {
  const { deleteCategory, getCategories, getCategory } = useContext(
    ProductsContext
  );

  const { category } = props;
  const history = useHistory();

  const editCategory = (id) => {
    getCategory(id);
    history.push("/dashboard/category");
  };
  const deleteCat = (id) => {
    if (window.confirm("Are you sure you want to Delete")) {
      deleteCategory(id);
      getCategories();
    }
  };

  return category === null ? (
    "Loading"
  ) : (
    <tr className="border-2 border-l-4 border-r-4 border-white bg-gray-400">
      <td className="pl-2 pt-2 pb-2 md:table-cell">
        <Link
          to={`/category/${category.slug}`}
          className="w-full text-white text-md hover:text-blue-800"
        >
          {category.name}
        </Link>
      </td>
      <td className="pt-2 pb-2 text-center">{category.products.length}</td>
      <td className="flex pt-2 pb-2 text-right">
        <i
          onClick={() => editCategory(category.id)}
          className="fa fa-edit text-md font-semibold text-blue-600 px-1 text-md cursor-pointer"
        ></i>
        <i
          onClick={() => deleteCat(category.id)}
          className="fa fa-trash text-md font-semibold text-red-600 px-1 text-md cursor-pointer mx-1"
        ></i>
      </td>
    </tr>
  );
};

export default Category;
