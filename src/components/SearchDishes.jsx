import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import {  isDiffRestro } from "../utils/togglesclice";
import { clearcart } from "../utils/cartSlice";
import { Link } from "react-router-dom";

function SearchDishes({data: {info, restaurant: { info: resInfo }, hideRestaurantDetails = false,  },}) 
{
    let { imageId = "", name, price, isVeg = 0, id : itemId } = info;
  
    let {
        id,
        name: resName,
        avgRating,
        sla: { slaString },
    } = resInfo;
    console.log(resInfo)

    const isDiffRes = useSelector((state) => state.ToggleSlice.isDiffRes);
    const { id: cartResId } = useSelector((state) => state.cartSlice.res);
    const dispatch = useDispatch();

    function handleIsDiffRes() {
        dispatch(isDiffRestro());
    }

    function handleClearCart() {
        dispatch(clearcart());
        handleIsDiffRes();
    }


    let veg = "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png"
    let nonVeg = "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png"
    
    return (
        <>
            <div className="bg-white rounded-2xl p-4 m-4">
                {!hideRestaurantDetails && (
                    <>
                    <Link to={`/restaurantMenu/${id}`}>
                    <div className="flex justify-between text-sm opacity-50">
                        <div className="">
                            <p className="font-bold">By {resName}</p>
                            <p className="my-2">
                                {" "}
                                <i className="fi fi-ss-star"></i> {avgRating} .{" "}
                                {slaString}
                            </p>
                        </div>
                        <i className="fi fi-rr-arrow-small-right text-2xl"></i>
                    </div>
                    </Link>
                <hr className="border-dotted" />
                </>
                )}


                <div className="my-3 md:max-w-fit flex justify-between">
                    <div className="w-[50%]  md:w-[168px] flex flex-col gap-1">
                        <div className="w-5 h-5">
                            {isVeg ? (
                                <img src={veg} alt="" />
                            ) : (
                                <img src={nonVeg} alt="" />
                            )}
                        </div>
                        <p className="text-lg font-semibold">{name}</p>
                        <p className="">
                            <i className="fi fi-bs-indian-rupee-sign text-sm pt-1 inline-block"></i>
                            {price / 100}
                        </p>
                        <button className="px-4 py-1 w-max rounded-3xl border">
                            More Details
                        </button>
                    </div>

                    <div className="w-[40%] md:w-[40%] relative h-full">
                        <img
                            className="rounded-xl object-cover aspect-square"
                            src={
                                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                                imageId
                            }
                            alt=""
                        />
                       
                            <AddToCartBtn
                                info={info}
                                resinfo={resInfo}
                                differentrestro={handleIsDiffRes}
                            />
                       
                    </div>
                </div>
            </div>

            {isDiffRes && (
                <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 shadow-md fixed bottom-10 bg-white">
                    <h1>Items already in cart</h1>
                    <p>
                        Your cart contains items from other restaurant. Would
                        you like to reset your cart for adding items from this
                        restaurant?
                    </p>
                    <div className="flex justify-between gap-3 w-full uppercase">
                        <button
                            onClick={handleIsDiffRes}
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
        </>
    );
}

export default SearchDishes;
