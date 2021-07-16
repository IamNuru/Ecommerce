import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/auth/Context";

const ResetPassword = (props) => {
  //get email passed from url
  const query = new URLSearchParams(props.location.search);

  //destruture functions and variables from auth state
  const {
    resetPassword,
    success,
    logedin,
    errors,
    setError,
    clearMessages,
    setLoading,
  } = useContext(AuthContext);

  // set states
  const [credentials, setCredentials] = useState({
    email: props && query.get("email"),
    token: props && props.match.params.token,
    password: "",
    password_confirmation: "",
  });

  //when component mounts or update
  useEffect(() => {
    setError("");
    if (logedin) {
      props.history.push("/");
    }
    return () => {
      clearMessages();
    };
    // eslint-disable-next-line
  }, [logedin]);

  //redirect to login page if successfully reset password
  useEffect(() => {
    if(success === "Your password has been reset!"){
      props.history.push('/login')
    }

    // eslint-disable-next-line
  }, [success])

  //destructure state objects
  const { email, token, password, password_confirmation } = credentials;

  //on change of inputs
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // rest user password function on submit
  const resetUserPassword = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || token === "" || password === "") {
      setError("Fill in your credentials");
      return false;
    } else if (password !== password_confirmation) {
      setError(`Password mismatched`);
    } else {
      resetPassword(credentials);
    }
  };

  return (
    <div className="p-1 block bg-gray-100 min-h-96 w-full">
      <form
        onSubmit={resetUserPassword}
        className="block rounded-md mt-2 h-full px-4 pt-4 pb-8 w-full m-auto md:mt-24 bg-gray-300 md:w-96"
      >
        <h2 className="w-full text-center mt-1 mb-2 font-bold text-2xl">
          Reset Password
        </h2>
        <input
          type="text"
          name="token"
          value={token}
          onChange={onChange}
          autoComplete="off"
          className="hidden"
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          autoComplete="off"
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
        {errors !== null && (
          <p className="text-center text-red-600 text-sm py-2 italic">
            {errors}
          </p>
        )}
        {success !== null && (
          <p className="text-center text-purple-600 text-sm py-2 italic">
            {success}
          </p>
        )}
        <button
          type="submit"
          className="py-1
           mt-4 w-full rounded-full border-1 bg-purple-600
           text-white font-bold text-xl md:w-48 m-auto text-center outline-none"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
