import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import productsReducer, {
  initialState,
  productsAdapter,
  getProducts,
} from "./../../state/slices/productsSlice";
import apiProducts from "./../fixtures/apiProducts.json";
import { RootState, getStoreWithState } from "../../state/store";
import { Product } from "../../types";

jest.mock("./../../api", () => {
  return {
    async getCards() {
      return apiProducts;
    },
  };
});

describe("yolo", () => {
  it("should do stuff", async () => {
    const state = getStateWithProducts([]);
    const store = getStoreWithState(state);
    await store.dispatch(getProducts({}));
    expect(store.getState().products).toEqual(5);
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
