import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  Reducer,
} from "@reduxjs/toolkit";

type ProductState = {
  status?: "LOADING" | "ERROR";
};

const initialState: ProductState = {};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default productsSlice.reducer as Reducer<typeof initialState>;
