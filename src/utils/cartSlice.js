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
            info.qty = 1
            state.cart= [...state.cart , info ]
            state.res = resinfo
            localStorage.setItem("cart" ,JSON.stringify(state.cart))
            localStorage.setItem("res" ,JSON.stringify(state.res ))
        },
        deletecartitem : (state,action)=>{
            state.cart = action.payload
            localStorage.setItem("cart", JSON.stringify(action.payload))
        },
        incrementqty: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload); // Find the item by ID
            if (item) {
              item.qty += 1; // Increment qty
              localStorage.setItem("cart", JSON.stringify(state.cart)); // Update localStorage
            }
          },
          decrementqty: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload); // Find the item by ID
            if (item && item.qty > 1) {
              item.qty -= 1; // Decrement qty, ensuring it doesn't go below 1
              localStorage.setItem("cart", JSON.stringify(state.cart)); // Update localStorage
            }
          },
        clearcart :(state , action ) => {
            state.cart = [];
            state.res = [];
            localStorage.removeItem("cart")
            localStorage.removeItem("res")
        }
    }

})
export const {addtocart, deletecartitem ,incrementqty ,decrementqty,clearcart} = cartSlice.actions;
export default cartSlice.reducer