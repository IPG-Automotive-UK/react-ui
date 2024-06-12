import { expect, vi } from "vitest";

import Infographic from "./Infographic";
import React from "react";
import VersionChip from "../../VersionChip";
import { render } from "@testing-library/react";

/**
 * Tests
 */
describe("ImageCard", () => {
  // test that Image card renders with image
  it("renders image", () => {
    render(<Infographic media="https://picsum.photos/336/190" />);
    expect(screen.getByRole()).toBeInTheDocument();
  });
});
