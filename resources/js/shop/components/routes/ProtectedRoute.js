import React, { useContext, useEffect } from "react"
import axios from 'axios';
import { Route, Redirect } from "react-router-dom"
import AuthContext from "../context/auth/Context"

const ProtectedRoute = ({ component: Component, ...rest}) => {
    const { logedin, user, setLogedIn } = useContext(AuthContext);
    
    useEffect(() => {
        const getAuthUser = () => {
          const configs = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };
          axios
            .get(`${process.env.MIX_APP_API_URL}/user`, configs)
            .then((res) => {
                setLogedIn(true)

            })
            .catch((err) => {
                setLogedIn(false)
            });
        };
        getAuthUser();
        // eslint-disable-next-line
      }, [user, logedin]);

    return (
        <Route { ...rest } render={
            props =>{
                if(logedin){
                    return <Component {...rest} {...props} />
                }else{
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state:{
                                from: props.location
                            }
                        }
                    } />
                }
            }
        }>

        </Route>
    )
}
export default ProtectedRoute;