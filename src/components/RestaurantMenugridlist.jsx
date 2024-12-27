
import React, { useState } from 'react'
import AddToCartBtn from './AddToCartBtn';
import { isDiffRestro } from '../utils/togglesclice'
import { clearcart } from '../utils/cartSlice'
import { useDispatch, useSelector } from 'react-redux';

let veg =
  "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
  "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";



const RestaurantMenugridlist = ({ props, resinfo }) => {


  const [isMore, setIsMore] = useState(false);
  const diffrestro = useSelector((state) => state.ToggleSlice.isDiffRes)
  const dispatch = useDispatch()

  const differentrestro = () => {
    dispatch(isDiffRestro())
  }
  function handleClearCart() {
    dispatch(clearcart());
    differentrestro();
  }

  return (
    <>
      <div className='my-5 flex flex-col'>
        {props.map(({ card: { info } }, i) => (
          <div key={i} className='px-8'>
            <div className="relative w-full">
              <div className="flex w-full justify-between min-h-[182px]">
                <div className="w-[55%] md:w-[70%]">
                  <img className="sm:w-5 w-3 rounded-sm" src={info?.itemAttribute && info?.itemAttribute?.vegClassifier == "VEG"
                    ? veg : nonVeg} alt="" srcSet="" />
                  <h2 className="font-bold text-base sm:text-lg text-gray-700">{info?.name}</h2>
                  <p className="font-bold text-base sm:text-lg">  ₹{info?.defaultPrice / 100 || info?.price / 100}{" "}  </p>

                  <div className="flex items-center gap-1 text-sm">
                    {info?.ratings?.aggregatedRating?.ratingCountV2 && <span> ⭐ {info?.ratings?.aggregatedRating?.rating} ({info?.ratings?.aggregatedRating?.ratingCountV2})  </span>}
                  </div>

                  {(info?.description || "").length > 140 ? (
                    <div>
                      <span className="text-sm sm:text-base line-clamp-2 md:line-clamp-none text-gray-700 font-semibold">
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
                <div className="w-32  relative h-full">
                  <img className="rounded-xl aspect-square"
                    src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + info?.imageId}
                    alt="" />
                  <AddToCartBtn resinfo={resinfo} info={info} differentrestro={differentrestro} />
                </div>
              </div>
            </div>
            <hr className="mb-8" />






            {diffrestro && (
              <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 shadow-md fixed bottom-10 bg-white">
                <h1>Items already in cart</h1>
                <p>
                  Your cart contains items from other restaurant. Would
                  you like to reset your cart for adding items from this
                  restaurant?
                </p>
                <div className="flex justify-between gap-3 w-full uppercase">
                  <button
                    onClick={differentrestro}
                    className="border-2 w-1/2 p-3 border-green-600 text-green-600"
                  >
                    No
                  </button>
                  <button
                    onClick={handleClearCart}
                    className="  w-1/2 p-3 bg-green-600 text-white "
                  >
                    Yes, start Afresh
                  </button>
                </div>
              </div>
            )}








          </div>

        ))}


      </div>
    </>
  )
}



export default RestaurantMenugridlist