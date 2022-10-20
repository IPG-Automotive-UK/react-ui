import * as React from "react";

import { render, screen } from "@testing-library/react";
import statuses, { statusTypes } from "../statuses";

import StatusLabel from "./StatusLabel";

describe("StatusLabel", () => {
  test.each(statusTypes)("renders correct text and icon %s", statusType => {
    const { container } = render(<StatusLabel status={statusType} />);
    // check text is correct
    expect(screen.getByText(statuses[statusType].label.text)).toBeTruthy();
    // check icon is correct
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-testid",
      statuses[statusType].icon.type.name
    );
  });
});
