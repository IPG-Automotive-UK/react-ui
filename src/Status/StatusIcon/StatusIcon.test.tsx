import * as React from "react";

import statuses, { statusTypes } from "../statuses";

import StatusIcon from "./StatusIcon";
import { SvgIconComponent } from "@mui/icons-material";
import { render } from "@testing-library/react";

interface CustomIcon extends SvgIconComponent {
  name?: string;
}

describe("StatusIcon", () => {
  test.each(statusTypes)("renders correct icon for %s", statusType => {
    const { container } = render(<StatusIcon status={statusType} />);
    // confirm that the svg icon has the same name as we expect
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-testid",
      (statuses[statusType].icon.type as CustomIcon).name
    );
  });
});
