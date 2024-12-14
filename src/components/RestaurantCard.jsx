import React from 'react'
import { Link } from 'react-router-dom'

const RestaurantCard = (data  ) => {
  
  return (
    <Link to={`/restaurantmenu/${data?.link.split("/")[5]}`}>
     
     <div className="w-56 rounded overflow-hidden hover:scale-[0.95] ">

<img className="rounded-3xl w-full h-48 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+data?.data?.cloudinaryImageId
} alt="Restaurant Image"/>


<div className="p-4">

  <h2 className="font-bold text-lg mb-2">{data?.data?.name?.length >=25 ? data?.data?.name.slice(0,18)+"..."  : data?.data?.name}</h2>


  <p className="text-gray-600 text-sm">{data?.data?.cuisines.join(', ').slice(0,28)+"..."}</p>

  <div className="flex items-center justify-between mt-4">
   
    <div className="flex items-center text-sm text-gray-800">
      <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">{data?.data?.avgRating}★</span>
      <span className="ml-2 text-gray-500">{data?.data?.sla?.slaString}</span>
    </div>
    </div>
    </div>
    </div>
    </Link>
  )
}

export default RestaurantCard