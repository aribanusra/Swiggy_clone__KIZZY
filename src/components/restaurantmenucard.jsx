import React from 'react'

const Restaurantmenucard = (data) => {
  let resInfo = data?.info;
 
  return (
    <div className="w-full h-[206px] bg-gradient-to-t from-slate-200/70 mt-3 p-4 rounded-[30px]">
    <div className="w-full h-full bg-white border-slate-200/70 rounded-[30px]">
      <div className="p-4">
        <div className="flex items-center gap-1 font-bold">
          <i className="fi mt-1 text-green-600 fi-ss-circle-star"></i>
          <span>{resInfo?.avgRatingString}</span>
          <span>({resInfo?.totalRatingsString})</span>.
          <span>{resInfo.costForTwoMessage}</span>
        </div>

        <p className="underline font-bold text-[#ff5100]">
          {resInfo?.cuisines?.join(", ")}
        </p>

        <div className="mt-2 flex gap-1">
          <div className="w-[7px] flex flex-col justify-center items-center">
            <div className="w-[7px] h-[7px] rounded-full bg-gray-400"></div>
            <div className="w-[1px] h-[25px] bg-gray-400"></div>
            <div className="w-[7px] h-[7px] rounded-full bg-gray-400"></div>
          </div>
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <p className="flex gap-3">
              Outlet
              <span className="text-gray-400 font-normal">
                {resInfo.areaName}
              </span>
            </p>
            <p>{resInfo?.city}</p>
          </div>
        </div>
      </div>

      <hr className="" />

      <div className="w-full">
        <div className="flex items-center p-2 gap-4">
          <img
            className="w-11 mx-2"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/Swiggy%20One%20Lite/One_lite_Horizontal.png"
            }
            alt="logo"
          />
          <span className="font-semibold text-[#ff5100] text-xs ">
          Free delivery on orders above ₹199
          </span>
        </div>
      </div>




  </div>
  </div>
   
  )
}

export default  Restaurantmenucard