import { render, screen } from "@testing-library/react";

import React from "react";
import VehicleSelect from "./VehicleSelect";
import { VehicleSelectProps } from "./VehicleSelect.types";
import userEvent from "@testing-library/user-event";

// default props
const defaultProps = {
  allGates: ["Gate 1", "Gate 2", "Gate 3"],
  allVehicles: [
    {
      _id: "64c8c4cccc8d6f00130b366b",
      modelYear: "2015",
      projectCode: "911",
      variant: "MP"
    },
    {
      _id: "64c8c4cccc8d6f00130b367e",
      modelYear: "2015",
      projectCode: "911",
      variant: "JS"
    },
    {
      _id: "64c8c4cccc8d6f00130b3691",
      modelYear: "2016",
      projectCode: "911",
      variant: "DB"
    },
    {
      _id: "64c8c4cccc8d6f00130b36a4",
      modelYear: "2016",
      projectCode: "911",
      variant: "MC"
    }
  ],
  onVehicleChange: () => {},
  selectedVehicles: []
};

/**
 * Test wrapper for VehicleSelect
 */

const VehicleSelectWithState = ({
  onVehicleChange,
  selectedVehicles: valueIn = [],
  ...rest
}: VehicleSelectProps) => {
  const [value, setValue] = React.useState(valueIn);

  const handleChange = selectedValues => {
    setValue(selectedValues);
    onVehicleChange(selectedValues);
  };
  return (
    <VehicleSelect
      {...rest}
      onVehicleChange={handleChange}
      selectedVehicles={value}
    />
  );
};

/**
 * Tests
 */
describe("Vehicle Select", () => {
  it("renders component", () => {
    render(<VehicleSelectWithState {...defaultProps} />);
  });
  it("onVehicleChange called", async () => {
    const onVehicleChange = jest.fn();
    render(
      <VehicleSelectWithState
        {...defaultProps}
        onVehicleChange={onVehicleChange}
      />
    );

    // open the project selector
    await userEvent.click(
      screen.getByRole("combobox", { name: /project code/i })
    );
    // click the first option
    await userEvent.click(screen.getByRole("option", { name: /911/i }));

    // open the model year selector
    await userEvent.click(
      screen.getByRole("combobox", { name: /model year/i })
    );
    // click the first option
    await userEvent.click(screen.getByRole("option", { name: /2015/i }));

    // open the vehicle variant selector
    await userEvent.click(
      screen.getByRole("combobox", {
        name: /vehicle variant/i
      })
    );
    // click the first option
    await userEvent.click(screen.getByRole("option", { name: /JS/i }));

    // open the vehicle variant selector
    await userEvent.click(
      screen.getByRole("combobox", {
        name: /vehicle variant/i
      })
    );
    // click the second option
    await userEvent.click(screen.getByRole("option", { name: /MP/i }));

    // open the gate selector
    await userEvent.click(
      screen.getByRole("combobox", {
        name: /gate/i
      })
    );
    // click the first option
    await userEvent.click(screen.getByRole("option", { name: /Gate 1/i }));

    // open the gate selector
    await userEvent.click(
      screen.getByRole("combobox", {
        name: /gate/i
      })
    );
    // click the second option
    await userEvent.click(screen.getByRole("option", { name: /Gate 2/i }));

    expect(onVehicleChange).toHaveBeenCalledTimes(6);
  });

  it("Called with selectedVehicles", () => {
    // selected vehicles example
    const selectedVehicles = [
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "Gate 1",
        modelYear: "2015",
        project: "911",
        variant: "mp"
      }
    ];
    render(
      <VehicleSelectWithState
        {...defaultProps}
        selectedVehicles={selectedVehicles}
      />
    );

    expect(screen.getByRole("combobox", { name: /project code/i })).toHaveValue(
      "911"
    );
    expect(screen.getByRole("combobox", { name: /model year/i })).toHaveValue(
      "2015"
    );
    expect(
      screen.getByRole("button", {
        name: /mp/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /gate 1/i })).toBeInTheDocument();
  });
});
