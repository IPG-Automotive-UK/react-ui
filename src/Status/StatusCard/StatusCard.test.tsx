import { render, screen } from "@testing-library/react";

import React from "react";
import StatusCard from "./StatusCard";
import { SvgIconComponent } from "@mui/icons-material";
import statuses from "../statuses";

interface CustomIcon extends SvgIconComponent {
  name?: string;
}

describe("StatusCard", () => {
  test("renders card with status and name", () => {
    // data to render
    const status = "Passed";
    const name = "John Doe";

    // render the component
    render(<StatusCard status={status} name={name} />);

    const statusElement = screen.getByText(status);
    const nameElement = screen.getByText(name);

    // expect the status and name to be in the document
    expect(statusElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });

  const allStatuses: Array<"Passed" | "Failed" | "Pending" | "Not Run"> = [
    "Passed",
    "Failed",
    "Not Run",
    "Pending"
  ];

  test.each(allStatuses)("renders correct icon for %s", status => {
    const { container } = render(<StatusCard status={status} name={"Test"} />);
    // confirm that the svg icon has the same name as we expect
    const iconName = (statuses[status].icon.type as CustomIcon).name;
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-testid",
      iconName
    );
  });
});
