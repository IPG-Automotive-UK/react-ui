import React from "react";
import VehicleSelect from "./VehicleSelect";
import { render } from "@testing-library/react";

/**
 * Tests
 */
describe("Select", () => {
  test("renders without crashing", () => {
    const { getByText } = render(
      <VehicleSelect allGates={[]} allVehicles={[]} />
    );
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
