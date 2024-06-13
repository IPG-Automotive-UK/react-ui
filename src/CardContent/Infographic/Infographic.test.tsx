import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Infographic from "./Infographic";
import React from "react";
import VersionChip from "../../VersionChip";

/**
 * Tests
 */
describe("Infographic", () => {
  // test that Image card renders with image
  it("has the img role if `media` is defined", () => {
    render(<Infographic media="https://picsum.photos/336/190" />);

    const infographic = screen.getByRole("img");
    expect(infographic).toBeInTheDocument();
  });

  it("render version chip if passed as a prop", () => {
    render(
      <Infographic
        media="https://picsum.photos/336/190"
        versionChip={<VersionChip version="1.0" versionType="major" />}
      />
    );
    expect(screen.getByText("1.0")).toBeInTheDocument();
  });
});
