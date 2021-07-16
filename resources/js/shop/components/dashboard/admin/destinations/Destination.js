import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import DestinationContext from "../../../context/destination/Context";

const Destination = (props) => {
  const { deleteDestination, getDestinations, getDestination } = useContext(
    DestinationContext
  );

  const { destination } = props;
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

  return destination === null ? (
    "Loading"
  ) : (
    <tr className="border-2 border-l-4 border-r-4 border-white bg-gray-400">
      <td className="pl-2 pt-2 pb-2 md:table-cell">
        {destination.name}
      </td>
      <td className="pt-2 pb-2 text-center">{destination.station}</td>
      <td className="pt-2 pb-2 text-center">{destination.phone}</td>
      <td className="pt-2 pb-2 text-center">{destination.number_of_days}</td>
      <td className="pt-2 pb-2 text-center">{destination.amount}</td>
      <td className="flex pt-2 pb-2 text-right">
        <i
          onClick={() => editDestination(destination.id)}
          className="fa fa-edit text-md font-semibold text-blue-600 px-1 text-md cursor-pointer"
        >E</i>
        <i
          onClick={() => deleteDes(destination.id)}
          className="fa fa-trash text-md font-semibold text-red-600 px-1 text-md cursor-pointer mx-1"
        >D</i>
      </td>
    </tr>
  );
};

export default Destination;
