import { render, screen } from "@testing-library/react";

import React from "react";
import SidebarDivider from ".";

describe("SidebarDivider", () => {
  it("display current year", () => {
    render(<SidebarDivider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
