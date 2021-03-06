import { Status, Product, ApiBatchProducts } from "../../types/index";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  Reducer,
} from "@reduxjs/toolkit";
import { getCards } from "../../api";
import { RootState } from "../store";
import { mapBatchProduct } from "../utils";

export const productsAdapter = createEntityAdapter<Product>();

const mapApiToState = (products: ApiBatchProducts): Array<Product> =>
  products.Products.map(mapBatchProduct);

export const initialState = productsAdapter.getInitialState({
  status: "IDLE" as Status,
  errorMessage: "",
});

export const getProducts = createAsyncThunk(
  "products/getMany",
  async (
    { size, start }: { size?: number; start?: number },
    { rejectWithValue }
  ) => {
    try {
      const result = await getCards(size, start);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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

    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = "ERROR";
      state.errorMessage = (action.payload as string) || "";
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
