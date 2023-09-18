import React, { Suspense, lazy } from "react";

import { render } from "@testing-library/react";

// default arguments for the LinePlot component
const defaultArgs = {
  xdata: [],
  xlabel: "",
  ydata: [],
  ylabel: ""
};

// lazy load LinePlot component
const LazyLinePlot = lazy(() => import("./LinePlot"));

// tests for the LinePlot component
describe("LinePlot", () => {
  // test to check the component renders
  test("Renders LinePlot", () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLinePlot {...defaultArgs} />{" "}
      </Suspense>
    );
  });
});
