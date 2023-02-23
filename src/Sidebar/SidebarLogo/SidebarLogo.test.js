import { render, screen } from "@testing-library/react";

import React from "react";
import SidebarLogo from "./";

describe("SidebarLogo", () => {
  it("display logo", () => {
    render(<SidebarLogo />);
    const logoElement = screen.getByTestId("sidebar-logo");
    expect(logoElement).toBeInTheDocument();
  });
});
