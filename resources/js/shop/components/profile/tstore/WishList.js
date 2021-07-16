import React, { useContext } from 'react'
import CartContext from '../../context/cart/CartContext'
import { Link } from 'react-router-dom'
import WishListItem from './wishListItem'

const WishList = () => {
    const { wishList } = useContext(CartContext)
    return (
        <div className="w-full md:w-2/3 lg:w-1/2 m-auto mt-1 h-full min-h-screen pb-32 pl-4">
            {
                wishList.length > 0 ?(
                    wishList.map((item) => {
                      return <WishListItem item={item} key={item.id} />;
                    })
                )
                :
                <p className="text-center">Your wish list box is currently Empty</p>
                    
            }
            <p className="text-center mt-8">continue <Link to="/" className="text-green-600">Shopping</Link></p>
        </div>
    )
}

export default WishList
