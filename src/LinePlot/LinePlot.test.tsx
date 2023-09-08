import LinePlot from ".";
import React from "react";
import { render } from "@testing-library/react";

// default arguments for the LinePlot component
const defaultArgs = {
  markers: false,
  showTitle: false,
  title: "",
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

  // test title in component if showTitle is true
  test("Renders title if showTitle is true", () => {
    const { getByText } = render(
      <LinePlot {...defaultArgs} showTitle title="Dialog Title" />
    );
    expect(getByText("Dialog Title")).toBeInTheDocument();
  });
});
