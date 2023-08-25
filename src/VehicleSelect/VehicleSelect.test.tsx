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

    // expect the onVehicleChange callback to be called first time
    expect(onVehicleChange).toHaveBeenCalledTimes(1);

    // expect the onVehicleChange callback to be called wih expected value
    expect(onVehicleChange).toHaveBeenCalledWith([
      {
        _id: "",
        gate: "",
        modelYear: "",
        project: "911",
        variant: ""
      }
    ]);

    // open the model year selector
    await userEvent.click(
      screen.getByRole("combobox", { name: /model year/i })
    );
    // click the first option
    await userEvent.click(screen.getByRole("option", { name: /2015/i }));

    // expect the onVehicleChange callback to be called second time
    expect(onVehicleChange).toHaveBeenCalledTimes(2);

    // expect the onVehicleChange callback to be called with expected value
    expect(onVehicleChange).toHaveBeenCalledWith([
      {
        _id: "",
        gate: "",
        modelYear: "2015",
        project: "911",
        variant: ""
      }
    ]);

    // open the vehicle variant selector
    await userEvent.click(
      screen.getByRole("combobox", {
        name: /vehicle variant/i
      })
    );
    // click the first option
    await userEvent.click(screen.getByRole("option", { name: /JS/i }));

    // expect the onVehicleChange callback to be called third time
    expect(onVehicleChange).toHaveBeenCalledTimes(3);

    // expect the onVehicleChange callback to be called with expected value
    expect(onVehicleChange).toHaveBeenCalledWith([
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "",
        modelYear: "2015",
        project: "911",
        variant: "JS"
      }
    ]);

    // open the vehicle variant selector
    await userEvent.click(
      screen.getByRole("combobox", {
        name: /vehicle variant/i
      })
    );
    // click the second option
    await userEvent.click(screen.getByRole("option", { name: /MP/i }));

    // expect the onVehicleChange callback to be called fourth time
    expect(onVehicleChange).toHaveBeenCalledTimes(4);

    // expect the onVehicleChange callback to be called with the expected value
    expect(onVehicleChange).toHaveBeenCalledWith([
      {
        _id: "64c8c4cccc8d6f00130b366b",
        gate: "",
        modelYear: "2015",
        project: "911",
        variant: "MP"
      },
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "",
        modelYear: "2015",
        project: "911",
        variant: "JS"
      }
    ]);

    // open the gate selector
    await userEvent.click(
      screen.getByRole("combobox", {
        name: /gate/i
      })
    );
    // click the first option
    await userEvent.click(screen.getByRole("option", { name: /Gate 1/i }));

    // expect the onVehicleChange callback to be called fifth time
    expect(onVehicleChange).toHaveBeenCalledTimes(5);

    // expect the onVehicleChange callback to be called with the expected value
    expect(onVehicleChange).toHaveBeenCalledWith([
      {
        _id: "64c8c4cccc8d6f00130b366b",
        gate: "Gate 1",
        modelYear: "2015",
        project: "911",
        variant: "MP"
      },
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "Gate 1",
        modelYear: "2015",
        project: "911",
        variant: "JS"
      }
    ]);

    // open the gate selector
    await userEvent.click(
      screen.getByRole("combobox", {
        name: /gate/i
      })
    );
    // click the second option
    await userEvent.click(screen.getByRole("option", { name: /Gate 2/i }));

    // expect the onVehicleChange callback to be called sixth time
    expect(onVehicleChange).toHaveBeenCalledTimes(6);

    // expect the onVehicleChange callback to be called with the expected value
    expect(onVehicleChange).toHaveBeenCalledWith([
      {
        _id: "64c8c4cccc8d6f00130b366b",
        gate: "Gate 1",
        modelYear: "2015",
        project: "911",
        variant: "MP"
      },
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "Gate 1",
        modelYear: "2015",
        project: "911",
        variant: "JS"
      },
      {
        _id: "64c8c4cccc8d6f00130b366b",
        gate: "Gate 2",
        modelYear: "2015",
        project: "911",
        variant: "MP"
      },
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "Gate 2",
        modelYear: "2015",
        project: "911",
        variant: "JS"
      }
    ]);
  });

  it("Called with selectedVehicles", () => {
    // selected vehicles example
    const selectedVehicles = [
      {
        _id: "64c8c4cccc8d6f00130b367e",
        gate: "Gate 1",
        modelYear: "2015",
        project: "911",
        variant: "MP"
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
        name: /MP/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /gate 1/i })).toBeInTheDocument();
  });
});
