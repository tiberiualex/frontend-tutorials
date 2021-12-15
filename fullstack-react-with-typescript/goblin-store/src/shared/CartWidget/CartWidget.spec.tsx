import React from "react";
import { CartWidget } from "./CartWidget";
import { fireEvent, getByRole } from "@testing-library/react";
import renderWithRouter from "../../testHelpers";

describe("CartWidget", () => {
  it.todo("shows the amount of producs in the cart");

  it("navigates to cart summary page on click", () => {
    const { history, getByRole } = renderWithRouter(() => <CartWidget />);
    fireEvent.click(getByRole("link"));

    expect(history.location.pathname).toEqual("/cart");
  });

  it("shows the correct amount of producs in the cart", () => {
    const stubCartHook = () => ({
      products: [
        {
          name: "Product foo",
          price: 0,
          image: "image.png",
        },
      ],
    });

    const { container } = renderWithRouter(() => (
      <CartWidget useCartHook={stubCartHook} />
    ));

    expect(container.innerHTML).toMatch("1");
  });
});
