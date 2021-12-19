import {
  initialState,
  productsAdapter,
  getProducts,
} from "./../../state/slices/productsSlice";
import mockApiProducts from "./../fixtures/apiProducts";
import { RootState, getStoreWithState } from "../../state/store";
import { Product } from "../../types";
import { getCards } from "./../../api";

jest.mock("./../../api");
const mockGetCards = getCards as jest.Mock;

describe("productsSlice state", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("correctly populates state", async () => {
    mockGetCards.mockReturnValue(mockApiProducts);

    const state = getStateWithProducts([]);
    const store = getStoreWithState(state);
    await store.dispatch(getProducts({}));

    expect(store.getState().products.ids.length).toEqual(2);
  });

  it("populates error message", async () => {
    mockGetCards.mockReturnValue(Promise.reject("Error message"));

    const state = getStateWithProducts([]);
    const store = getStoreWithState(state);
    await store.dispatch(getProducts({}));
    expect(store.getState().products.status).toEqual("ERROR");
    expect(store.getState().products.errorMessage).toEqual("Error message");
  });

  it("sets state to LOADING", () => {
    mockGetCards.mockReturnValue(mockApiProducts);

    const state = getStateWithProducts([]);
    const store = getStoreWithState(state);
    store.dispatch(getProducts({}));
    expect(store.getState().products.status).toEqual("LOADING");
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
