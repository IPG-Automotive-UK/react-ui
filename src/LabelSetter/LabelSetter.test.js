import { render, screen } from "@testing-library/react";
import LabelSetter from "./LabelSetter";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Tests
 */
describe("LabelSetter", () => {
  const columns = [
    {
      align: "center",
      disableClickEventBubbling: true,
      editable: true,
      field: "value",
      headerAlign: "center",
      headerName: "Value",
      sortable: false,
      type: "number",
      width: 80
    },
    {
      align: "center",
      disableClickEventBubbling: true,
      editable: true,
      field: "label",
      headerAlign: "center",
      headerName: "Label",
      sortable: false,
      width: 150
    }
  ];
  const rows = [
    { label: "test1", value: 2 },
    { label: "test2", value: 20 }
  ];
  test("can render with no rows", () => {
    const { container } = render(<LabelSetter columns={columns} />);
    expect(container.firstChild).toBeInTheDocument();
  });
  test("can add a row", () => {
    const onChange = jest.fn();
    render(<LabelSetter columns={columns} onChange={onChange} />);
    const addButton = screen.getByTestId("addButton");
    userEvent.click(addButton);
    expect(onChange).toHaveBeenCalledWith([{ label: "", value: null }]);
  });
  test("can delete a row", () => {
    const onChange = jest.fn();
    render(<LabelSetter columns={columns} onChange={onChange} rows={rows} />);
    const deleteButton = screen.getAllByTestId("deleteButton");
    userEvent.click(deleteButton[0]);
    expect(onChange).toHaveBeenCalledWith([
      { id: 1, label: "test2", value: 20 }
    ]);
  });
});
