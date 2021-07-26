import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import ProductsContext from "../../../context/products/Context";
import DataTable from "react-data-table-component";
import ImportExportProducts from "./ImportExportProducts";


const ListProducts = () => {
  const MySwal = withReactContent(Swal);

  // destructure values from context
  const { products, getProducts, deleteProduct, getProduct, filtered } = useContext(ProductsContext);

  const history = useHistory();

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
  const deleteProd = (id) => {
      deleteProduct(id);
    }
  
  const editProd = (id) => {
    getProduct(id);
    history.push("/admin/area/product");
  };

  useEffect(() => {
    getProducts();

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
          name: "ID",
          selector: row => row["id"],
          sortable: true
      },
      {
          name: "Title",
          selector: row => row["title"],
          sortable: true
      },
      
      {
          name: "Price",
          selector: row => row["price"],
          sortable: true,
          right: true
      },
      {
          name: "Deduction",
          selector: row => row["deduction"],
          sortable: true,
          right: true
      },
      {
          name: "Qty",
          selector: row => row["qty"],
          sortable: true,
          right: true
      },
      {
        name: "Action",
        cell: row => (
            <div className="flex">
                <svg onClick={() => editProd(row.id)} 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 cursor-pointer" 
                  viewBox="0 0 24 24">
                  <path className="fill-current text-blue-600" d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/>
                </svg>
                <svg onClick={() => deleteProd(row.id)}  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mx-1 cursor-pointer" 
                  viewBox="0 0 24 24">
                  <path className="fill-current text-red-600" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"/>
                </svg>
            </div>
        ),
        right: true
    },
  ];

  
  return (
    <>
    
      <div className="w-full block px-2 bg-white py-2  pl-2">
        <div className="flex flex-wrap justify-between md:mx-4">
          <ImportExportProducts />
        <div className="">
            <li className="list-none">        
              <Link to="/admin/area/product" className="text-purple-600 px-2 py-1 flex">
                Add New Product <i className="fa fa-plus"></i></Link>
            </li>
          </div>
      </div>
        
        
        {products?.length > 0 && (
            <DataTable
                title="Products"
                columns={columns}
                data={products}
                customStyles={customStyles}
                pagination={true}
            />
        )}
      </div>
    </>
  );
};

export default ListProducts;
