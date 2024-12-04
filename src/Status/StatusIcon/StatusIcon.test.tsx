import React, { act } from "react";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import statuses, { statusTypes } from "../statuses";

import StatusIcon from "./StatusIcon";
import userEvent from "@testing-library/user-event";

describe("StatusIcon", () => {
  test.each(statusTypes)("renders correct icon for %s", statusType => {
    // render component
    const { container } = render(<StatusIcon status={statusType} />);

    // render raw icon
    const Icon = statuses[statusType].icon.type;
    const { container: iconContainer } = render(<Icon />);

    // MUI should render the icon name in the data-testid attribute
    expect(
      container.querySelector("svg")?.getAttribute("data-testid")
    ).not.toBeUndefined();

    console.log(
      iconContainer.querySelector("svg")?.getAttribute("data-testid")
    );
    // expect the icon to be the same as the raw icon
    expect(container.querySelector("svg")?.getAttribute("data-testid")).toEqual(
      iconContainer.querySelector("svg")?.getAttribute("data-testid")
    );
  });

  // renders tooltip on hover of an Icon
  test("renders tooltip on hover", async () => {
    render(
      <StatusIcon
        status={"disrupted"}
        iconTooltipText={"This a tooltip title"}
      />
    );

    // trigger hover on the Icon
    await act(async () => {
      await userEvent.hover(screen.getByTestId("ErrorIcon"));
    });

    // wait for the tooltip to be visible
    await waitFor(() => {
      expect(
        screen.getByRole("tooltip", {
          hidden: true,
          name: "This a tooltip title"
        })
      ).toBeVisible();
    });
  });

  // test that the tooltip is not rendered when title is not passed
  test("does not render tooltip when description is not passed", () => {
    render(<StatusIcon status={"disrupted"} />);

    // there shouldn't be a tooltip
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  // test icon can be rendered with custom padding
  test("`StatusIcon` renders with custom padding", () => {
    render(<StatusIcon status="disrupted" padding={1} />);

    const icon = screen.getByTestId("ErrorIcon");
    const iconStyle = getComputedStyle(icon);

    expect(icon).toBeInTheDocument();
    expect(iconStyle.padding).toBe("8px");
  });
});
