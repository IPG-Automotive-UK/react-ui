import * as React from "react";

import { render, screen } from "@testing-library/react";
import statuses, { statusTypes } from "../statuses";

import StatusTypography from "./StatusTypography";

describe("StatusTypography", () => {
  test.each(statusTypes)("renders correct text for %s", statusType => {
    render(<StatusTypography status={statusType} />);
    expect(screen.getByText(statuses[statusType].label.text)).toBeTruthy();
  });
  test.each(statusTypes)("renders correct color for %s", statusType => {
    render(<StatusTypography status={statusType} />);
    expect(screen.getByText(statuses[statusType].label.text)).toHaveStyle({
      color: statuses[statusType].label.color
    });
  });
});
