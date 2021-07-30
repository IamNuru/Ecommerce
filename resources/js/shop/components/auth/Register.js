import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/Context";
import UserContext from "../context/user/Context";
import SwitchLoginRegisterPages from "./SwitchLoginRegisterPages";
import { validateEmail } from "./ValidationComponent";

const Register = (props) => {

const authContext = useContext(AuthContext);
  const {register, logedin, errors, setError } = authContext;
  const { refreshUser } = useContext(UserContext);
  ;
  // set state
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender:"m",
  });
  const [emailValid, setEmailValid] = useState(null)


  useEffect(() => {
    setError('');
    if (logedin) {
      props.history.push("/");
      refreshUser()
    }
    
    // eslint-disable-next-line
  }, [logedin]);

  //destructure state objects
  const { firstName, lastName, email, password, password_confirmation, gender } = credentials;
  //on change of inputs
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const emailMouseLeave = e =>{
	if(validateEmail(email)){
        setEmailValid(true)
    }else{
        setEmailValid(false)
    }
  }

  // register new user
  const registerUser = (e) => {
    e.preventDefault();
    setError('');
    if (firstName === '' || lastName === '' || email === "" || password === "") {
      setError("Fill in your credentials");
      return false;
    }
	else if(firstName.length < 3 || lastName.length < 3){
		setError("Name must be greater than or equal to 3");
      	return false;
	} else if(emailValid === false) {
		setError("Invalid Email address");
	}
    else if (gender === "") {
      setError("Select Gender");
      return false;
    } else if (password !== password_confirmation) {
      setError(`Password mismatched`);
    } else {
      //setLogin(credentials)
      register(credentials);
    }
  };


    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <SwitchLoginRegisterPages />
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <h1 className="mb-4 text-3xl text-center">Sign up</h1>
                <form onSubmit={registerUser} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <input
                        name="firstName"
                        value={firstName}
                        onChange={onChange}
                        type="text"
                        placeholder="First Name"
                        autoComplete="none"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                    />

                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={onChange}
                        placeholder="Last Name"
                        autoComplete="none"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                    />

                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        autoComplete="off"
                        placeholder="Email"
                        onMouseLeave={emailMouseLeave}
                        autoComplete="none"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                    />
                    <div className="flex">
                        <div className="flex px-4">
                            <label className="cursor-pointer flex">
                                <input
                                type="radio"
                                name="gender"
                                value="m"
                                checked = {gender === "m"}
                                onChange={onChange}
                                className="mt-1 border-1 outline-none"
                                />
                            Male
                            </label>
                        </div>
                        <div className="flex px-4">
                            <label className="cursor-pointer flex">
                                <input
                                type="radio"
                                name="gender"
                                value="f"
                                checked = {gender === "f"}
                                onChange={onChange}
                                className="mt-1 border-1 outline-none"
                                />
                            Female
                            </label>
                        </div>
                    </div>

                    <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    />
                    <input
                        type="password"
                        name="password_confirmation"
                        value={password_confirmation}
                        onChange={onChange}
                        placeholder="confirm password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                    />
                    {
                        errors !== null && 
                        <p className="text-center text-red-600 text-sm py-2 my-2 italic">
                            {
                            errors
                            }
                        </p>
                    }
                    <div className="mb-6 text-center">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register Account
                        </button>
                    </div>
                    <div className="text-center">
                        <Link
                            className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-800"
                            to="forgotpassword"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
                
                
            </div>
            
        </div>
    );
};

export default Register;
