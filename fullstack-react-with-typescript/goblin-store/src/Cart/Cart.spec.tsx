import React from "react";
import { Cart } from "./Cart";
import { fireEvent, render } from "@testing-library/react";
import { CartItemProps } from "./CartItem";
import renderWithRouter from "../testHelpers";

jest.mock("./CartItem", () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product;

    return (
      <div>
        {name} {price} {image}
      </div>
    );
  },
}));

describe("Cart", () => {
  describe("without products", () => {
    const cartHookMock = () => ({
      products: [],
      removeFromCart: () => {},
      totalPrice: () => 0,
    });

    it("renders empty cart message", () => {
      const { container } = renderWithRouter(() => (
        <Cart useCartHook={cartHookMock} />
      ));

      expect(container.innerHTML).toMatch("Your cart is empty");
    });

    describe("on 'Back to main page'", () => {
      it("redirects to '/'", () => {
        const { history, getByRole } = renderWithRouter(() => (
          <Cart useCartHook={cartHookMock} />
        ));

        fireEvent.click(getByRole("link"));
        expect(history.location.pathname).toBe("/");
      });
    });
  });

  describe("with products", () => {
    const products = [
      {
        name: "Product foo",
        price: 100,
        image: "/image/foo_source.png",
      },
      {
        name: "Product bar",
        price: 100,
        image: "/image/bar_source.png",
      },
    ];

    const cartHookStub = () => ({
      products,
      removeFromCart: () => {},
      totalPrice: () => 55,
    });

    it("renders cart products list with total price", () => {
      const { container } = renderWithRouter(() => (
        <Cart useCartHook={cartHookStub} />
      ));

      expect(container.innerHTML).toMatch(
        "Product foo 100 /image/foo_source.png"
      );
      expect(container.innerHTML).toMatch(
        "Product bar 100 /image/bar_source.png"
      );
      expect(container.innerHTML).toMatch("Total: 55 Zm");
    });

    describe("on 'go to checkout' click", () => {
      it("redirects to '/checkout'", () => {
        const { history, getByText } = renderWithRouter(() => (
          <Cart useCartHook={cartHookStub} />
        ));

        fireEvent.click(getByText("Go to checkout"));
        expect(history.location.pathname).toBe("/checkout");
      });
    });
  });
});
