import { createSlice, createAsyncThunk, Reducer } from "@reduxjs/toolkit";
import { getSingleCard } from "../../api";
import { Status, Product } from "../../types/index";
import { mapSingleProduct } from "../utils";

type SingleProductState = {
  product?: Product;
  status: Status;
  errorMessage: string;
};

const initialState: SingleProductState = {
  status: "IDLE",
  errorMessage: "",
};

export const getSingleProduct = createAsyncThunk(
  "products/getOne",
  async ({ id }: { id: string }, thunkApi) => {
    try {
      const result = await getSingleCard(id);
      return result;
    } catch (err) {
      thunkApi.rejectWithValue(err);
    }
  }
);

const currentProductSlice = createSlice({
  name: "currentProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.product = mapSingleProduct(action.payload);
        state.status = "IDLE";
      }
    });

    builder.addCase(getSingleProduct.pending, (state, _) => {
      state.status = "LOADING";
    });

    builder.addCase(getSingleProduct.rejected, (state, _) => {
      state.status = "ERROR";
    });
  },
});

export default currentProductSlice.reducer as Reducer<typeof initialState>;
