import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../pages/products/page";

const initialState:IProduct[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },

    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});


export const {add, remove} = cartSlice.actions;

export default cartSlice.reducer;