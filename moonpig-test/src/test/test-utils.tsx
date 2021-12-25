import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { RootState, getStoreWithState } from "../state/store";
import { createMemoryHistory } from "history";
import { initialState as productsInitialState } from "./../state/slices/productsSlice";

export const renderWithRouterAndContext = (
  element: React.ReactElement,
  state?: RootState,
  route?: string
): RenderResult & { store: ReturnType<typeof getStoreWithState> } => {
  const history = createMemoryHistory();

  if (route) {
    history.push(route);
  }

  const store = getStoreWithState(state);
  const utils = render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>
  );

  return { store, ...utils };
};

export const defaultState: RootState = {
  currentProduct: { status: "IDLE", errorMessage: "" },
  products: productsInitialState,
};
