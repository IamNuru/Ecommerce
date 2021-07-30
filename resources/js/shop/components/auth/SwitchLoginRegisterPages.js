import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SwitchLoginRegisterPages = () => {
    const { pathname } = useLocation();
    const page = pathname.split('/').pop();
    return (
        <div className="w-full my-4 flex justify-center">
            
                <Link to="/login" 
                    className="px-16 py-4 text-center mx-1 text-yellow-800 text-md hover:bg-yellow-300"
                    style={{borderBottomColor: '#efef05', borderBottomWidth: page === 'login'?'2px':'0px'}}
                    >
                Login</Link>
                <Link to="/register" 
                    className="px-16 py-4 text-center mx-1 text-yellow-800 text-md hover:bg-yellow-300"
                    style={{borderBottomColor: '#efef05', borderBottomWidth: page === 'register'?'2px':'0px'}}
                    >
                Register</Link>
        </div>
    )
}

export default SwitchLoginRegisterPages
