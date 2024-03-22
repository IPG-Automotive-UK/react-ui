import { fireEvent, render } from "@testing-library/react";

import RadioButtons from "./RadioButtons";
import React from "react";

// list of options for radio buttons group
const options = ["red", "green", "yellow", "blue", "purple"];

/**
 * Tests
 */
describe("RadioButtons", () => {
  test("can render with no props", () => {
    const { container } = render(<RadioButtons />);
    expect(container.firstChild).toBeInTheDocument();
  });
  test("can select an option", () => {
    const thisValue = options[2];
    const { container } = render(
      <RadioButtons options={options} title="Test" />
    );
    const radioInput = container.querySelector("input");
    fireEvent.change(radioInput, { target: { value: thisValue } });
    expect(radioInput.value).toBe(thisValue);
  });
  test("can set a name and default value", () => {
    const thisValue = options[2];
    const { container } = render(
      <RadioButtons
        defaultValue={thisValue}
        name="uncontrolled"
        options={options}
        title="Test"
      />
    );
    const radioInput = container.querySelectorAll(`input[name="uncontrolled"]`);
    expect(radioInput[2]).toBeChecked();
  });
});
