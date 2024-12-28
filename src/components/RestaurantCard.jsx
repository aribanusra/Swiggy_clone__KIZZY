import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


const RestaurantCard = (data) => {

  return (
    <>


      <Link to={`/restaurantmenu/${data?.link.split("/")[5]}`}>

      <div className="w-72 sm:w-64 md:w-64 lg:w-60  relative  rounded overflow-hidden hover:scale-[0.95] ">

          <img className="rounded-3xl w-full h-48 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + data?.data?.cloudinaryImageId
          } alt="Restaurant Image" />
  <div className="bg-gradient-to-t from-black from-1% to-transparent to-40%  rounded-3xl w-full h-[154px] absolute top-10"></div>
                <p className="absolute bottom-32 text-white text-xl ml-2 mb-1 font-bold">
                    {
                      data?.data?.aggregatedDiscountInfoV3 ?  data?.data?.aggregatedDiscountInfoV3?.header +
                      " " +
                      data?.data?.aggregatedDiscountInfoV3?.subHeader : "" 
                    }
                    
                </p>

          <div className="p-4">

            <h2 className="font-bold text-lg mb-2">{data?.data?.name?.length >= 25 ? data?.data?.name.slice(0, 15) + "..." : data?.data?.name}</h2>


            <p className="text-gray-600 text-sm">{data?.data?.cuisines.join(', ').slice(0, 25) + "..."}</p>

            <div className="flex items-center justify-between mt-4">

              <div className="flex items-center text-sm text-gray-800">
                <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">{data?.data?.avgRating}★</span>
                <span className="ml-2 text-gray-500">{data?.data?.sla?.slaString}</span>
              </div>
            </div>
          </div>
        </div>

      </Link>
    </>
  )
}

export default RestaurantCard