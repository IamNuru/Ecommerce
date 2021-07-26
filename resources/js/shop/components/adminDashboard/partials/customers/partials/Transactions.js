import React from 'react'
import Order from './Order'

const Transactions = (props) => {
    const { transactions } = props

    return (
        <div className="w-full">
            {
                transactions?.length > 0 ?(
                    transactions.map((item, index) => {
                      return <Order item={item} key={index} />;
                    })
                )
                :
                <p className="text-center">You've Not make any order Yet</p>
                    
            }
        </div>
    )
}

export default Transactions
