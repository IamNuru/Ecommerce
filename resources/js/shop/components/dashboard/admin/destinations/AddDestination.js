import React, { useContext, useState, useEffect } from "react";
import DestinationContext from "../../../context/destination/Context";
import FormLoadingCover from "../../../inc/FormLoadingCover";
import { Link } from "react-router-dom";

const AddDestination = () => {
    // destructure product context
    const {
        addDestination,
        errors,
        success,
        destination,
        updateDestination,
        formloading,
        setFormLoading,
        clearMessages,
    } = useContext(DestinationContext);

    // declare state
    const [data, setData] = useState({
        destinationName: "",
        station: "",
        phone: "",
        charge: "",
        number_of_days: ""
    });
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        clearMessages();
        setFormLoading(false);
        if (destination) {
            setData({
                destinationName: destination.name,
                station: destination.station,
                charge: destination.amount,
                number_of_days: destination.number_of_days,
                phone: destination.phone
            });
            setUpdate(true);
        }

        // eslint-disable-next-line
    }, [destination]);

    // destructure data state
    const { destinationName, station, phone, number_of_days, charge } = data;

    // on input changes
    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    //clear form on success
    if (success) {
        setTimeout(() => {
            setData({
                destinationName: "",
                station: "",
                phone: "",
                charge: "",
                number_of_days: ""
            });
        }, 500);
    }
    //clear inputs when you get success message
    useEffect(() => {
        setTimeout(() => {
            clearMessages();
        }, 5000);

        // eslint-disable-next-line
    }, [success]);

    const clearForm = () =>{
        clearMessages()
        setData({
            destinationName: "",
            station: "",
            phone: "",
            charge: "",
            number_of_days: ""
        });
        setUpdate(false)
    }

    //on submit of form
    const onSubmit = e => {
        e.preventDefault();
        setFormLoading(true);
        clearMessages();
        if (update) {
            updateDestination(destination.id, data);
        } else {
            addDestination(data);
        }
    };
    return (
        <>
        <div className="w-screen flex px-2 bg-white py-2 -ml-4 pl-2 -mt-1">
        <li className="list-none">
          <Link to="/admin/area/destinations" className="text-purple-600 px-2 py-1">Destinations</Link>
        </li>
      </div>
        <form
            onSubmit={onSubmit}
            className="px-4"
            title={`${formloading ? "processing":''}`}
        >
            {
                formloading && <FormLoadingCover />
            }
            <div className="w-full block grid grid-col-1 md:grid-cols-2 gap-4">
                <div className="w-full block">
                    <label className="py-1 text-md text-gray-800">Name</label>
                    <input
                        type="text"
                        name="destinationName"
                        onChange={onChange}
                        value={destinationName}
                        required
                        className={`${errors?.destinationName &&
                            "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
                    />
                    {errors?.destinationName && (
                        <label className="py-1 text-sm italic text-red-600">
                            {errors.destinationName}
                        </label>
                    )}
                </div>
                <div className="w-full block">
                    <label className="py-1 text-md text-gray-800">
                        Station
                    </label>
                    <input
                        type="text"
                        name="station"
                        onChange={onChange}
                        value={station}
                        required
                        className={`${errors?.station &&
                            "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
                    />
                    {errors?.station && (
                        <label className="py-1 text-sm italic text-red-600">
                            {errors.station}
                        </label>
                    )}
                </div>
                <div className="w-full block">
                    <label className="py-1 text-md text-gray-800">phone</label>
                    <input
                        type="number"
                        name="phone"
                        onChange={onChange}
                        value={phone}
                        required
                        className={`${errors?.phone &&
                            "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
                    />
                    {errors?.phone && (
                        <label className="py-1 text-sm italic text-red-600">
                            {errors.phone}
                        </label>
                    )}
                </div>
                <div className="w-full block md:flex">
                    <div className="block md:px-2">
                        <label className="py-1 text-md text-gray-800">
                            Charge
                        </label>
                        <input
                            type="number"
                            name="charge"
                            onChange={onChange}
                            value={charge}
                            required
                            className={`${errors?.charge &&
                                "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
                        />
                        {errors?.charge && (
                            <label className="py-1 text-sm italic text-red-600">
                                {errors.charge}
                            </label>
                        )}
                    </div>
                    <div className="block md:px-2">
                        <label className="py-1 text-md text-gray-800">
                            Days to Arrive
                        </label>
                        <input
                            type="number"
                            name="number_of_days"
                            onChange={onChange}
                            value={number_of_days}
                            required
                            className={`${errors?.number_of_days &&
                                "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
                        />
                        {errors?.number_of_days && (
                            <label className="py-1 text-sm italic text-red-600">
                                {errors.number_of_days}
                            </label>
                        )}
                    </div>
                </div>
            </div>
            {success && (
                <div className="py-4 text-blue-800 text-md italic text-center">
                    {success}
                </div>
            )}
            <div className="btn flex float-right">
                <button
                    disabled={formloading}
                    type="submit"
                    className={`${
                        formloading ? "bg-gray-300" : "bg-purple-600"
                    } mb-8 mx-2 py-1 mt-2 px-4 border-1 text-white font-semibold text-md text-center outline-none capitalize`}
                >
                    {update ? "Update" : "Save"}
                </button>
                <button
                    type="button"
                    onClick={clearForm}
                    className={`${!update &&
                        "hidden"} mb-8 py-1 mt-2 px-4 border-1 bg-pink-600 text-white text-md text-center outline-none capitalize`}
                >
                    New
                </button>
            </div>
        </form>
        </>
    );
};

export default AddDestination;
