import React, { lazy } from "react";

import { render } from "@testing-library/react";

const Plotly = lazy(() => import("./LinePlot"));

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
    render(<Plotly {...defaultArgs} />);
  });

  // dont show title in component if showTitle is false
  test("Does not render title if showTitle is false", () => {
    const { queryByText } = render(
      <Plotly {...defaultArgs} title="Dialog Title" />
    );
    expect(queryByText("Dialog Title")).not.toBeInTheDocument();
  });
  // test x-axis label in component
  test("Renders x-axis label", () => {
    const { getByText } = render(
      <Plotly {...defaultArgs} xlabel="x-axis label" />
    );
    expect(getByText("x-axis label")).toBeInTheDocument();
  });

  // test y-axis label in component
  test("Renders y-axis label", () => {
    const { getByText } = render(
      <Plotly {...defaultArgs} ylabel="y-axis label" />
    );
    expect(getByText("y-axis label")).toBeInTheDocument();
  });
});
