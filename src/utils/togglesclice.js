import { createSlice } from "@reduxjs/toolkit";

 const ToggleSlice = createSlice ({
    name : "ToggleSlice" ,
    initialState: {
        searchbartoggle : false,
        isDiffRes :false,
        loginToggle : false
    },
    reducers: {
        togglesearchbar : (state)=> {
         state.searchbartoggle = !state.searchbartoggle
        },
        isDiffRestro : (state)=>{
            state.isDiffRes = !state.isDiffRes
        },
        toggleLogin : (state) => {
            state.loginToggle = !state.loginToggle
        },
    }
    
 })
 export const {toggleLogin,togglesearchbar,isDiffRestro} = ToggleSlice.actions
 export default ToggleSlice.reducer