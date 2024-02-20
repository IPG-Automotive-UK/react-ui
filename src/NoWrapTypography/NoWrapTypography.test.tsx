import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";

import NoWrapTypography from "./NoWrapTypography";
import React from "react";

describe("NoWrapTypography", () => {
  test("can pass 'sx' prop", () => {
    render(
      <NoWrapTypography sx={{ color: "red" }}>Some text</NoWrapTypography>
    );
    expect(screen.getByText("Some text")).toHaveStyle("color: rgb(255, 0, 0)");
  });
});
