import { info } from 'autoprefixer'
import React, { useState } from 'react'
import AddToCartBtn from './AddToCartBtn';
let veg =
  "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
  "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";
const RestaurantMenugridlist = ({ props }) => {
  const [isMore, setIsMore] = useState(false);
  console.log(props);

  return (
    <>
      <div className='my-5'>
        {props.map(({ card: { info } }, i) => (
          <div key={i} className='px-8'>
            <div className="relative w-full">
              <div className="flex w-full justify-between min-h-[182px]">
                <div className="w-[55%] md:w-[70%]">
                  <img className="w-5 rounded-sm" src={info?.itemAttribute && info?.itemAttribute?.vegClassifier == "VEG"
                    ? veg : nonVeg} alt="" srcSet="" />
                  <h2 className="font-bold text-lg text-gray-700">{info?.name}</h2>
                  <p className="font-bold text-lg">  ₹{info?.defaultPrice / 100 || info?.price / 100}{" "}  </p>

                  <div className="flex items-center gap-1 text-sm">
                {  info?.ratings?.aggregatedRating?.ratingCountV2 &&  <span> ⭐ {info?.ratings?.aggregatedRating?.rating} ({info?.ratings?.aggregatedRating?.ratingCountV2})  </span>}
                  </div>

                  {(info?.description||"").length > 140 ? (
                    <div>
                      <span className=" line-clamp-2 md:line-clamp-none text-gray-700 font-semibold">
                        {isMore ? info?.description : info?.description.substring(0, 138) + "..."}
                      </span>
                      <button
                        className="hidden md:block font-bold"
                        onClick={() => setIsMore(!isMore)}
                      >
                        {isMore ? "less" : "more"}
                      </button>
                    </div>
                  ) : (
                    <span className=" line-clamp-2 md:line-clamp-none text-gray-500 font-semibold">{info?.description}</span>
                  )}
                </div>
                <div className="w-[40%] md:w-[20%] relative h-full">
                  <img className="rounded-xl aspect-square"
                    src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + info?.imageId }
                    alt="" />
                  <AddToCartBtn   info={info}   />
                </div>
              </div>
            </div>
            <hr className="mb-8" />
          </div>

        ))}


      </div>
    </>
  )
}



export default RestaurantMenugridlist