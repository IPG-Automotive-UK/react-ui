import * as React from "react";

import statuses, { statusTypes } from "../statuses";

import StatusLabel from "./StatusLabel";
import { render } from "@testing-library/react";

describe("StatusLabel", () => {
  test.each(statusTypes)("renders correct icon %s", statusType => {
    const { container } = render(<StatusLabel status={statusType} />);
    // check icon is correct
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-testid",
      statuses[statusType].icon.type.name
    );
  });
});
