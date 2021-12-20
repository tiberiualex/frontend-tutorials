import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import { renderWithRouterAndContext } from "../test-utils";

describe("App", () => {
  test("renders app", () => {
    const { container } = renderWithRouterAndContext(<App />);
    expect(container.innerHTML).toMatch("App");
  });

  test("matches snapshot", () => {
    const { container } = renderWithRouterAndContext(<App />);
    expect(container).toMatchSnapshot();
  });
});
