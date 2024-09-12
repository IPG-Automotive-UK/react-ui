import { render, screen } from "@testing-library/react";

import React from "react";
import StatusCard from "./StatusCard";
import statuses from "../statuses";

describe("StatusCard", () => {
  test("renders card with status and name", () => {
    // data to render
    const status = "passed";
    const name = "John Doe";

    // render the component
    render(<StatusCard status={status} name={name} />);

    // find the status element using getByText with a regex pattern
    const statusElement = screen.getByText(new RegExp(status, "i"));
    const nameElement = screen.getByText(name);

    // expect the status and name to be in the document
    expect(statusElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });

  test.each(["passed", "failed", "not-run", "pending", "no-metrics"] as const)(
    "renders correct icon for %s",
    status => {
      // render component
      const { container } = render(<StatusCard status={status} name="Test" />);

      // render raw icon
      const Icon = statuses[status].icon.type;
      const { container: iconContainer } = render(<Icon />);

      // MUI should render the icon name in the data-testid attribute
      expect(
        container.querySelector("svg")?.getAttribute("data-testid")
      ).not.toBeUndefined();

      // expect the icon to be the same as the raw icon
      expect(
        container.querySelector("svg")?.getAttribute("data-testid")
      ).toEqual(
        iconContainer.querySelector("svg")?.getAttribute("data-testid")
      );
    }
  );

  test("renders titleVariant prop", () => {
    // data to render
    const status = "passed";
    const name = "Test title";
    const titleVariant = "h6";

    // render the component
    render(
      <StatusCard status={status} name={name} titleVariant={titleVariant} />
    );

    // find the title element
    const titleElement = screen.getByText(name);

    // expect the titleElement has font size of h6
    expect(titleElement).toHaveStyle("font-size: 1.25rem");
  });
});
