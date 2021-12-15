import React from "react";
import { OrderSummary } from "./OrderSummary";
import { Loader } from "../shared/Loader";
import { render, fireEvent, getByRole } from "@testing-library/react";
import renderWithRouter from "./../testHelpers";

jest.mock("../shared/Loader", () => ({
  Loader: jest.fn(() => null),
}));

describe("OrderSummary", () => {
  afterEach(jest.clearAllMocks);

  describe("while order data being loaded", () => {
    it("renders loader", () => {
      const stubUseOrder = () => ({
        isLoading: true,
        order: undefined,
      });

      render(<OrderSummary useOrderHook={stubUseOrder} />);
      expect(Loader).toHaveBeenCalled();
    });
  });

  describe("when order is loaded", () => {
    const stubUseOrder = () => ({
      isLoading: false,
      order: {
        products: [
          {
            name: "Product foo",
            price: 10,
            image: "image.png",
          },
        ],
      },
    });

    it("renders order info", () => {
      const { container } = renderWithRouter(() => (
        <OrderSummary useOrderHook={stubUseOrder} />
      ));

      expect(container.innerHTML).toMatch("Product foo");
    });

    it("navigates to main page on button click", () => {
      const { history, getByRole } = renderWithRouter(() => (
        <OrderSummary useOrderHook={stubUseOrder} />
      ));

      fireEvent.click(getByRole("button"));

      expect(history.location.pathname).toBe("/");
    });
  });

  describe("without order", () => {
    const stubUseOrder = () => ({
      isLoading: false,
      order: undefined,
    });

    it("renders error message", () => {
      const { container } = render(
        <OrderSummary useOrderHook={stubUseOrder} />
      );

      expect(container.innerHTML).toMatch("Couldn't load order info.");
    });
  });
});
