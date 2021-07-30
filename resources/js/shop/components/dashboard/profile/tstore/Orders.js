import React, { useContext, useEffect } from 'react'
import Order from './Order'
import UserContext from '../../../context/user/Context'
import { Link } from 'react-router-dom'

const Orders = () => {
    const { user } = useContext(UserContext)

    return (
        <div className="w-full md:w-2/3 lg:w-1/2 m-auto mt-1 h-full min-h-screen pb-32 pl-4">
            {
                user && user.transactions?.length > 0 ?(
                    user.transactions.map((item, index) => {
                      return <Order item={item} key={index} />;
                    })
                )
                :
                <p className="text-center">You've Not make any order Yet</p>
                    
            }
            <p className="text-center mt-8">continue <Link to="/" className="text-green-600">Shopping</Link></p>
        
        </div>
    )
}

export default Orders
