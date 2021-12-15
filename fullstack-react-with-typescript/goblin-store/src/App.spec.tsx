import React from "react";
import { App } from "./App";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import renderWithRouter from "./testHelpers";
import { isExportDeclaration } from "typescript";

jest.mock("./Home", () => ({ Home: () => <div>Home</div> }));
jest.mock("./Cart", () => ({ Cart: () => <div>Cart</div> }));
jest.mock("./Checkout", () => ({ Checkout: () => <div>Checkout</div> }));
jest.mock("./OrderSummary", () => ({
  OrderSummary: () => <div>Order summary</div>,
}));

describe("App", () => {
  it("renders successfully", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(container.innerHTML).toMatch("Goblin Store");
  });

  it("renders Home component on the root route", () => {
    const history = createMemoryHistory();
    history.push("/");

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(container.innerHTML).toMatch("Home");
  });

  describe("routing", () => {
    it("renders Home component on the root route", () => {
      const { container } = renderWithRouter(() => <App />, "/cart");

      expect(container.innerHTML).toMatch("Cart");
    });

    it("renders checkout on the /checkout route", () => {
      const { container } = renderWithRouter(() => <App />, "/checkout");

      expect(container.innerHTML).toMatch("Checkout");
    });

    it("renders the cart on the /cart route", () => {
      const { container } = renderWithRouter(() => <App />, "/cart");

      expect(container.innerHTML).toMatch("Cart");
    });

    it("renders the order on the /order route", () => {
      const { container } = renderWithRouter(() => <App />, "/order");

      expect(container.innerHTML).toMatch("Order");
    });

    it("renders 'page not found' on a nonexistent route", () => {
      const { container } = renderWithRouter(
        () => <App />,
        "/route-does-not-exist"
      );

      expect(container.innerHTML).toMatch("Page not found");
    });
  });
});
