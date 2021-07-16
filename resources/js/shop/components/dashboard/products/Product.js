import React, { useContext } from "react";
import { useHistory } from "react-router";
import ProductsContext from "../../context/products/ProductsContext";

const Product = (props) => {
  const { product } = props;
  const { deleteProduct, getProducts, getProduct } =
    useContext(ProductsContext);
  const history = useHistory();

  const deleteProd = (id) => {
    if(window.confirm("Are you sure you want to delete")){
      deleteProduct(id);
      getProducts();
    }
    
  };
  const editProd = (id) => {
    getProduct(id);
    history.push("/dashboard/product");
  };
  return props.product === null ? (
    "Loading"
  ) : (
    <tr className="border-8 border-l-4 border-r-4 border-white bg-gray-400">
      <td className="hidden pt-4 pb-4 md:table-cell">
        <div>
          <img
            src={`${process.env.REACT_APP_URL}/storage/images/products/${product.image}`}
            className="w-20 rounded"
            alt="Thumbnail"
          />
        </div>
      </td>
      <td className="pt-4 pb-4 pl-4">{product.title}</td>
      <td className="pt-4 pb-4 text-center">{product.price}</td>
      <td className="hidden pt-4 pb-4 md:table-cell text-center">
        {product.deduction}
      </td>
      <td className="pt-4 pb-4 text-center ">{product.qty}</td>
      <td className="flex pt-4 pb-4 md:text-right">
        <i
          onClick={() => editProd(product.id)}
          className="fa fa-edit text-md font-semibold text-blue-600 px-1 text-md cursor-pointer"
        ></i>
        <i
          onClick={() => deleteProd(product.id)}
          className="fa fa-trash text-md font-semibold text-red-600 px-1 text-md cursor-pointer mx-1"
        ></i>
      </td>
    </tr>
  );
};

export default Product;