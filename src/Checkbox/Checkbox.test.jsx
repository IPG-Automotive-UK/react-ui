import { fireEvent, render } from "@testing-library/react";

import Checkbox from "./Checkbox";
import React from "react";

/**
 * Tests
 */
describe("Checkbox", () => {
  test("can render with no props", () => {
    const { container } = render(<Checkbox />);
    expect(container.firstChild).toBeInTheDocument();
  });
  test("can click the checkbox", () => {
    const { container } = render(
      <Checkbox checked={false} label="This is a test" />
    );
    const checkboxInput = container.querySelector("input");
    fireEvent.change(checkboxInput, { target: { checked: true } });
    expect(checkboxInput.checked).toBeTruthy();
  });
  test("can default checkbox", () => {
    const { container } = render(
      <Checkbox defaultChecked={true} label="This is a test" />
    );
    const checkboxInput = container.querySelector("input");
    expect(checkboxInput.checked).toBeTruthy();
  });
});
