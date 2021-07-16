import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/Context";

const ForgotPassword = (props) => {
  const authContext = useContext(AuthContext);
  const {
    clearMessages,
    logedin,
    sendPasswordResetLink,
    errors,
    setError,
    success,
    loading,
  } = authContext;
  // set state
  const [credentials, setCredentials] = useState({
    email: "",
  });

  useEffect(() => {
    if (logedin) {
      props.history.push("/");
    }
    return () => {
      clearMessages();
    };
    // eslint-disable-next-line
  }, [logedin]);

  //destructure state objects
  const { email } = credentials;
  //on change of inputs
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    clearMessages();
  };

  // Change Password
  const changePassword = (e) => {
    e.preventDefault();

    clearMessages()
    if (email === "") {
      setError("Fill in all fields");
      return false;
    } else {
      //setLogin(credentials)
      sendPasswordResetLink(credentials);
    }
  };

  return (
    <div className="p-1 block bg-gray-100 min-h-96 w-full">
      <form
        onSubmit={changePassword}
        className="block rounded-md mt-2 h-full px-4 pt-4 pb-8 w-full m-auto bg-gray-300 md:w-96"
      >
        <h2 className="w-full text-center mt-1 mb-2 font-bold text-2xl">
          Reset Password
        </h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          autoComplete="off"
          placeholder="Enter email"
          className="pl-2 py-2 mt-2 w-full rounded-full border-1 outline-none"
        />
        {errors !== null && (
          <p className="mt-2 text-red-600 text-sm italic">{errors}</p>
        )}
        {success !== null && (
          <p className="text-center text-green-600 text-sm py-2 italic">
            {success}
          </p>
        )}
        <div className="w-full text-right">
          <button
          disabled={loading}
            type="submit"
            className={`${loading && 'opacity-50 cursor-not-allowed'} flex py-1 justify-center mt-2 mb-4 w-full rounded-md border-1 bg-purple-600 text-white font-bold text-xl md:w-48 m-auto text-center outline-none`}
          >
            Submit
          </button>
        </div>

        <div className="flex justify-between">
          <div className="transition duration-500 bg-white bg-white text-purple-600 text-center hover:underline">
            <Link to="/login" className="px-8 py-4">login</Link>
          </div>
          <div className="transition duration-500 bg-white bg-white text-purple-600 text-center hover:underline">
            <Link to="/register" className="px-8 py-4">register</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
