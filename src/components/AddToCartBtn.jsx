import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtocart } from '../utils/cartSlice'
import toast from "react-hot-toast";


const AddToCartBtn = ({info , resinfo , differentrestro}) => {

    const cart = useSelector ((state)=>state.cartSlice.cart)
    const  getResInfoFromLocalStore= useSelector ((state)=>state.cartSlice.res)
    const dispatch = useDispatch()
  

    function Add (){
   
       const isAdded = cart.find((data) => data.id === info.id)


        if(!isAdded){

            if( getResInfoFromLocalStore.name === resinfo.name || getResInfoFromLocalStore.length === 0 ){
               dispatch(addtocart({info,resinfo}))
               toast.success("Item Added in Cart")
            }
            else{
              differentrestro()
            }
            
        }else {
           
           toast.error("Item already Added ")
        }
    }
    return (
        <>
            <button onClick={Add} className="bottom-[-20px] left-1/2 -translate-x-1/2 absolute text-green-500 px-7 rounded-lg  py-1 bg-white border border-gray-300 font-bold text-xl">
                Add{" "}
            </button>
        </>
    );
};

export default AddToCartBtn;
