import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import RoadLabel from "./RoadLabel";

describe("IconWithLabel tests", () => {
  test("renders `IconWithLabel` with a href", () => {
    render(<RoadLabel label="My Road" href={"https://example.com"} />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const roadIconElement = screen.getByTestId("road-outlined-icon");
    const anchorElement = screen.getByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("My Road");
    expect(roadIconElement).toBeInTheDocument();
    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveAttribute("href", "https://example.com");
  });
  test("renders `IconWithLabel` without an href", () => {
    render(<RoadLabel label="My Road" />);

    // find the elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const anchorElement = screen.queryByRole("link");
    const roadIconElement = screen.getByTestId("road-outlined-icon");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent("My Road");
    expect(anchorElement).not.toBeInTheDocument();
    expect(roadIconElement).toBeInTheDocument();
  });
});
