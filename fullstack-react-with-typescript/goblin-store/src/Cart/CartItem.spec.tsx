import React from "react";
import { CartItem } from "./CartItem";
import { Product } from "../shared/types";
import { fireEvent } from "@testing-library/react";
import renderWithRouter from "./../testHelpers";

describe("CartItem", () => {
  const product: Product = {
    name: "Product Foo",
    price: 100,
    image: "/image/source.png",
  };

  it("renders correctly", () => {
    const { container, getByAltText } = renderWithRouter(() => (
      <CartItem product={product} removeFromCart={() => {}} />
    ));

    expect(container.innerHTML).toMatch("Product Foo");
    expect(container.innerHTML).toMatch("100 Zm");
    expect(getByAltText("Product Foo")).toHaveAttribute(
      "src",
      "/image/source.png"
    );
  });

  describe("on 'Remove' click", () => {
    it("calls passed in function", () => {
      const spy = jest.fn();

      const { getByText } = renderWithRouter(() => (
        <CartItem product={product} removeFromCart={spy} />
      ));

      fireEvent.click(getByText("Remove"));
      expect(spy).toBeCalledWith(product);
    });
  });
});
