import React, { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { Route, Redirect } from "react-router-dom"
import AuthContext from "../context/auth/Context"

const AdminRoute = ({ component: Component, ...rest}) => {
    const {  user  } = useContext(AuthContext);
    const [logedin, setLogedin] = useState(null)
    
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
                if (res.data.role === "admin") {
                    setLogedin(true)
                }else{
                    setLogedin(false)
                }
            })
            .catch((err) => {
                setLogedin(false)
            });
        };
        getAuthUser();
        // eslint-disable-next-line
      }, [user, logedin]);

    return (
        logedin !== null && <Route { ...rest } render={
            props =>{
                if(logedin){
                    return <Component {...rest} {...props} />
                }else{
                    return <Redirect to={
                        {
                            pathname: "/an-authorised-page",
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
export default AdminRoute;