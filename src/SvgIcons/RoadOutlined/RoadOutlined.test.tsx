import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import RoadOutlined from "./RoadOutlined";

describe("IconWithLabel tests", () => {
  test("renders `RoadOutlined` with no props passed", () => {
    render(<RoadOutlined />);

    // find the elements of interest
    const roadIconElement = screen.getByTestId("road-outlined-icon");

    // check if elements captured match expectations
    expect(roadIconElement).toBeInTheDocument();
  });
  test("renders `RoadOutlined` with custom sx props", () => {
    render(<RoadOutlined sx={{ height: 25, width: 25 }} />);

    // find the elements of interest
    const roadIconElement = screen.getByTestId("road-outlined-icon");
    const style = window.getComputedStyle(roadIconElement);

    // check if elements captured match expectations
    expect(roadIconElement).toBeInTheDocument();
    expect(style.height).toBe("25px");
    expect(style.width).toBe("25px");
  });
});
