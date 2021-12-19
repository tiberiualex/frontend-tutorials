import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import productsReducer, {
  initialState,
  productsAdapter,
  getProducts,
} from "./../../state/slices/productsSlice";
import mockApiProducts from "./../fixtures/apiProducts";
import { RootState, getStoreWithState } from "../../state/store";
import { Product } from "../../types";
import { debug } from "console";

jest.mock("./../../api", () => {
  return {
    async getCards() {
      return mockApiProducts;
    },
  };
});

describe("thunks", () => {
  it("correctly populate state", async () => {
    const state = getStateWithProducts([]);
    const store = getStoreWithState(state);
    await store.dispatch(getProducts({}));
    console.log(store.getState().products);
    expect(store.getState().products.ids.length).toEqual(2);
  });
});

function getStateWithProducts(items: Product[]): RootState {
  const state: RootState = {
    currentProduct: { status: "IDLE", errorMessage: "" },
    products: initialState,
  };

  if (items.length) {
    productsAdapter.upsertMany(state.products, items);
  }

  return state;
}
