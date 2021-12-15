import React from "react";
import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  it("should render correctly", () => {
    const { container } = render(<Loader />);

    expect(container.innerHTML).toMatch("Loading");
  });
});
