import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/Context";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const {register, logedin, errors, setError } = authContext;
  // set state
  const [stayLogedIn, setStayLogedIn] = useState(logedin);
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender:"m",
  });

  useEffect(() => {
    setError('');
    if (logedin) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [logedin]);

  //destructure state objects
  const { fullName, email, password, password_confirmation } = credentials;
  //on change of inputs
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // toggle stay logged in
  const changeStayLogedInStatus = () => {
    setStayLogedIn(!stayLogedIn);
  };

  // register new user
  const registerUser = (e) => {
    e.preventDefault();
    setError('');
    if (email === "" || password === "") {
      setError("Fill in your credentials");
      return false;
    } else if (password !== password_confirmation) {
      setError(`Password mismatched`);
    } else {
      //setLogin(credentials)
      register(credentials);
    }
  };

  return (
    <div className="p-1 block bg-gray-100 min-h-96 w-full">
      <form
        onSubmit={registerUser}
        className="block rounded-md mt-2 h-full px-4 pt-4 pb-8 w-full m-auto md:mt-24 bg-gray-300 md:w-96"
      >
        <h2 className="w-full text-center mt-1 mb-2 font-bold text-2xl">
          Register
        </h2>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={onChange}
          placeholder="Full Name"
          autoComplete="off"
          className="pl-2 py-2 mt-2 w-full rounded-full border-1 outline-none"
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          autoComplete="off"
          placeholder="Your Email Address"
          className="pl-2 py-2 mt-2 w-full rounded-full border-1 outline-none"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          className="pl-2 py-2 mt-2 w-full rounded-full border-1 outline-none"
        />
        <input
          type="password"
          name="password_confirmation"
          value={password_confirmation}
          onChange={onChange}
          placeholder="Confirm password"
          className="pl-2 py-2 mt-2 w-full rounded-full border-1 outline-none"
        />
        <div className="ml-2 flex mt-2 mb-2 px-4">
          <div className="flex px-4">
            <input
              type="radio"
              name="gender"
              value="m"
              onChange={onChange}
              className="mt-1 border-1 outline-none"
            />
            <label htmlFor="male" className="px-2">
              Male
            </label>
          </div>
          <div className="flex px-4">
            <input
              type="radio"
              name="gender"
              value="f"
              onChange={onChange}
              className="mt-1 border-1 outline-none"
            />
            <label htmlFor="female" className="px-2">
              Female
            </label>
          </div>
        </div>
        <div className="ml-2 flex mt-2 mb-2">
          <input
            type="checkbox"
            name="checkbox"
            value={stayLogedIn}
            onChange={changeStayLogedInStatus}
            className="pl-2 w-4 rounded-full border-1 outline-none"
          />
          <label className="text-sm pl-2"> Select to stay logged in</label>
        </div>
        {
          errors !== null && <p className="text-center text-red-600 text-sm py-2 italic">
            {
              errors
            }
            </p>
        }
        <p className="text-right py-2 text-purple-700">
          <Link to="/forgotpassword">Forgot Password ?</Link>
        </p>
        <button
          type="submit"
          className="py-1
           mt-4 w-full rounded-full border-1 bg-purple-600
           text-white font-bold text-xl md:w-48 m-auto text-center outline-none"
        >
          Submit
        </button>
        <p className="mt-8 text-center">
          Already registerd?, please{" "}
          <Link to="/login" className="text-purple-800 px-1">
            login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
