import React, { useState } from "react";
import { Vehicle, VehicleSelectorProps } from "./VehicleSelector.types";
import { render, screen } from "@testing-library/react";

import VehicleSelector from "./VehicleSelector";

// default props
const defaultProps: VehicleSelectorProps = {
  flexDirection: "column",
  flexWrap: "nowrap",
  gates: ["Gate 1", "Gate 2", "Gate 3"],
  onChange: () => {},
  value: [],
  variants: [
    {
      _id: "64c8c4cccc8d6f00130b366b",
      modelYear: "2015",
      projectCode: "911",
      variant: "NN"
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
  ]
};

// component with state for testing
const VehicleSelectorWithState = ({
  onChange,
  value: valueIn = [],
  flexDirection = "column",
  flexWrap = "nowrap",
  ...rest
}: VehicleSelectorProps) => {
  const [value, setValue] = useState<Vehicle[]>(valueIn);

  const handleChange = (selectedValues: Vehicle[]) => {
    setValue(selectedValues);
    onChange(selectedValues);
  };

  return (
    <VehicleSelector
      {...rest}
      onChange={handleChange}
      value={value}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
    />
  );
};

// tests for VehicleSelector
describe("VehicleSelector", () => {
  it("renders the component", () => {
    render(<VehicleSelectorWithState {...defaultProps} />);
    expect(screen.getByTestId("vehicle-select")).toBeInTheDocument();
  });

  it("renders correct value when fully populated", () => {
    const value = [
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "Gate 1",
        modelYear: "2015",
        projectCode: "911",
        variant: "JS"
      }
    ];
    render(<VehicleSelectorWithState {...defaultProps} value={value} />);

    expect(screen.getByRole("combobox", { name: /project code/i })).toHaveValue(
      "911"
    );
    expect(screen.getByRole("combobox", { name: /model year/i })).toHaveValue(
      "2015"
    );
    expect(screen.getByRole("combobox", { name: /variant/i })).toHaveValue(
      "JS"
    );

    expect(screen.getByRole("combobox", { name: /gate/i })).toHaveValue(
      "Gate 1"
    );
  });

  it("applies flex direction and wrap styles", () => {
    render(
      <VehicleSelectorWithState
        {...defaultProps}
        flexDirection="row"
        flexWrap="wrap"
      />
    );
    expect(screen.getByTestId("vehicle-select")).toHaveStyle({
      flexDirection: "row",
      flexWrap: "wrap"
    });
  });

  it("disables correct fields when value is empty", () => {
    render(<VehicleSelectorWithState {...defaultProps} value={[]} />);
    expect(
      screen.getByRole("combobox", { name: /project code/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("combobox", { name: /model year/i })
    ).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /variant/i })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeDisabled();
  });

  it("disables gate field when variant is empty", () => {
    render(
      <VehicleSelectorWithState
        {...defaultProps}
        value={[
          {
            _id: "64c8c4cccc8d6f00130b366b",
            gate: "",
            modelYear: "2015",
            projectCode: "911",
            variant: ""
          }
        ]}
      />
    );
    expect(
      screen.getByRole("combobox", { name: /project code/i })
    ).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /model year/i })).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /variant/i })).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeDisabled();
  });

  it("disables gate and variant when model year is empty", () => {
    render(
      <VehicleSelectorWithState
        {...defaultProps}
        value={[
          {
            _id: "64c8c4cccc8d6f00130b366b",
            gate: "",
            modelYear: "",
            projectCode: "911",
            variant: ""
          }
        ]}
      />
    );
    expect(
      screen.getByRole("combobox", { name: /project code/i })
    ).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /model year/i })).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /variant/i })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeDisabled();
  });

  it("enables all fields when fully populated", () => {
    render(
      <VehicleSelectorWithState
        {...defaultProps}
        value={[
          {
            _id: "64c8c4cccc8d6f00130b3691",
            gate: "Gate 1",
            modelYear: "2016",
            projectCode: "911",
            variant: "DB"
          }
        ]}
      />
    );
    expect(
      screen.getByRole("combobox", { name: /project code/i })
    ).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /model year/i })).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /variant/i })).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeEnabled();
  });

  it("allows multiple variant selection", () => {
    const value = [
      {
        _id: "64c8c4cccc8d6f00130b366b",
        gate: "Gate 1",
        modelYear: "2015",
        projectCode: "911",
        variant: "NN"
      },
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "Gate 2",
        modelYear: "2015",
        projectCode: "911",
        variant: "JS"
      }
    ];

    render(
      <VehicleSelectorWithState
        limitTags={2}
        {...defaultProps}
        value={value}
        multipleSelection={true}
      />
    );
    expect(screen.getByRole("button", { name: /NN/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /JS/i })).toBeInTheDocument();
  });

  it("disable all autocomplete when the disabled prop is true", () => {
    render(<VehicleSelectorWithState {...defaultProps} disabled={true} />);
    expect(
      screen.getByRole("combobox", { name: /project code/i })
    ).toBeDisabled();
    expect(
      screen.getByRole("combobox", { name: /model year/i })
    ).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /variant/i })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeDisabled();
  });
});
