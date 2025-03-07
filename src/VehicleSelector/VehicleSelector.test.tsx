import React, { useState } from "react";
import { Vehicle, VehicleSelectorProps } from "./VehicleSelector.types";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import {
  createVehicleRecord,
  filterVehicles,
  shouldAutoSelect
} from "./VehicleSelector.utils";

import VehicleSelector from "./VehicleSelector";
import userEvent from "@testing-library/user-event";

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
const VehicleSelectorWithState = (props: VehicleSelectorProps) => {
  const [value, setValue] = useState<Vehicle[]>(props.value || []);
  return (
    <VehicleSelector
      {...props}
      value={value}
      onChange={newValue => {
        setValue(newValue);
        if (props.onChange) props.onChange(newValue);
      }}
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

  it("shows error states on blur with no value", async () => {
    render(<VehicleSelectorWithState {...defaultProps} />);

    // Test the project code field errors
    const projectCodeInput = screen.getByRole("combobox", {
      name: /project code/i
    });

    await userEvent.click(projectCodeInput);
    await userEvent.tab();

    expect(projectCodeInput.closest("div")).toHaveClass("Mui-error");

    // Test the project code error is removed when a value is selected
    await userEvent.click(projectCodeInput);

    const option911 = await screen.findByRole("option", { name: "911" });
    await userEvent.click(option911);

    expect(projectCodeInput.closest("div")).not.toHaveClass("Mui-error");

    // Test the model year field errors
    const modelYearInput = screen.getByRole("combobox", {
      name: /model year/i
    });

    await userEvent.click(modelYearInput);
    await userEvent.tab();

    expect(modelYearInput.closest("div")).toHaveClass("Mui-error");

    // Test the model year error is removed when a value is selected
    await userEvent.click(modelYearInput);

    const option2016 = await screen.findByRole("option", { name: "2016" });
    await userEvent.click(option2016);

    expect(modelYearInput.closest("div")).not.toHaveClass("Mui-error");

    // Test the variant field errors

    const variantInput = screen.getByRole("combobox", {
      name: /variant/i
    });

    await userEvent.click(variantInput);
    await userEvent.tab();

    expect(variantInput.closest("div")).toHaveClass("Mui-error");

    // Test the variant error is removed when a value is selected
    await userEvent.click(variantInput);

    const optionMC = await screen.findByRole("option", { name: "MC" });
    await userEvent.click(optionMC);

    expect(variantInput.closest("div")).not.toHaveClass("Mui-error");

    // Test the gate field errors

    const gateInput = screen.getByRole("combobox", {
      name: /gate/i
    });

    await userEvent.click(gateInput);
    await userEvent.tab();

    expect(gateInput.closest("div")).toHaveClass("Mui-error");

    // Test the gate error is removed when a value is selected

    await userEvent.click(gateInput);

    const optionGate = await screen.findByRole("option", { name: "Gate 2" });
    await userEvent.click(optionGate);

    expect(gateInput.closest("div")).not.toHaveClass("Mui-error");
  });

  it("shows errors when passed externally", async () => {
    render(
      <VehicleSelectorWithState
        {...defaultProps}
        errors={["projectCode", "modelYear", "variant", "gate"]}
      />
    );

    // Test the project code field error is always visible when set externally
    const projectCodeInput = screen.getByRole("combobox", {
      name: /project code/i
    });

    expect(projectCodeInput.closest("div")).toHaveClass("Mui-error");

    await userEvent.click(projectCodeInput);

    const option911 = await screen.findByRole("option", { name: "911" });
    await userEvent.click(option911);

    expect(projectCodeInput.closest("div")).toHaveClass("Mui-error");

    // Test the model year field error is always visible when set externally
    const modelYearInput = screen.getByRole("combobox", {
      name: /model year/i
    });

    expect(modelYearInput.closest("div")).toHaveClass("Mui-error");

    await userEvent.click(modelYearInput);

    const option2016 = await screen.findByRole("option", { name: "2016" });
    await userEvent.click(option2016);

    expect(modelYearInput.closest("div")).toHaveClass("Mui-error");

    // Test the variant error is always visible when set externally

    const variantInput = screen.getByRole("combobox", {
      name: /variant/i
    });

    expect(variantInput.closest("div")).toHaveClass("Mui-error");

    await userEvent.click(variantInput);

    const optionMC = await screen.findByRole("option", { name: "MC" });
    await userEvent.click(optionMC);

    expect(variantInput.closest("div")).toHaveClass("Mui-error");

    // Test the gate field error is always visible when set externally

    const gateInput = screen.getByRole("combobox", {
      name: /gate/i
    });

    expect(gateInput.closest("div")).toHaveClass("Mui-error");

    await userEvent.click(gateInput);

    const optionGate = await screen.findByRole("option", { name: "Gate 2" });
    await userEvent.click(optionGate);

    expect(gateInput.closest("div")).toHaveClass("Mui-error");
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

  it("removes clear button when variant is deselected in single selection mode", async () => {
    const value = [
      {
        _id: "64c8c4cccc8d6f00130b366b",
        gate: "Gate 1",
        modelYear: "2015",
        projectCode: "911",
        variant: "NN"
      }
    ];

    render(
      <VehicleSelectorWithState
        {...defaultProps}
        value={value}
        multipleSelection={false}
      />
    );

    expect(screen.getByRole("combobox", { name: /variant/i })).toHaveValue(
      "NN"
    );

    const variantField = screen.getByRole("combobox", { name: /variant/i });
    const clearButton = variantField.parentElement?.querySelector(
      '[aria-label="Clear"]'
    );

    expect(clearButton).toBeInTheDocument();
    (clearButton as HTMLElement)?.click();

    await waitFor(() =>
      expect(
        variantField.parentElement?.querySelector('[aria-label="Clear"]')
      ).not.toBeInTheDocument()
    );

    expect(variantField).toHaveValue("");
  });

  it("filters model years based on selected project", async () => {
    render(<VehicleSelectorWithState {...defaultProps} />);

    const projectInput = screen.getByRole("combobox", {
      name: /project code/i
    });
    fireEvent.mouseDown(projectInput);
    fireEvent.click(screen.getByText("911"));

    const modelYearInput = screen.getByRole("combobox", {
      name: /model year/i
    });
    fireEvent.mouseDown(modelYearInput);

    await waitFor(() => {
      expect(screen.getByText("2015")).toBeInTheDocument();
      expect(screen.getByText("2016")).toBeInTheDocument();
    });
  });
});

describe("VehicleSelector utilities", () => {
  describe("createVehicleRecord", () => {
    it("should create a vehicle record with all provided values", () => {
      const record = createVehicleRecord({
        gate: "Gate 1",
        modelYear: "2015",
        projectCode: "911",
        variant: "NN"
      });
      expect(record).toEqual({
        _id: "",
        gate: "Gate 1",
        modelYear: "2015",
        projectCode: "911",
        variant: "NN"
      });
    });

    it("should default variant and gate to empty strings when not provided", () => {
      const record = createVehicleRecord({
        gate: "",
        modelYear: "2015",
        projectCode: "911",
        variant: ""
      });
      expect(record).toEqual({
        _id: "",
        gate: "",
        modelYear: "2015",
        projectCode: "911",
        variant: ""
      });
    });
  });

  describe("shouldAutoSelect", () => {
    it("returns true when selectedValue is empty, exactly one option is available, and userCleared is false", () => {
      expect(
        shouldAutoSelect({
          availableOptions: ["2015"],
          selectedValue: "",
          userCleared: false
        })
      ).toBe(true);
    });

    it("returns false when selectedValue is not empty", () => {
      expect(
        shouldAutoSelect({
          availableOptions: ["2015"],
          selectedValue: "2015",
          userCleared: false
        })
      ).toBe(false);
    });

    it("returns false when availableOptions length is not exactly 1", () => {
      expect(
        shouldAutoSelect({
          availableOptions: ["2015", "2016"],
          selectedValue: "",
          userCleared: false
        })
      ).toBe(false);
    });

    it("returns false when userCleared is true", () => {
      expect(
        shouldAutoSelect({
          availableOptions: ["2015"],
          selectedValue: "",
          userCleared: true
        })
      ).toBe(false);
    });
  });

  describe("filterVehicles", () => {
    const vehicles = [
      { _id: "1", modelYear: "2015", projectCode: "911", variant: "NN" },
      { _id: "2", modelYear: "2015", projectCode: "911", variant: "JS" },
      { _id: "3", modelYear: "2016", projectCode: "911", variant: "DB" },
      { _id: "4", modelYear: "2016", projectCode: "911", variant: "MC" },
      {
        _id: "5",
        modelYear: "2019",
        projectCode: "CrossoverEV",
        variant: "Option A"
      }
    ];

    it("filters vehicles by projectCode and modelYear", () => {
      const filtered = filterVehicles({
        modelYear: "2015",
        projectCode: "911",
        variants: vehicles
      });
      expect(filtered).toEqual([
        { _id: "1", modelYear: "2015", projectCode: "911", variant: "NN" },
        { _id: "2", modelYear: "2015", projectCode: "911", variant: "JS" }
      ]);
    });

    it("filters vehicles by projectCode, modelYear, and variant", () => {
      const filtered = filterVehicles({
        modelYear: "2015",
        projectCode: "911",
        variant: "NN",
        variants: vehicles
      });
      expect(filtered).toEqual([
        { _id: "1", modelYear: "2015", projectCode: "911", variant: "NN" }
      ]);
    });

    it("returns an empty array when no vehicles match the criteria", () => {
      const filtered = filterVehicles({
        modelYear: "2015",
        projectCode: "911",
        variant: "NonExistent",
        variants: vehicles
      });
      expect(filtered).toEqual([]);
    });
  });
});

describe("VehicleSelector Auto-Selection", () => {
  // a variants dataset with only one model year and one variant for project 911
  const autoSelectVariants: VehicleSelectorProps["variants"] = [
    { _id: "1", modelYear: "2015", projectCode: "911", variant: "NN" }
  ];

  const autoSelectProps: VehicleSelectorProps = {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: [],
    onChange: () => {},
    value: [],
    variants: autoSelectVariants
  };

  it("auto-selects model year and variant when project code is selected", async () => {
    const handleChange = vi.fn();

    await act(async () => {
      render(
        <VehicleSelectorWithState
          {...autoSelectProps}
          onChange={handleChange}
        />
      );
      await Promise.resolve();
    });

    // open the Project Code dropdown
    const projectInput = screen.getByRole("combobox", {
      name: /project code/i
    });
    await act(async () => {
      fireEvent.mouseDown(projectInput);
      await Promise.resolve();
    });
    // wait for the option 911 to appear and click it
    const option911 = await screen.findByRole("option", { name: "911" });
    await act(async () => {
      fireEvent.click(option911);
      await Promise.resolve();
    });

    // wait for auto selection to occur
    await waitFor(() => {
      const modelYearInput = screen.getByRole("combobox", {
        name: /model year/i
      });
      expect(modelYearInput).toHaveValue("2015");
    });
    await waitFor(() => {
      const variantInput = screen.getByRole("combobox", { name: /variant/i });
      expect(variantInput).toHaveValue("NN");
    });
  });
});

describe("VehicleSelector Auto-Selection Additional Scenarios", () => {
  it("auto-selects model year only when there is a single model year but multiple variants", async () => {
    // for project 911 one model year 2015 but two variant options
    const variantsMultipleVariants: VehicleSelectorProps["variants"] = [
      { _id: "1", modelYear: "2015", projectCode: "911", variant: "NN" },
      { _id: "2", modelYear: "2015", projectCode: "911", variant: "JS" }
    ];
    const props: VehicleSelectorProps = {
      flexDirection: "column",
      flexWrap: "nowrap",
      gates: [],
      onChange: () => {},
      value: [],
      variants: variantsMultipleVariants
    };

    const handleChange = vi.fn();
    await act(async () => {
      render(<VehicleSelectorWithState {...props} onChange={handleChange} />);
      await Promise.resolve();
    });

    // open the Project Code dropdown and select 911
    const projectInput = screen.getByRole("combobox", {
      name: /project code/i
    });
    await act(async () => {
      fireEvent.mouseDown(projectInput);
      await Promise.resolve();
    });
    const option911 = await screen.findByRole("option", { name: "911" });
    await act(async () => {
      fireEvent.click(option911);
      await Promise.resolve();
    });

    // wait for auto selection: model year should auto-select 2015 because its the only option
    // variant should remain empty since there are multiple variant options.
    await waitFor(() => {
      const modelYearInput = screen.getByRole("combobox", {
        name: /model year/i
      });
      expect(modelYearInput).toHaveValue("2015");
    });
    await waitFor(() => {
      const variantInput = screen.getByRole("combobox", { name: /variant/i });
      expect(variantInput).toHaveValue("");
    });
  });

  it("allows manual variant selection when two model years exist and one model year has multiple variants", async () => {
    // For project "911", provide two model years:
    // - "2015" with one variant ("NN").
    // - "2016" with two variants ("DB" and "MC").
    const variantsMixed: VehicleSelectorProps["variants"] = [
      { _id: "1", modelYear: "2015", projectCode: "911", variant: "NN" },
      { _id: "2", modelYear: "2016", projectCode: "911", variant: "DB" },
      { _id: "3", modelYear: "2016", projectCode: "911", variant: "MC" }
    ];
    const props: VehicleSelectorProps = {
      flexDirection: "column",
      flexWrap: "nowrap",
      gates: [],
      onChange: () => {},
      value: [],
      variants: variantsMixed
    };

    const handleChange = vi.fn();
    await act(async () => {
      render(<VehicleSelectorWithState {...props} onChange={handleChange} />);
      await Promise.resolve();
    });

    // Open the Project Code dropdown and select "911".
    const projectInput = screen.getByRole("combobox", {
      name: /project code/i
    });
    await act(async () => {
      fireEvent.mouseDown(projectInput);
      await Promise.resolve();
    });
    const option911 = await screen.findByRole("option", { name: "911" });
    await act(async () => {
      fireEvent.click(option911);
      await Promise.resolve();
    });

    // manually select model year "2016".
    const modelYearInput = screen.getByRole("combobox", {
      name: /model year/i
    });
    await act(async () => {
      fireEvent.mouseDown(modelYearInput);
      await Promise.resolve();
    });
    const option2016 = await screen.findByRole("option", { name: "2016" });
    await act(async () => {
      fireEvent.click(option2016);
      await Promise.resolve();
    });
    await waitFor(() => {
      expect(modelYearInput).toHaveValue("2016");
    });

    // For model year "2016", variant should not auto-select because there are two options.
    const variantInput = screen.getByRole("combobox", { name: /variant/i });
    await waitFor(() => {
      expect(variantInput).toHaveValue("");
    });

    // Now manually select variant "DB".
    await act(async () => {
      fireEvent.mouseDown(variantInput);
      await Promise.resolve();
    });
    const optionDB = await screen.findByRole("option", { name: "DB" });
    await act(async () => {
      fireEvent.click(optionDB);
      await Promise.resolve();
    });
    await waitFor(() => {
      expect(variantInput).toHaveValue("DB");
    });

    const lastCallArg =
      handleChange.mock.calls[handleChange.mock.calls.length - 1][0];
    expect(lastCallArg[0]).toMatchObject({
      modelYear: "2016",
      projectCode: "911",
      variant: "DB"
    });
  });
});

describe("VehicleSelector Gate Auto-Selection", () => {
  it("auto-selects gate when there is exactly one gate option", async () => {
    // Provide a single variant so both model year and variant auto-select can occur.
    const autoGateVariants: VehicleSelectorProps["variants"] = [
      { _id: "1", modelYear: "2015", projectCode: "911", variant: "NN" }
    ];
    // Set the gates prop to a single option.
    const autoGateProps: VehicleSelectorProps = {
      flexDirection: "column",
      flexWrap: "nowrap",
      gates: ["Gate 1"],
      onChange: () => {},
      value: [],
      variants: autoGateVariants
    };

    // Create a mock change handler to capture changes.
    const handleChange = vi.fn();
    await act(async () => {
      render(
        <VehicleSelectorWithState {...autoGateProps} onChange={handleChange} />
      );
      await Promise.resolve();
    });

    // Open the Project Code dropdown and select "911".
    const projectInput = screen.getByRole("combobox", {
      name: /project code/i
    });

    await act(async () => {
      fireEvent.mouseDown(projectInput);
      await Promise.resolve();
    });
    const option911 = await screen.findByRole("option", { name: "911" });
    await act(async () => {
      fireEvent.click(option911);
      await Promise.resolve();
    });

    // Wait for auto-selection of the model year.
    await waitFor(() => {
      const modelYearInput = screen.getByRole("combobox", {
        name: /model year/i
      });
      expect(modelYearInput).toHaveValue("2015");
    });

    // Wait for auto-selection of the variant.
    await waitFor(() => {
      const variantInput = screen.getByRole("combobox", { name: /variant/i });
      expect(variantInput).toHaveValue("NN");
    });

    // Finally, wait for auto-selection of the gate.
    await waitFor(() => {
      const gateInput = screen.getByRole("combobox", { name: /gate/i });
      expect(gateInput).toHaveValue("Gate 1");
    });
  });
});
