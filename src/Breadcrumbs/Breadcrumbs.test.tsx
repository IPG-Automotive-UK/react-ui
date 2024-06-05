import { Link, Typography } from "@mui/material";

import Breadcrumbs from "./Breadcrumbs";
import React from "react";
import { render } from "@testing-library/react";

/**
 * Tests
 */
describe("Breadcrumbs", () => {
  test("displays children with separators between ", () => {
    const { container } = render(
      <Breadcrumbs>
        <Link href="">Home</Link>
        <Link href="">Garden</Link>
        <Typography>Shops</Typography>
      </Breadcrumbs>
    );
    const separators = container.querySelectorAll(".MuiBreadcrumbs-separator");

    expect(separators).toHaveLength(2);
  });
});
