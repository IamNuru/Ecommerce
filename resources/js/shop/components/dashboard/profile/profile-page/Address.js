import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/Context";
import FormLoadingCover from "../../../inc/FormLoadingCover";


const Address = () => {
    const {
        user,
        updateUserAddress,
        errors,
        formloading,
        setFormLoading,
    } = useContext(UserContext);
    //iniatilise states
    const [data, setData] = useState({
        country: "",
        state: "",
        city: "",
        box: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if (user) {
            setData({
                country: user.address && user.address.country != null ? user.address.country : "",
                state: user.address && user.address.state != null ? user.address.state : "",
                city: user.address && user.address.city != null ? user.address.city : "",
                box: user.address && user.address.box != null ? user.address.box : "",
            });
        }
    }, [user]);

    const { country, state, city, box } = data;

    //set Edit mode to false after getting a success message
    useEffect(() => {
      if(!formloading){
        setEditMode(false)
        setFormError(null)
      }
    }, [formloading])

   

    //on input change
    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        setEditMode(true);
        setFormError(null)
    };

    //set the disable of the input to false
    const setInputOfDisable = e => {
        e.target.previousSibling.disabled = false;
        e.target.previousSibling.focus();
    };

    //save changes
    const saveChanges = e => {
        e.preventDefault();
        if (country === "" || state ==="" || city ==="" || box === "") {
            setFormError("All fields are required");
            
        } else {
            setFormError(null)
            setFormLoading(true);
            //declare form data
            var formData = new FormData();
            //append fields to form data
            formData.append("country", country);
            formData.append("state", state);
            formData.append("city", city);
            formData.append("box", box);
            updateUserAddress(formData);
        }
    };



    return (
        <form onSubmit={saveChanges}>
            {
                formloading && <FormLoadingCover />
            }
        <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                    <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                        />
                    </svg>
                </span>
                <span className="tracking-wide">Address</span>
            </div>
            <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}} >
                        <div className="whitespace-nowrap px-1 py-3 font-semibold">
                            First Name
                        </div>
                        <div className="flex py-2">
                            <input
                                type="text"
                                name="country"
                                onChange={onChange}
                                value={country ? country : ""}
                                disabled={true}
                                autoComplete="none"
                                className={`${errors?.country &&
                                    "border-red-600 "} py-1 border border-gray-100 px-1 outline-nonene focus:border-purple-300`}
                            />
                            <i title="edit" onClick={setInputOfDisable} 
                                className="fa fa-edit text-blue-400 -mt-1 ml-1 cursor-pointer"></i>
                        </div>
                    </div>
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}}>
                        <div className="whitespace-nowrap px-1 py-3 font-semibold">Last Name</div>
                        <div className="flex py-2">
                            <input
                                type="text"
                                name="state"
                                onChange={onChange}
                                value={state ? state : ""}
                                disabled={true}
                                autoComplete="none"
                                className={`${errors?.state &&
                                    "border-red-600 "} border border-gray-100 py-1 px-1 outline-none focus:border-purple-300`}
                            />
                            <i title="edit" onClick={setInputOfDisable} 
                                className="fa fa-edit text-blue-400 -mt-1 ml-1 cursor-pointer"></i>
                            
                                
                        </div>
                    </div>
                    
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}}>
                        <div className="whitespace-nowrap px-1 py-3 font-semibold">
                            Contact No.
                        </div>
                        <div className="flex py-2">
                            <input
                                type="text"
                                name="city"
                                onChange={onChange}
                                value={city ? city : ""}
                                disabled={true}
                                autoComplete="none"
                                className={`${errors?.city &&
                                    "border-red-600 "} border border-gray-100 py-1 px-1 outline-none focus:border-purple-300`}
                            />
                            <i title="edit" onClick={setInputOfDisable} 
                                className="fa fa-edit text-blue-400 -mt-1 ml-1 cursor-pointer"></i>
                        </div>
                    </div>
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}}>
                        <div className="whitespace-nowrap px-1 py-3 font-semibold">
                            Contact No.
                        </div>
                        <div className="flex py-2">
                            <input
                                type="text"
                                name="box"
                                onChange={onChange}
                                value={box ? box : ""}
                                disabled={true}
                                autoComplete="none"
                                className={`${errors?.box &&
                                    "border-red-600 "} border border-gray-100 py-1 px-1 outline-none focus:border-purple-300`}
                            />
                            <i title="edit" onClick={setInputOfDisable} 
                                className="fa fa-edit text-blue-400 -mt-1 ml-1 cursor-pointer"></i>
                        </div>
                    </div>
                </div>
            </div>
            {errors !== null &&(
                <div className="w-full text-red-600 my-1 text-xs text-center">
                    Your changes contain errors, Please check changes again
                </div>
            )}
            {formError !== null &&(
                <div className="w-full text-red-600 my-1 text-xs text-center">
                    {formError}
                </div>
            )}
            {editMode && (
                <button type="submit" className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-nonene focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                    Save Changes
                </button>
            )}
            
        </div>
        </form>
    );
};

export default Address;
