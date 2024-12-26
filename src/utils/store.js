import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import ToggleSlice from './togglesclice'
import Coordinateslice from './Coordinateslice'
import filterSlice from './filterSlice'
import authSlice from './authSlice'

const store=configureStore({
    reducer:{
        cartSlice:cartSlice,
        ToggleSlice : ToggleSlice,
        Coordinateslice:Coordinateslice,
        filterSlice : filterSlice,
        authSlice:authSlice
    }
})

export default store