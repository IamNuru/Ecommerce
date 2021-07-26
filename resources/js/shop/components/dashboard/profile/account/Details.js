import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/Context";
import DestinationContext from "../../../context/destination/Context";
import FormLoadingCover from "../../../inc/FormLoadingCover";

const Details = () => {
    const {
        user,
        updateUser,
        errors,
        formloading,
        setFormLoading,
        success,
    } = useContext(UserContext);

    const { destinations, getDestinations } = useContext(DestinationContext);

    //iniatilise states
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        image: "",
        phone: "",
        gender: "",
        destination: "",
        gender: "m",
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        getDestinations()
        if (user) {
            setData({
                firstName: user.first_name != null ? user.first_name : "",
                lastName: user.last_name != null ? user.last_name : "",
                email: user.email != null ? user.email : "",
                phone: user.phone != null ? user.phone : "",
                destination: user.destination_id !== null ? user.destination_id : "",
                gender: user.gender !== null ? user.gender : ""
            });
        }
    }, [user]);

    const { firstName, lastName, email, phone, destination, gender } = data;

    //set Edit mode to false after getting a success message
    useEffect(() => {
      if(success){
        setEditMode(false)
      }
    }, [success])

   

    //on input change
    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        setEditMode(true);
    };
    //when gender select button is clicked
    const onGenderSelect = e => {
        setGender(e.target.value);
        setEditMode(true);
    };

    //set the disable of the input to false
    const setInputOfDisable = e => {
        e.target.previousSibling.disabled = false;
        e.target.previousSibling.focus();
    };

    //save changes
    const saveChanges = e => {
        e.preventDefault();
        if (email === "") {
            setErrors("Email Address cannot be empty");
        } else if (gender === "") {
            setErrors("Please select gender");
        } else {
            setFormLoading(true);
            //declare form data
            var formData = new FormData();
            //append fields to form data
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("gender", gender);
            formData.append("destination", destination);
            formData.append("phone", phone);
            updateUser(formData);
        }
    };
    return (
        <>
            {user !== null && (
                <div className="w-full block">
                    {formloading && (
                       <FormLoadingCover />
                    )}
                    <div className="w-full md:w-2/3 lg:w-1/2 m-auto bg-gray-100 mt-1 h-full h-screen pb-32 pl-4">
                        <form onSubmit={saveChanges}>
                            <div className="flex py-2">
                                <div className="w-32 text-gray-600 text-right pr-4">
                                    First Name
                                </div>
                                <div className="block ml-1 capitalize">
                                    <div className="w-full flex justify-between">
                                        <input
                                            type="text"
                                            name="firstName"
                                            onChange={onChange}
                                            value={firstName ? firstName : ""}
                                            disabled={true}
                                            className={`${errors?.firstName &&
                                                "border-red-600 "} border border-gray-400 py-1 px-1 outline-No Destination focus:border-purple-300`}
                                        />
                                        <i
                                            className="cursor-pointer fa fa-pen"
                                            title="edit"
                                            onClick={setInputOfDisable}
                                        >
                                            edit
                                        </i>
                                    </div>
                                    {errors?.firstName && (
                                        <label className="text-xs italic text-red-600 py-1">
                                            {errors.firstName}
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="flex py-2">
                                <div className="w-32 text-gray-600 text-right pr-4">
                                    Last Name
                                </div>
                                <div className="block ml-1 capitalize">
                                    <div className="w-full flex justify-between">
                                        <input
                                            type="text"
                                            name="lastName"
                                            onChange={onChange}
                                            value={lastName ? lastName : ""}
                                            disabled={true}
                                            className={`${errors?.lastName &&
                                                "border-red-600 "} border border-gray-400 py-1 px-1 outline-No Destination focus:border-purple-300`}
                                        />
                                        <i
                                            className="cursor-pointer fa fa-pen"
                                            title="edit"
                                            onClick={setInputOfDisable}
                                        >
                                            edit
                                        </i>
                                    </div>
                                    {errors?.lastName && (
                                        <label className="text-xs italic text-red-600 py-1">
                                            {errors.lastName}
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="flex py-2">
                                <div className="w-32 text-gray-600 text-right pr-4">
                                    Email
                                </div>
                                <div className="ml-1">{email && email}</div>
                            </div>
                            <div className="flex py-2">
                                <div className="w-32 text-gray-600 text-right pr-4">
                                    Phone Number
                                </div>
                                <div className="block ml-1 capitalize">
                                    <div className="w-full flex justify-between">
                                        <input
                                            type="text"
                                            name="phone"
                                            onChange={onChange}
                                            value={phone ? phone : ""}
                                            disabled={true}
                                            className={`${errors?.phone &&
                                                "border-red-600 "} border border-gray-400 py-1 px-1 outline-No Destination focus:border-purple-300`}
                                        />
                                        <i
                                            className="cursor-pointer fa fa-pen"
                                            title="edit"
                                            onClick={setInputOfDisable}
                                        >
                                            edit
                                        </i>
                                    </div>
                                    {errors?.phone && (
                                        <label className="text-xs italic text-red-600 py-1">
                                            {errors.phone}
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="flex py-2">
                                <div className="w-32 text-gray-600 text-right pr-4">
                                    Gender
                                </div>
                                <div className="ml-1">
                                    <span>
                                        {gender === "m" ? "Male" : "Female"}
                                    </span>
                                    <details>
                                        <summary className="text-purple-600 cursor-pointer flex justify-between">
                                            Change
                                        </summary>
                                        <select
                                            value={gender ? gender : "m"}
                                            name="gender"
                                            onChange={onChange}
                                            className="border border-gray-400 w-full py-1 px-1 outline focus:border-purple-300"
                                        >
                                            <option value="m">Male</option>
                                            <option value="f">Female</option>
                                        </select>
                                    </details>
                                </div>
                            </div>
                            <div className="flex py-2">
                                <div className="w-32 text-gray-600 text-right pr-4">
                                    Destination
                                </div>
                                <div className="ml-1">
                                    <select
                                        value={
                                            destination
                                                ? destination
                                                : "No Destination"
                                        }
                                        onChange={onChange}
                                        name="destination"
                                        className="border border-gray-400 w-full py-1 px-1 outline-No Destination focus:border-purple-300"
                                    >
                                        <option value="No Destination">
                                            Select Destination
                                        </option>
                                        {destinations?.length > 0 ? (
                                            destinations.map((des, index) => {
                                                return (
                                                    <option
                                                        value={des.id}
                                                        key={index}
                                                        index={index}
                                                    >
                                                        {des.name}
                                                    </option>
                                                );
                                            })
                                        ) : (
                                            <option value="No Destination">
                                                No destination
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            {success && !editMode &&(
                                <div className="w-full text-green-600 my-1 text-md text-center">
                                    {success}
                                </div>
                            )}
                            {errors !== null &&(
                                <div className="w-full text-red-600 my-1 text-xs text-center">
                                    Your changes contain errors, Please check changes again
                                </div>
                            )}
                            {editMode && (
                                <div className="w-full text-right">
                                    <button
                                        type="submit"
                                        className="px-8 py-2 bg-purple-600 text-white font-semibold text-md"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Details;
