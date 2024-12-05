import * as React from "react";

import { render, screen } from "@testing-library/react";
import statuses, { statusTypes } from "../statuses";

import StatusLabel from "./StatusLabel";
import { expect } from "vitest";

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
  test("can render icon and label with custom gap", () => {
    // render component
    render(<StatusLabel status={"passed"} gap={2} />);

    // get component and the properties of interest
    const component = screen.getByTestId("status-label");
    const style = getComputedStyle(component);

    // check properties match expectations
    expect(style.gap).toBe("16px");
  });
  test("can render label with custom color", () => {
    // render component
    render(<StatusLabel status={"passed"} color={"rgb(255,171,186)"} />);

    // get component and the properties of interest
    const component = screen.queryByText("Passed");
    // error if component not found
    if (!component) {
      throw new Error("couldn't locate component");
    }
    const style = getComputedStyle(component);

    // check properties match expectations
    expect(style.color).toBe("rgb(255, 171, 186)");
  });
});
