import React, { useState } from "react";
import { Vehicle, VehicleSelectorProps } from "./VehicleSelector.types";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

import VehicleSelector from "./VehicleSelector";
import { vi } from "vitest";

// A simple wrapper to maintain state for testing purposes.
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
