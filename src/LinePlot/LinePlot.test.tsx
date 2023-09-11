import LinePlot from "./LinePlot";
import React from "react";
import { render } from "@testing-library/react";

// default arguments for the LinePlot component
const defaultArgs = {
  xdata: [],
  xlabel: "",
  ydata: [],
  ylabel: ""
};

// tests for the LinePlot component
describe("LinePlot", () => {
  // test to check the component renders
  test("Renders LinePlot", () => {
    render(<LinePlot {...defaultArgs} />);
  });

  // dont show title in component if showTitle is false
  test("Does not render title if showTitle is false", () => {
    const { queryByText } = render(
      <LinePlot {...defaultArgs} title="Dialog Title" />
    );
    expect(queryByText("Dialog Title")).not.toBeInTheDocument();
  });
  // test x-axis label in component
  test("Renders x-axis label", () => {
    const { getByText } = render(
      <LinePlot {...defaultArgs} xlabel="x-axis label" />
    );
    expect(getByText("x-axis label")).toBeInTheDocument();
  });

  // test y-axis label in component
  test("Renders y-axis label", () => {
    const { getByText } = render(
      <LinePlot {...defaultArgs} ylabel="y-axis label" />
    );
    expect(getByText("y-axis label")).toBeInTheDocument();
  });
});
