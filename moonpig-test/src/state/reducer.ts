import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
