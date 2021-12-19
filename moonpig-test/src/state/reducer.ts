import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import currentProductReducer from "./slices/currentProductSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  currentProduct: currentProductReducer,
});

export default rootReducer;
