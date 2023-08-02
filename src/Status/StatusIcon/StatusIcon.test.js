import * as React from "react";

import statuses, { statusTypes } from "../statuses";

import StatusIcon from "./StatusIcon";
import { render } from "@testing-library/react";

describe("StatusIcon", () => {
  test.each(statusTypes)("renders correct icon for %s", statusType => {
    const { container } = render(<StatusIcon status={statusType} />);
    // confirm that the svg icon has the same name as we expect
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-testid",
      statuses[statusType].icon.type.name
    );
  });
});
