import { Status, Product, ApiProducts } from "../types/index";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  Reducer,
} from "@reduxjs/toolkit";
import { getCards } from "../api";
import { RootState } from "./store";
import { mapProduct } from "./utils";

const productsAdapter = createEntityAdapter<Product>();

const mapApiToState = (products: ApiProducts): Array<Product> =>
  products.Products.map(mapProduct);

const initialState = productsAdapter.getInitialState({
  status: "IDLE" as Status,
});

export const getProducts = createAsyncThunk(
  "products/getMany",
  async (
    { size, start }: { size?: number; start?: number },
    { rejectWithValue }
  ) => {
    try {
      const result = getCards(size, start);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

// Move to a productPageSlice or currentProductSlice. Maybe create another one for search?

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (action.payload) {
        productsAdapter.upsertMany(state, mapApiToState(action.payload));
        state.status = "IDLE";
      }
    });

    builder.addCase(getProducts.pending, (state, _) => {
      state.status = "LOADING";
    });

    builder.addCase(getProducts.rejected, (state, _) => {
      state.status = "ERROR";
    });
  },
});

export default productsSlice.reducer as Reducer<typeof initialState>;

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalNotes,
} = productsAdapter.getSelectors((state: RootState) => state.products);
