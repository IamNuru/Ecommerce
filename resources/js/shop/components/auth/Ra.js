import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/Context";
import registerImg from "../../images/register.jpg";
import { validateEmail } from "./ValidationComponent";

const RegisterPage = (props) => {
  const authContext = useContext(AuthContext);
  const {register, logedin, errors, setError } = authContext;
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
		<div className="container mx-auto font-mono">
			<div className="flex justify-center px-6 my-12">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
						style={{backgroundImage: `url(${registerImg})`}}
					></div>
					<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
						<form onSubmit={registerUser} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700" >
										First Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="firstName"
										value={firstName}
										onChange={onChange}
										type="text"
										placeholder="First Name"
										autoComplete="none"
									/>
								</div>
								<div className="md:ml-2">
									<label className="block mb-2 text-sm font-bold text-gray-700">
										Last Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										type="text"
										name="lastName"
										value={lastName}
										onChange={onChange}
										placeholder="Last Name"
										autoComplete="none"
									/>
								</div>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700">
									Email
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									type="email"
									name="email"
									value={email}
									onChange={onChange}
									autoComplete="off"
									placeholder="Email"
									onMouseLeave={emailMouseLeave}
									autoComplete="none"
								/>
								{ emailValid === false &&
								<p className="text-xs italic text-red-500">Please enter a valid Email Address</p>
								}
							</div>
							<div className="mb-4 flex">
								<label className="block mb-2 text-sm font-bold text-gray-700">
									Gender
								</label>
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
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700">
										Password
									</label>
									<input
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										type="password"
										name="password"
										value={password}
										onChange={onChange}
										placeholder="password"
									/>
									
								</div>
								<div className="md:ml-2">
									<label className="block mb-2 text-sm font-bold text-gray-700">
										Confirm Password
									</label>
									<input
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										type="password"
										name="password_confirmation"
										value={password_confirmation}
										onChange={onChange}
										placeholder="confirm password"
									/>
								</div>
							</div>
							{
								errors !== null && 
								<p className="text-center text-red-600 text-sm py-2 italic">
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
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<Link
									className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-800"
									to="forgotpassword"
								>
									Forgot Password?
								</Link>
							</div>
							<div className="text-center">
								<div
									className="inline-block text-sm text-gray-500 align-baseline"
								>
									Already have an account?&nbsp;<Link to="/login" className="text-blue-600">Login</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
    )
}

export default RegisterPage
