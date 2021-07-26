import React, { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link , useHistory} from "react-router-dom";


import DestinationContext from "../../../context/destination/Context";


const ListDestinations = () => {
  // destructure values from context
  const {success, destinations,deleteDestination, getDestinations, getDestination, destination } = useContext(DestinationContext);

  const history = useHistory();

  const editDestination = (id) => {
    getDestination(id);
    history.push("/admin/area/destination");
  };
  const deleteDes = (id) => {
    if (window.confirm("Are you sure you want to Delete")) {
      deleteDestination(id);
      getDestinations();
    }
  };

  useEffect(() => {
      getDestinations();

    // eslint-disable-next-line
  }, []);


  //data table variables
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
  const columns = [
    {
        name: "Name",
        selector: row => row["name"],
        sortable: true
    },
    {
        name: "Station",
        selector: row => row["station"],
        sortable: true
    },
    {
        name: "Phone",
        selector: row => row["phone"],
        sortable: true
    },
    {
        name: "Days",
        selector: row => row["number_of_days"],
        sortable: true
    },
    {
        name: "Charge",
        selector: row => row["amount"],
        sortable: true
    },
    {
      name: "",
      cell: row => (
          <div className="flex">
              <i
                  onClick={() => editDestination(row.id)}
                  className="fa fa-edit text-md font-semibold text-blue-600 px-1 text-md cursor-pointer"
              >
              </i>
              <i
                  onClick={() => deleteDes(row.id)}
                  className="fa fa-trash text-md font-semibold text-red-600 px-1 text-md cursor-pointer mx-1"
              ></i>
          </div>
      ),
      right: true
    },
  ]

  return (
    <div>
    <div className="w-screen flex px-2 bg-white py-2 -ml-4 pl-2 -mt-1">
        <li className="list-none">
          <Link to="/admin/area/destination" className="text-purple-600 px-2 py-1">Add New Destination <i className="fa fa-plus"></i></Link>
        </li>
      </div>
    <div className="m-auto px-4 block">
      
    {destinations?.length > 0 && (
            <DataTable
                title="Products"
                columns={columns}
                data={destinations}
                customStyles={customStyles}
                pagination={true}
            />
        )}
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
