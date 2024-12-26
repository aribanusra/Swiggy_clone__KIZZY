import { createSlice } from "@reduxjs/toolkit";

const Coordinateslice = createSlice({
    name: "Coordinateslice",
    initialState: {
        lat:18.9690247,
  lng:72.8205292
    },
    reducers:{
        changecoord:(state,action)=>{
            const {lat,lng } = action.payload
            state.lat = lat;
            state. lng=lng
        }
    }
})
export const { changecoord } = Coordinateslice.actions
export default Coordinateslice.reducer