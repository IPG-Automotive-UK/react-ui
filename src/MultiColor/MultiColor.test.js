import MultiColor from "./MultiColor";
import React from "react";
import { render } from "@testing-library/react";

/**
 * Test wrapper for MultiColor (provides state for the value)
 */
const MultiColorWithState = ({
  onChange,
  rows: rowsIn = [
    {
      color: "rgba(0,22,252,1)",
      value: 2
    }
  ],
  ...rest
}) => {
  const [rows, setRows] = React.useState(rowsIn);
  const handleChange = newRows => {
    setRows(newRows);
    onChange && onChange(newRows);
  };
  return (
    <MultiColor {...rest} autoHeight onChange={handleChange} rows={rows} />
  );
};

function getColumnValues(colIndex) {
  return Array.from(
    document.querySelectorAll(`[role="cell"][data-colindex="${colIndex}"]`)
  ).map(node => node.textContent);
}

/**
 * Tests
 */
describe("MultiColor", () => {
  test("can render correct values", () => {
    render(<MultiColorWithState />);
    expect(Number(getColumnValues(0))).toBe(2);
  });
  test("can update value", () => {
    const newRows = [{ color: "rgba(0,255,0,1)", value: 10 }];
    render(<MultiColorWithState rows={newRows} />);
    expect(Number(getColumnValues(0))).toBe(10);
  });
  test("can update color", () => {
    const newRows = [{ color: "rgba(0,255,0,1)", value: 10 }];
    render(<MultiColorWithState rows={newRows} />);
    const colorCell = document
      .querySelector(
        `[role="row"][data-rowindex="${0}"] [role="cell"][data-colindex="${1}"]`
      )
      .querySelector("button");
    const newColor = window
      .getComputedStyle(colorCell, null)
      .getPropertyValue("background-color");
    expect(newColor).toBe("rgb(0, 255, 0)");
  });
});
