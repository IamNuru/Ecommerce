import React, { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../../context/user/Context";
import DestinationContext from "../../../context/destination/Context";
import FormLoadingCover from "../../../inc/FormLoadingCover";
import { validatePhoneNumber } from "../../../auth/ValidationComponent"

const About = () => {
    const {
        user,
        updateUser,
        errors,
        formloading,
        setFormLoading,
        success,
        setError
    } = useContext(UserContext);

    const { destinations, getDestinations } = useContext(DestinationContext);
    const userImage = useRef(null)
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
    const [userImageName, setUserImageName] = useState(null)
    const [editMode, setEditMode] = useState(false);
    const [err, setErr] = useState()


    useEffect(() => {
        getDestinations()
        if (user) {
            setData({
                firstName: user.first_name != null ? user.first_name : "",
                lastName: user.last_name != null ? user.last_name : "",
                email: user.email != null ? user.email : "",
                phone: user.phone != null ? user.phone : "",
                destination: user.destination_id !== null ? user.destination_id : "",
                gender: user.gender !== null ? user.gender : "",
            });
            setUserImageName(null)
        }
    }, [user]);

    const { firstName, lastName, email, phone, destination, gender } = data;

    //set Edit mode to false after getting a success message
    useEffect(() => {
      if(!formloading){
        setEditMode(false)
      }
    }, [formloading])

   const phoneMouseLeave = () =>{
       if(validatePhoneNumber(phone)){
           setErr(null)
       }else{
        setErr('Invalid Phone Number')
       }
   }

    //on input change
    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        setEditMode(true);
        setErr(null)
    };
    

    //set the disable of the input to false
    const setInputOfDisable = e => {
        e.target.previousSibling.disabled = false;
        e.target.previousSibling.focus();
    };

    const handleChooseFile = e =>{
        setUserImageName(userImage.current.files[0].name)
        setEditMode(true)
      }

    //save changes
    const saveChanges = e => {
        e.preventDefault();
        setErr(null)
        setError(null)
        if (email === "" || firstName ==='' || lastName==="") {
            setErr("Email, Phone and Name Fields are required");
        } else if (gender === "") {
            setErr("Please select gender");
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
            formData.append("image_name", userImage.current.files[0]);
            updateUser(formData);
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </span>
                <span className="tracking-wide">About</span>
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
                                name="firstName"
                                onChange={onChange}
                                value={firstName ? firstName : ""}
                                disabled={true}
                                autoComplete="none"
                                className={`${errors?.firstName &&
                                    "border-red-600 "} py-1 border border-gray-100 px-1 outline-none focus:border-purple-300`}
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
                                name="lastName"
                                onChange={onChange}
                                value={lastName ? lastName : ""}
                                disabled={true}
                                autoComplete="none"
                                className={`${errors?.lastName &&
                                    "border-red-600 "} border border-gray-100 py-1 px-1 outline-No Destination focus:border-purple-300`}
                            />
                            <i title="edit" onClick={setInputOfDisable} 
                                className="fa fa-edit text-blue-400 -mt-1 ml-1 cursor-pointer"></i>
                            
                                
                        </div>
                    </div>
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}}>
                        <div className="whitespace-nowrap px-1 py-3 font-semibold">Gender</div>
                        <div className="px-4 py-2">
                        <div className="ml-1">
                            <select
                                    value={gender ? gender : "m"}
                                    name="gender"
                                    onChange={onChange}
                                    className="border border-gray-100 w-full py-1 px-1 outline focus:border-purple-300"
                                >
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                        </div>
                        </div>
                    </div>
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}}>
                        <div className="whitespace-nowrap px-1 py-3 font-semibold">
                            Contact No.
                        </div>
                        <div className="flex py-2">
                            <input
                                type="text"
                                name="phone"
                                onChange={onChange}
                                value={phone ? phone : ""}
                                disabled={true}
                                autoComplete="none"
                                className={`${errors?.phone &&
                                    "border-red-600 "} border border-gray-100 py-1 px-1 outline-No Destination focus:border-purple-300`}
                                onMouseLeave={phoneMouseLeave}
                            />
                            <i title="edit" onClick={setInputOfDisable} 
                                className="fa fa-edit text-blue-400 -mt-1 ml-1 cursor-pointer"></i>
                        </div>
                    </div>
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}}>
                        <div className="whitespace-nowrap px-1 py-3 font-semibold">
                            Current Destination
                        </div>
                        <div className="ml-1">
                            <select
                                value={destination ? destination: "No Destination"}
                                onChange={onChange}
                                name="destination"
                                className="border border-gray-100 w-full py-1 px-1 outline-No Destination focus:border-purple-300"
                            >
                                <option value="No Destination"> Select Destination </option>
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
                                    <option value="No Destination"> No destination </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}}>
                        <div className="whitespace-nowrap px-1 py-3 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                            <a
                                className="text-blue-800"
                                href="mailto:jane@example.com"
                            >
                                {user && user.email
                                    ? user.email
                                    : "Not provided"}
                            </a>
                        </div>
                    </div>
                    <div className="grid" style={{gridTemplateColumns: "auto 1fr"}}>
                    <div className="relative mx-1">
                        <div className="cursor-pointer w-24 bg-indigo-600 hover:bg-indigo-dark text-white font-bold py-2 px-4 w-full inline-flex items-center">
                            <svg className="h-4 w-4" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                <path className="fill-current text-white bg-white" d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"/>
                            </svg>
                            <span className="ml-2">Upload Image</span>
                        </div>
                        <input onChange={handleChooseFile} ref={userImage} className="-mt-1 w-full z-30 py-2 cursor-pointer top-0 absolute block opacity-0 w-24 pin-r pin-t" type="file" name="userImage" />
                        </div>
                        {
                            userImageName && userImageName !== '' && <div className="flex">
                            <div className="py-1">{userImageName}&nbsp; 
                            <span onClick={() => setUserImageName(null)}
                                className="text-pink-600 text-xs font-semibold cursor-pointer">remove</span>
                            </div>
                         </div>
                        }
                    </div>
                    
                </div>
            </div>
            {success && !editMode &&(
                <div className="w-full text-green-600 my-1 text-md text-center">{success}</div>
            )}
            {errors !== null &&(
                <div className="w-full text-red-600 my-1 text-xs text-center">
                    {errors}
                </div>
            )}
            {err !== null && err !=='' &&(
                <div className="w-full text-red-600 my-1 text-xs text-center">
                    {err}
                </div>
            )}
            {editMode && (
                <button type="submit" className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-2">
                    Save Changes
                </button>
            )}
            
        </div>
        </form>
    );
};

export default About;
