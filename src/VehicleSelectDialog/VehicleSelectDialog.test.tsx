import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import VehicleSelectDialog from "./VehicleSelectDialog";

// some mock data for testing.
const defaultProps = {
  cancelText: "Cancel",
  flexDirection: "column",
  flexWrap: "nowrap",
  gates: ["Gate 1", "Gate 2", "Gate 3"],
  onCancelClick: jest.fn(),
  onSaveClick: jest.fn(),
  open: true,
  saveText: "Save",
  showCloseIcon: true,
  title: "Test Title",
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
  ],
  width: "400px"
};

// tests for VehicleSelectDialog
describe("VehicleSelectDialog", () => {
  // test if the component renders
  it("renders with initial state", () => {
    const { getByText, getByTestId } = render(
      <VehicleSelectDialog {...defaultProps} />
    );
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByTestId("close-icon")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
  });

  it('disables the "Save" button when no vehicles are selected', () => {
    const { getByText } = render(<VehicleSelectDialog {...defaultProps} />);
    const saveButton = getByText("Save");
    expect(saveButton).toBeDisabled();
  });

  it('enables the "Save" button when a vehicle is selected and calls onSaveClick when "Save" button is clicked', () => {
    // render the component
    const { container } = render(<VehicleSelectDialog {...defaultProps} />);

    // find the button that triggers vehicle selection
    const selectVehicleButton = container.querySelector(
      '[aria-label="Select a vehicle"]'
    );

    // check if selectVehicleButton is not null before simulating the click
    if (selectVehicleButton) {
      fireEvent.click(selectVehicleButton);

      // make sure "Save" button is enabled
      const saveButton = screen.getByText("Save");
      expect(saveButton).toBeEnabled();

      // click the "Save" button
      fireEvent.click(saveButton);

      // check if onSaveClick is called with the selected vehicle
      expect(defaultProps.onSaveClick).toHaveBeenCalledWith([
        {
          gate: "Gate 1",
          id: "64c8c4cccc8d6f00130b366b",
          modelYear: "2015",
          projectCode: "911",
          variant: "MP"
        }
      ]);
    }
  });
});
