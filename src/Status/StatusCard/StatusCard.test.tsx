import { render, screen } from "@testing-library/react";

import React from "react";
import StatusCard from "./StatusCard";

describe("StatusCard", () => {
  test("renders card with status and name", () => {
    // data to render
    const status = "completed";
    const name = "John Doe";

    // render the component
    render(<StatusCard status={status} name={name} />);

    const statusElement = screen.getByText(status);
    const nameElement = screen.getByText(name);

    // expect the status and name to be in the document
    expect(statusElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });
});
