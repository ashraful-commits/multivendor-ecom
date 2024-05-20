import React from 'react'
import LargeCard from './LargeCard';
import {Layers,ShoppingCart,WalletCards} from 'lucide-react'
const LargeCards = () => {
const ordersState=[
  {
    period:"Today Orders",
    sales:10000,
    color:"bg-green-500",
    icon:<Layers/>
  },
  {
    period:"Yesterday Orders",
    sales:13000,
    color:"bg-orange-500",
    icon:<Layers/>
  },
  {
    period:"This Month",
    sales:14000,
    color:"bg-yellow-500",
    icon:<ShoppingCart/>
  },
  {
    period:"Last Month",
    sales:15000,
    color:"bg-purple-500",
    icon:<WalletCards/>
  },
  {
    period:"All Time Sales",
    sales:17000,
    color:"bg-blue-500",
    icon:<WalletCards/>
  }
]
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
     {ordersState.map((item,i)=>{
      return(
        <LargeCard data={item} key={i} />
      )
     })}
     
    </div>
  )
}

export default LargeCards
