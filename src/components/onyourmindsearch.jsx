import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import RestaurantCard from './RestaurantCard'

const Onyourmindsearch = () => {
    let { id } = useParams()
    let idd = id.split("=")[1].split("&")[0]
    let menu = id.split("_")[3].split("&")[0]
    const lat = useSelector((state) => state.Coordinateslice.lat)
    const lng = useSelector((state) => state.Coordinateslice.lng)


    const [heading, setheading] = useState("")
    const [subheading, setsubheading] = useState("")
    const [restaurant, setrestaurant] = useState([])


    async function fetchdata() {
        const data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${idd}&tags=layout_CCS_${menu}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`)
        const result = await data.json()
        let headingd = result?.data?.cards?.find((item) => item?.card?.card?.['@type'].includes('widgets.v2.CollectionMasthead')).card?.card?.title
        setheading(headingd)
        let subheadingd = result?.data?.cards?.find((item) => item?.card?.card?.
        ['@type'].includes('widgets.v2.CollectionMasthead')).card?.card?.description
        setsubheading(subheadingd)
        let restro = result?.data?.cards?.filter((item) => item?.card?.card?.['@type'].includes('Restaurant'))
        setrestaurant(restro)

    }
    useEffect(() => {
        fetchdata()
    }, [])


    console.log(restaurant);


    return (
        <>
            <div className='m-16'>
                <div className='font-bold text-5xl text-gray-800 my-4'>{heading}</div>
                <div className='text-sm sm:text-base text-gray-600 my-4'>{subheading}</div>
                <div className='font-bold text-xl sm:text-3xl text-gray-800 my-8'>Restaurants to explore</div>
                <div className="flex flex-wrap gap-7 justify-center mt-10">
                    {restaurant.map((data,i) => (

                        <Link to={`/restaurantmenu/${data?.card?.card?.info?.id}`} 
                        key={i}>

                            <div className="w-72 sm:w-64 md:w-72 lg:w-64 xl:w-72 relative  rounded overflow-hidden hover:scale-[0.95] ">

                                <img className="rounded-3xl w-full h-48 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + data?.card?.card?.info?.cloudinaryImageId
                                } alt="Restaurant Image" />
                                <div className="bg-gradient-to-t from-black from-1% to-transparent to-40%  rounded-3xl w-full h-[154px] absolute top-10"></div>
                                <p className="absolute bottom-32 text-white text-xl ml-2 mb-1 font-bold">
                                    {
                                        data?.card?.card?.info?.aggregatedDiscountInfoV3 ? data?.card?.card?.info?.aggregatedDiscountInfoV3?.header +
                                            " " +
                                            data?.card?.card?.info?.aggregatedDiscountInfoV3?.subHeader : ""
                                    }

                                </p>

                                <div className="p-4">

                                    <h2 className="font-bold text-lg mb-2">{data?.card?.card?.info?.name?.length >=20 ? data?.card?.card?.info?.name.slice(0, 20) + "..." : data?.card?.card?.info?.name}</h2>




                                    <div className="flex items-center justify-between mt-4">

                                        <div className="flex items-center text-sm text-gray-800">
                                            <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">{data?.card?.card?.info?.avgRating}★</span>
                                            <span className="ml-2 text-gray-500">{data?.card?.card?.info?.sla?.slaString}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">{data?.card?.card?.info?.cuisines.join(', ').slice(0, 25) + "..."}</p>
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>
        </>


    )
}

export default Onyourmindsearch


// "https://www.swiggy.com/collections/83637?collection_id=83637&search_context=burger&tags=layout_CCS_Burger&type=rcv2"
// https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${id}&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null
// https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.49690&lng=80.32460&collection=83637&tags=layout_CCS_Burger&sortBy=&filters=&type=rcv2&offset=0&page_type=null