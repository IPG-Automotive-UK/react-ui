import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import VehicleSelectDialog from "./VehicleSelectDialog";

// Define a mock function for onSaveClick
const mockOnSaveClick = jest.fn();

const selectedVehicles = [
  {
    _id: "64c8c4cccc8d6f00130b367e",
    gate: "Gate 1",
    modelYear: "2015",
    project: "911",
    variant: "MP"
  }
];

// Define some mock data for testing.
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
  flexDirection: "column",
  flexWrap: "nowrap",
  onSaveClick: mockOnSaveClick,
  onVehicleChange: () => {},
  selectedVehicles
};

test("renders the VehicleSelectDialog component", () => {
  render(<VehicleSelectDialog {...defaultProps} />);
  // render the component
  expect(screen.getByText("Some title")).toBeInTheDocument();
});

test("enables the Save button when all fields are filled", () => {
  // render the component with all fields filled in selected vehicles
  render(<VehicleSelectDialog {...defaultProps} />);

  // check that the Save button is enabled
  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeEnabled();
});

test("calls onSaveClick when Save button is clicked", () => {
  // render the component
  render(<VehicleSelectDialog {...defaultProps} />);

  // click the Save button
  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  // check that the onSaveClick function was called
  expect(mockOnSaveClick).toHaveBeenCalledWith(selectedVehicles);
});

test("disables the Save button when any field is empty", () => {
  // render the component with an empty field in one of the selected vehicles
  const modifiedVehicles = [...selectedVehicles];
  modifiedVehicles[0].gate = ""; // Empty gate field

  render(
    <VehicleSelectDialog
      {...defaultProps}
      selectedVehicles={modifiedVehicles}
    />
  );

  // check that the Save button is disabled
  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeDisabled();
});
