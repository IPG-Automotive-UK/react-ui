import { render, screen } from "@testing-library/react";

import MultiText from "./MultiText";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Tests
 */
describe("MultiText", () => {
  const rows = [
    { label: "test1", value: 2 },
    { label: "test2", value: 20 }
  ];
  test("can render with no rows", () => {
    const { container } = render(<MultiText />);
    expect(container.firstChild).toBeInTheDocument();
  });
  test("can add a row", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiText onChange={onChange} />);
    const addButton = screen.getByTestId("addButton");
    await user.click(addButton);
    expect(onChange).toHaveBeenCalledWith([{ label: "", value: null }]);
  });
  test("can delete a row", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiText onChange={onChange} rows={rows} />);
    const deleteButton = screen.getAllByTestId("deleteButton");
    await user.click(deleteButton[0]);
    expect(onChange).toHaveBeenCalledWith([
      { id: 1, label: "test2", value: 20 }
    ]);
  });
});
