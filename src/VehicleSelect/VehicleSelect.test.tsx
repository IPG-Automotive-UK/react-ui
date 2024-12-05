import { render, screen } from "@testing-library/react";

import React from "react";
import VehicleSelect from "./VehicleSelect";
import { VehicleSelectProps } from "./VehicleSelect.types";

// default props
const defaultProps = {
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
  ]
};

/**
 * Test wrapper for VehicleSelect
 */

const VehicleSelectWithState = ({
  onChange,
  value: valueIn = [],
  flexDirection = "column",
  flexWrap = "nowrap",
  ...rest
}: VehicleSelectProps) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange: VehicleSelectProps["onChange"] = selectedValues => {
    setValue(selectedValues);
    onChange(selectedValues);
  };
  return (
    <VehicleSelect
      {...rest}
      onChange={handleChange}
      value={value}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
    />
  );
};

/**
 * Tests
 */
describe("Vehicle Select", () => {
  // test that the component renders with the default props
  it("renders component", () => {
    render(<VehicleSelectWithState {...defaultProps} />);
  });

  // test that the component renders with the expected value when fully populated
  it("Called with fully populated value", () => {
    // selected vehicles example
    const value = [
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "Gate 1",
        modelYear: "2015",
        projectCode: "911",
        variant: "MP"
      }
    ];
    render(<VehicleSelectWithState {...defaultProps} value={value} />);
    expect(screen.getByRole("combobox", { name: /project code/i })).toHaveValue(
      "911"
    );
    expect(screen.getByRole("combobox", { name: /model year/i })).toHaveValue(
      "2015"
    );
    expect(
      screen.getByRole("button", {
        name: /MP/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /gate 1/i })).toBeInTheDocument();
  });

  // test that flex styles are applied
  it("has flex direction and flex wrap styles applied", () => {
    render(
      <VehicleSelectWithState
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

  // test that correct fields are disabled when value is empty - only project code should be enabled
  it("correct fields disabled when value is empty", () => {
    render(<VehicleSelectWithState {...defaultProps} value={[]} />);
    expect(
      screen.getByRole("combobox", { name: /project code/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("combobox", { name: /model year/i })
    ).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /Variant/i })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeDisabled();
  });

  // test that correct fields are disabled when variant is empty - gate should be disabled
  it("correct fields disabled when variant is empty", () => {
    render(
      <VehicleSelectWithState
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
    expect(screen.getByRole("combobox", { name: /Variant/i })).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeDisabled();
  });

  // test that correct fields are disabled when model year is empty - gate and variant should be disabled
  it("correct fields disabled when model year is empty", () => {
    render(
      <VehicleSelectWithState
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
    expect(screen.getByRole("combobox", { name: /Variant/i })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeDisabled();
  });

  // test that all fields are enabled when all fields are populated
  it("all fields enabled when all fields populated", () => {
    render(
      <VehicleSelectWithState
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
    expect(screen.getByRole("combobox", { name: /Variant/i })).toBeEnabled();
    expect(screen.getByRole("combobox", { name: /gate/i })).toBeEnabled();
  });
});
