import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import UploaderHeader from "./UploaderHeader";

/**
 * Tests for UploaderHeader component
 */
describe("UploaderHeader", () => {
  test("renders", () => {
    render(
      <UploaderHeader
        required={true}
        showDelete={true}
        subText="Please upload your file to continue"
        title="CarMaker"
      />
    );
    expect(
      screen.getByText("Please upload your file to continue")
    ).toBeInTheDocument();
  });
});
