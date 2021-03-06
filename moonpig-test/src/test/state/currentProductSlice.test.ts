import { initialState } from "./../../state/slices/productsSlice";
import { getSingleCard } from "./../../api";
import singleProduct from "./../fixtures/singleProduct";
import { Product } from "./../../types";
import { RootState, getStoreWithState } from "../../state/store";
import { getSingleProduct } from "./../../state/slices/currentProductSlice";

jest.mock("./../../api");
const mockGetCard = getSingleCard as jest.Mock;

describe("currentProduct state", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("correctly populates state", async () => {
    mockGetCard.mockReturnValue(singleProduct);

    const state = getStateWithProduct(singleProduct);
    const store = getStoreWithState(state);
    await store.dispatch(getSingleProduct({ id: "id" }));

    expect(store.getState().currentProduct.status).toEqual("IDLE");
    expect(store.getState().currentProduct.product?.id).toEqual("PU1162");
  });

  it("populates error message", async () => {
    mockGetCard.mockReturnValue(Promise.reject("Error message"));

    const state = getStateWithProduct();
    const store = getStoreWithState(state);
    await store.dispatch(getSingleProduct({ id: "id" }));

    expect(store.getState().currentProduct.status).toEqual("ERROR");
    expect(store.getState().currentProduct.errorMessage).toEqual(
      "Error message"
    );
  });

  it("sets state to LOADING", () => {
    mockGetCard.mockReturnValue(singleProduct);

    const state = getStateWithProduct();
    const store = getStoreWithState(state);
    store.dispatch(getSingleProduct({ id: "id" }));

    expect(store.getState().currentProduct.status).toEqual("LOADING");
  });
});

function getStateWithProduct(product?: Product): RootState {
  const state: RootState = {
    currentProduct: { status: "IDLE", errorMessage: "" },
    products: initialState,
  };

  if (product) {
    state.currentProduct.product = product;
  }

  return state;
}
