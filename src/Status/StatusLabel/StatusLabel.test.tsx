import * as React from "react";

import statuses, { statusTypes } from "../statuses";

import StatusLabel from "./StatusLabel";
import { render } from "@testing-library/react";

describe("StatusLabel", () => {
  test.each(statusTypes)("renders correct icon %s", statusType => {
    // render component
    const { container } = render(<StatusLabel status={statusType} />);

    // render raw icon
    const Icon = statuses[statusType].icon.type;
    const { container: iconContainer } = render(<Icon />);

    // MUI should render the icon name in the data-testid attribute
    expect(
      container.querySelector("svg")?.getAttribute("data-testid")
    ).not.toBeUndefined();

    // expect the icon to be the same as the raw icon
    expect(container.querySelector("svg")?.getAttribute("data-testid")).toEqual(
      iconContainer.querySelector("svg")?.getAttribute("data-testid")
    );
  });
});
