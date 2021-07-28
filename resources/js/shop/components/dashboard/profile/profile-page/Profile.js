import React, { useContext, useState} from 'react'
import UserContext from '../../../context/user/Context'
import CartContext from '../../../context/cart/Context'
import { Link } from 'react-router-dom'
import About from './About'
import Address from './Address'

const Profile = () => {
    const { user } = useContext(UserContext)
    const { wishList } = useContext(CartContext)
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    return (
        <div className="bg-gray-100">
       
           <div className="container mx-auto my-2 p-5">
               <div className="md:flex no-wrap md:-mx-2 ">
                   {/* <!-- Left Side --> */}
                   <div className="w-full md:w-3/12 md:mx-2">
                       {/* <!-- Profile Card --> */}
                       <div className="bg-white p-3 border-t-4 border-green-400">
                           <div className="image overflow-hidden">
                               {
                                   user && user.image 
                                   ? (
                                    <img className="h-auto w-full mx-auto"
                                    src={`${process.env.MIX_APP_URL}/storage/images/users/${user.image}`}
                                    alt="User Profile Image" />
                                   ) : (
                                       user && user.gender === "f" 
                                       ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-auto w-full mx-auto" viewBox="0 0 24 24">
                                            <path d="M20.822 19.307c-2.967-.681-6.578-2.437-5.514-4.723.684 1.126 2.801 1.777 4.45.804-4.747-1.204 2.334-9.471-3.871-14.105-1.135-.853-2.526-1.283-3.912-1.283-1.378 0-2.751.425-3.862 1.283-6.206 4.634.876 12.901-3.872 14.105 1.649.974 3.77.293 4.451-.804 1.064 2.286-2.551 4.043-5.514 4.723-2.978.682-3.178 2.466-3.178 4.004l.005.689h23.99l.005-.691c0-1.537-.2-3.32-3.178-4.002z"/>
                                        </svg>
                                       ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-auto w-full mx-auto" viewBox="0 0 24 24">
                                            <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
                                        </svg>
                                       )
                                    
                                   )
                               }
                           </div>
                           <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user && user.first_name ? user.first_name : 'Unknown'}</h1>
                           <h3 className="text-gray-600 font-lg text-semibold leading-6">{user && user.role ? user.role : 'Customer'}.</h3>
                        
                           <ul
                               className="block bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                               <li className="flex items-center py-3">
                                   <span>Status</span>
                                   <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                               </li>
                               <li className="flex items-center py-3">
                                   <span>{user && user.role ? user.role : 'Customer'} since &nbsp; </span>
                                   <span className="text-xs pt-1">{user && new Date(user.created_at).toLocaleDateString([], {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                  })
                                  }</span>
                               </li>
                           </ul>
                       </div>
                       {/* <!-- End of profile card --> */}
                   </div>
                  {/*  <!-- Right Side --> */}
                   <div className="w-full md:w-9/12 mx-2 h-64">
                       {/* <!-- Profile tab -->
                       <!-- About Section --> */}
                       <About />
                       {/* <!-- End of about section --> */}

                       <div className="my-4"></div>

                       {/* <!-- Address Section --> */}
                       <Address />
                       {/* <!-- End of about section --> */}
       
                       <div className="my-4"></div>
       
                       {/* <!-- Experience and education --> */}
                       <div className="bg-white p-3 shadow-sm rounded-sm">
       
                           <div className="grid grid-cols-1 md:grid-cols-2">
                               <div>
                                   <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                       <span clas="text-green-500">
                                           <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor">
                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                           </svg>
                                       </span>
                                       <span className="tracking-wide">Purchased Products</span>
                                   </div>
                                   <ul className="list-inside space-y-2 md:mr-4">
                                       {
                                           user && user.transactions 
                                           && user.transactions.length > 0 ? user.transactions.map(trans =>{
                                            return <li key={trans.id}>
                                                {
                                                    trans.orders?.length > 0 && (
                                                        trans.orders.map(order =>{
                                                            return <div key={order.id}>
                                                            {
                                                            order?.products && order.products.map(prod =>{
                                                               return  <div className="text-md font-light serif" key={prod.id}>{prod && prod.title}</div>
                                                            })
                                                            }
                                                            </div>
                                                        })
                                                    )
                                                }
                                                <div className="text-gray-500 text-xs">
                                                <span className="text-xs pt-1">{trans && new Date(trans.created_at).toLocaleDateString([], {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })
                                                    }</span>
                                                </div>
                                                <div className="text-gray-600 text-md text-right">{trans.amount}</div>
                                            </li>
                                           }): (<div className="text-center">No Transaction Yet</div>)
                                       }
                                   </ul>
                               </div>
                               <div>
                                   <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                       <span clas="text-green-500">
                                           <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor">
                                               <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                               <path fill="#fff"
                                                   d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                   d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                           </svg>
                                       </span>
                                       <span className="tracking-wide">Wish List</span>
                                   </div>
                                   <ul className="list-inside space-y-2">
                                       {
                                           wishList?.length > 0 ? 
                                           (
                                               wishList.map((wish, i) =>{
                                                   return <li key={i}>
                                                        <div className="text-teal-600 text-md font-light serif">{wish.title}</div>
                                                    </li>
                                               })
                                            ) 
                                           : 
                                           (
                                               <div className="text-xs text-center">Your wish list is currently Empty</div>
                                           )
                                            
                                       }
                                       {
                                        wishList?.length > 2 && 
                                        <div className="text-right mt-4 w-full">
                                            <Link to="/wishlist" className="text-center bg-blue-600 py-2 serif text-white mt-2 w-full px-4">Show all wish list</Link>
                                        </div>
                                        }
                                       
                                   </ul>
                               </div>
                           </div>
                           {/* <!-- End of Experience and education grid --> */}
                       </div>
                       {/* <!-- End of profile tab --> */}
                   </div>
               </div>
           </div>
       </div>
    )
}

export default Profile
