import { createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
    name : "cartSlice",
    initialState:{
        cart :JSON.parse(localStorage.getItem("cart")) || [],
        res : JSON.parse(localStorage.getItem("res")) || []
    },
    reducers:{
        addtocart : (state,action)=>{
            const {info , resinfo} = action.payload;
            state.cart= [...state.cart , info]
            state.res = resinfo
            localStorage.setItem("cart" ,JSON.stringify(state.cart))
            localStorage.setItem("res" ,JSON.stringify(state.res ))
        },
        deletecartitem : (state,action)=>{
            state.cart = action.payload
            localStorage.setItem("cart", JSON.stringify(action.payload))
        },
        clearcart :(state , action ) => {
            state.cart = [];
            state.res = [];
            localStorage.removeItem("cart")
            localStorage.removeItem("res")
        }
    }

})
export const {addtocart, deletecartitem,clearcart} = cartSlice.actions;
export default cartSlice.reducer