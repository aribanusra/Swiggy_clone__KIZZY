import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function OnYourMind({Data}) {

    const [Value, setValue] = useState(0);
    function handleNext(){
        Value >=160 ? "" : setValue((Prev)=>Prev + 20 )
    }
    function handlePrev(){
       Value <=0 ? "" : setValue((Prev)=>Prev - 20 )
    }

 return (
        Data&&
    <>
     <div className='flex justify-between mt-5'>
                <p className='font-bold text-xl md:text-2xl'>What's on your mind?</p>
               <div className='flex gap-3'>
               <div onClick={handlePrev} className='cursor-pointer bg-gray-200 rounded-full w-7 md:w-9 h-7 md:h-9 flex justify-center items-center'>
                    <i className="fi text-2xl mt-1 fi-rr-arrow-small-left"></i>
                </div>
                <div onClick={handleNext} className='cursor-pointer bg-gray-200 rounded-full w-7 md:w-9 h-7 md:h-9  flex justify-center items-center'>
                    <i className="fi text-2xl mt-1 fi-rr-arrow-small-right"></i>
                </div>
               </div>
            </div>
            <div style={{translate : `-${Value}%`}} className={`flex mt-4 duration-300`}>
                {
                    Data &&
                    Data.map((item,i)=>(
                        <Link to={`/dishes/${item?.action?.link.split("?")[1]}`} key={i}>
                        <div className='w-24 md:w-40'>
                        <img   src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" />
                        </div>
                        </Link>
                    ))
                }
            </div>

            <hr className='border mt-5'/>
    </>
  )
}

export default OnYourMind

// "https://www.swiggy.com/collections/83637?collection_id=83637&search_context=burger&tags=layout_CCS_Burger&type=rcv2"
// https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${id}&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null
// "https://www.swiggy.com/collections/83631?collection_id=83631&search_context=pizza&tags=layout_CCS_Pizza&type=rcv2"
// https://www.swiggy.com/collections/83637?collection_id=83637&search_context=burger&tags=layout_CCS_Burger&type=rcv2"