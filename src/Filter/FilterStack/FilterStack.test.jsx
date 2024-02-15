import * as React from "react";

import { render, screen } from "@testing-library/react";

import FilterStack from "./FilterStack";

// Tests
describe("FilterStack", () => {
  it("hides clear button when no count", () => {
    render(<FilterStack count={0} />);

    // check that the clear button is not rendered
    expect(
      screen.queryByRole("button", { name: /clear/i })
    ).not.toBeInTheDocument();
  });
  it("shows clear button when count", () => {
    render(<FilterStack count={1} />);

    // check that the clear button is rendered
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });
});
