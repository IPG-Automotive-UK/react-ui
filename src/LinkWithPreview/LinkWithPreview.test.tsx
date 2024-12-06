import { LinkWithPreview, RoadPreview } from ".";
import { render, screen } from "@testing-library/react";

import React from "react";

// tests for the RoadPreview component
describe("RoadPreview", () => {
  // test to check the component renders
  test("renders", () => {
    render(
      <LinkWithPreview
        href="https://example.com"
        content={<h1>Hello World!</h1>}
      >
        My Link
      </LinkWithPreview>
    );

    const 
  });
});
