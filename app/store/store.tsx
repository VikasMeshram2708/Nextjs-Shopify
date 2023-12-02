import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";

import { useDispatch } from "react-redux";

import productReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
