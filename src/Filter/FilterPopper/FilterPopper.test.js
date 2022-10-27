import * as React from "react";

import { render, screen } from "@testing-library/react";

import FilterPopper from "./FilterPopper";
import userEvent from "@testing-library/user-event";

// Tests
describe("FilterPopper", () => {
  it("opens popper with children", async () => {
    render(<FilterPopper>Child text</FilterPopper>);

    // check that popper is closed
    expect(screen.queryByText("Child text")).not.toBeInTheDocument();

    // click the label selector down arrow
    await userEvent.click(screen.getByRole("button"));

    // check that the options are rendered
    expect(screen.getByText("Child text")).toBeInTheDocument();
  });
});
