import { Status, CurrencyCode, ApiProduct, ApiProducts } from "../types/index";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  Reducer,
} from "@reduxjs/toolkit";
import { getCards, getSingleCard } from "../api";

export type Product = {
  title: string;
  price: number;
  currencyCode: CurrencyCode;
  imageUrl: string;
  id: string;
};

export type ProductState = {
  status?: Status;
  products: Product[];
};

const mapProduct = (product: ApiProduct): Product => {
  return {
    title: product.Title,
    id: product.MoonpigProductNo,
    price: product.Price.Value,
    currencyCode: product.Price.CurrencyCode,
    imageUrl: product.ProductImage.Link.Href,
  };
};

const productsAdapter = createEntityAdapter<Product>();

const mapApiToState = (products: ApiProducts): Array<Product> =>
  products.Products.map(mapProduct);

const initialState = productsAdapter.getInitialState({
  status: "IDLE",
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
const getSingleProduct = createAsyncThunk(
  "products/getOne",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await getSingleCard(id);
      return result;
    } catch (err) {
      rejectWithValue(err);
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

    builder.addCase(getProducts.rejected, (state, _) => {
      state.status = "ERROR";
    });
  },
});

export default productsSlice.reducer as Reducer<typeof initialState>;
