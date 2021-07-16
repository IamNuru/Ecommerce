import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/Context";

const LoginPage = (props) => {
  const authContext = useContext(AuthContext);
  const { login, errors, logedin, setError } = authContext;

  
  // set state
  const [stayLogedIn, setStayLogedIn] = useState(logedin)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    setError('');
    if(logedin){
      props.history.push('/')
    }

    // eslint-disable-next-line
  }, [logedin])


  //destructure state objects
  const { email, password } = credentials;


  //on change of inputs
  const onChange = (e) =>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  // toggle stay logged in 
  const changeStayLogedInStatus = () =>{
    setStayLogedIn(!stayLogedIn)
  }


  // log in the user
  const loginUser = (e) => {
    e.preventDefault();
    setError('');
    //const auth = users.some(u => (u.email === email && u.password === password));
    if (email === "" || password === "") {
      setError('Fill in your credentials');
      return false;
    }
    /* else if (!auth) {
      setErrorMsg("Invalid credentials");
      return false;
    }
    else if (auth) {
      const u = users.find(u => (u.email === email && u.password === password));
      login(u);
      var intendedLocation = props.location.state;
      if(intendedLocation === undefined){
        props.history.push('/')
      }else{
        props.history.push(intendedLocation.from.pathname)
      } */
    else{
      login(credentials);
      
      /* setErrorMsg("Authentication Fails. Try again");
      return false; */
    }
    //login(credentials, stayLogedIn)
    
    
  };
  return (
    <div className="mt-1 p-1 block bg-gray-100 h-full w-full">
    <div className="block shadow-2xl pb-2 w-full m-auto md:mt-24 md:w-96">
      
      <div className="block bg-black w-full h-24 text-white">
          <h2 className="text-center w-full font-serif text-2xl text-white">Welcome Back</h2>
          <i className="fa fa-cart text-4xl text-center font-light mt-1 mb-1"></i>
      </div>
      <div className="z-50 px-4 h-full">
      <form onSubmit={loginUser} className="h-full block pb-8 md:pb-12 -mt-6 px-8 bg-white rounded-t-2xl ">
        <h2 className="w-full text-center mb-2 pt-2 pb-4 font-medium text-2xl font-mono">
        Login
      </h2>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Your Email Address"
          autoComplete="off"
          className="outline-none pl-2 py-1.5 mt-2.5 w-full rounded-full border border-gray-400 focus:border-purple-300"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter Password"
          className="outline-none pl-2 py-1.5 mt-6 w-full rounded-full border border-gray-400 focus:border-purple-300"
        />
        <div className="ml-2 text-sm flex mt-2.5 mb-2">
        <input
          type="checkbox"
          name="checkbox"
          value={stayLogedIn}
          onChange={changeStayLogedInStatus}
          className="mt-1 pl-2 w-4 rounded-full border-1 outline-none"
        />
        <label className="pl-2"> Select to stay logged in</label>
        </div>
        {
          errors !== null && <span className="text-center text-red-600 text-sm py-2 italic">
            {
              errors
            }
            </span>
        }
        <p className="text-right py-1 text-purple-700">
          <Link to="/forgotpassword">Forgot Password ?</Link> 
        </p>
        <button
          type="submit"
          className="py-1 mt-2 w-full rounded-full border-1 bg-purple-600
           text-white font-bold text-xl md:w-48 m-auto text-center outline-none"
        >
          Login
        </button>
      </form>

      <p className="mt-8 text-center">
        A new member?, please{" "}
        <Link to="/register" className="text-purple-800 px-1 outline-none">
          register
        </Link>{" "}
      </p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
