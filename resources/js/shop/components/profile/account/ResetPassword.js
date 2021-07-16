import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/Context";

const ResetPassword = (props) => {
  const authContext = useContext(AuthContext);
  const { clearMessages, logedin, updatePassword, errors, setError, success } = authContext;
  // set state
  const [credentials, setCredentials] = useState({
    password: "",
    newpassword: "",
    newpassword_confirmation: "",
  });

  useEffect(() => {
    if (!logedin) {
      props.history.push("/login");
    }
    return () => {
      clearMessages()
    }
    // eslint-disable-next-line
  }, [logedin]);

  //destructure state objects
  const { password, newpassword, newpassword_confirmation } = credentials;
  //on change of inputs
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    clearMessages();
  };

  // Change Password
  const changePassword = (e) => {
    e.preventDefault();

    if (
      password === "" ||
      newpassword === "" ||
      newpassword_confirmation === ""
    ) {
      setError("Fill in all fields");
      return false;
    } else {
      //setLogin(credentials)
      updatePassword(credentials);
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
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          autoComplete="off"
          placeholder="Enter existing password"
          className="pl-2 py-2 mt-2 w-full rounded-full border-1 outline-none"
        />
        <input
          type="password"
          name="newpassword"
          value={newpassword}
          onChange={onChange}
          placeholder="Enter New Password"
          className="pl-2 py-2 mt-2 w-full rounded-full border-1 outline-none"
          autoComplete="off"
        />
        <input
          type="password"
          name="newpassword_confirmation"
          value={newpassword_confirmation}
          placeholder={"confirm new password"}
          onChange={onChange}
          className="pl-2 py-2 mt-2 w-full rounded-full border-1 outline-none"
        />
        {errors !== null
          ? errors.length > 0 && (
              <p className="text-center text-red-600 text-sm py-2 italic">
                {errors}
              </p>
            )
          : ""}
        {success !== null && (
          <p className="text-center text-green-600 text-sm py-2 italic">
            {success}
          </p>
        )}
        <p className="text-right py-2 text-purple-700">
          <Link to="/forgotpassword">Forgot Password ?</Link>
        </p>
        <button
          type="submit"
          className="py-1
           mt-4 w-full rounded-full border-1 bg-purple-600
           text-white font-bold text-xl md:w-48 m-auto text-center outline-none"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
