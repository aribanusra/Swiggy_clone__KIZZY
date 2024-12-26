import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { deletecartitem ,clearcart} from '../utils/cartSlice'
import { toggleLogin} from '../utils/togglesclice';
import toast from 'react-hot-toast';
import cartempty from '../assets/cartempty.avif'
const Cartdata = () => {
    const userData = useSelector((state) => state.authSlice.userData);
    const cart = useSelector ((state)=>state.cartSlice.cart)
    let resinfo = useSelector ((state)=>state.cartSlice.res)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let veg =
        "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
    let nonVeg =
        "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

    function remove(i) {
        // cart.splice(i,1)    wont work because its immutable 
        if (cart.length > 1) {
            let newarr = [...cart];
            newarr.splice(i, 1);
            dispatch(deletecartitem(newarr))
            toast.success("Item Removed From Cart")
         
        } else {
            clearCart();
            toast.success("Cart is Clear !!! ")
        }

    }

    function clearCart() {
        dispatch(clearcart())
    }

    if (cart.length === 0) {
        return (
            <div className=" w-[80%] sm:w-1/2 mx-auto my-28 justify-center items-center flex flex-col">
                <img className='w-52' src={cartempty} alt="" />
                <p className='font-bold text-[#52587d]'>Your cart is empty</p>
                <p  className='text-[#52587d]'>You can go to home page to view more restaurants</p>
                <Link to="/" className="bg-orange-500 text-white p-2 inline-block my-3">
                  <button>
                  See restaurants near you</button> 
                </Link>
            </div>
        );
    }

    function handlePlaceOrder() {
        if (!userData) {
            toast.error("Please Login to Continue");
            dispatch(toggleLogin())
            return;
        }
        toast.success("order placed");
    }

    let totalprice = cart.reduce((acc, curr) => acc + curr.price / 100 || curr.defaultPrice / 100, 0)

    return (
        <>
           
            <div className="w-full bg-gray-200 p-7" >
                <div className="bg-white w-[90%]  mx-auto p-6">
                    <Link to={`/restaurantMenu/${resinfo.id}`}>
                        <div className="my-5 flex gap-5 ">
                            <img className="rounded-xl w-24 aspect-square" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + resinfo.cloudinaryImageId
                            } alt="" />
                            <div>
                                <p className="text-2xl font-bold border-b-2 text-gray-700 border-black pb-3 ">{resinfo.name}</p>
                                <p className="mt-3 text-xl text-gray-500">{resinfo.areaName}</p>
                            </div>
                        </div>
                    </Link>
                    <hr className="my-10" />
                    <div>
                        {cart.map(({ name, defaultPrice, price, itemAttribute, ratings: { aggregatedRating: { rating, ratingCountV2 }, }, description = "", imageId, }, i) => {
                            // const [isMore, setIsMore] = useState(false);

                            let trimDes = description.substring(0, 138) + "...";
                            return (
                                
                                    <div key={i} className="flex w-full h-15 sm:h-7 justify-between items-center">
                                        <div className="flex gap-3 ">
                                            <img className="w-4 h-4 rounded-sm" src={itemAttribute && itemAttribute.vegClassifier == "VEG" ? veg : nonVeg}
                                                alt=""  />
                                            <h2 className="text-gray-700 font-semibold text-sm sm:text-lg">  {name} </h2>
                                            </div> <div className="flex gap-5 items-center " >
                                            <i onClick={()=>remove(i)} className="fi fi-ss-trash-xmark text-red-500"></i>
                                            <p className="text-gray-700 font-semibold text-sm sm:text-lg">  ₹  {defaultPrice / 100 || price / 100}{" "} </p>
                                        </div>
                                    </div>

                            );
                        })}
                    </div>
                    <hr className="my-10" />
                    <h1 className="text-base font-bold">TO PAY - <span className="font-bold">₹{totalprice}</span></h1>
                    <div className="flex flex-col sm:flex-row justify-between">
                        <button onClick={handlePlaceOrder} className="font-bold py-3 px-10 sm:px-20 md:px-32 bg-[#5fb346]  my-7  text-white" text-white >   PROCEED TO PAY   </button>
                        <button onClick={clearCart} className="p-3 bg-red-400  sm:my-7  text-white"   >    Clear Cart  </button>
                        
                    </div>
                </div>
            </div>
       
        </>
    )
}

export default Cartdata