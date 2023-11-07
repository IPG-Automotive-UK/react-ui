import { render, screen } from "@testing-library/react";
import FontStyle from ".";
import React from "react";

/**
 * Test wrapper for FontStyle
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const FontStyleWithState = ({ onChange, value: valueIn = "", ...rest }) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = (event, value) => {
    setValue(value);
    onChange && onChange(event, value);
  };
  return <FontStyle {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("Select", () => {
  test("can select bold", () => {
    render(<FontStyleWithState value={["bold"]} />);
    const boldButton = screen.getByTestId("boldButton");
    const italicButton = screen.getByTestId("italicButton");
    const underlineButton = screen.getByTestId("underlineButton");
    expect(boldButton.getAttribute("aria-pressed")).toBe("true");
    expect(italicButton.getAttribute("aria-pressed")).toBe("false");
    expect(underlineButton.getAttribute("aria-pressed")).toBe("false");
  });
  test("can select italic", () => {
    render(<FontStyleWithState value={["italic"]} />);
    const boldButton = screen.getByTestId("boldButton");
    const italicButton = screen.getByTestId("italicButton");
    const underlineButton = screen.getByTestId("underlineButton");
    expect(boldButton.getAttribute("aria-pressed")).toBe("false");
    expect(italicButton.getAttribute("aria-pressed")).toBe("true");
    expect(underlineButton.getAttribute("aria-pressed")).toBe("false");
  });
  test("can select underline", () => {
    render(<FontStyleWithState value={["underline"]} />);
    const boldButton = screen.getByTestId("boldButton");
    const italicButton = screen.getByTestId("italicButton");
    const underlineButton = screen.getByTestId("underlineButton");
    expect(boldButton.getAttribute("aria-pressed")).toBe("false");
    expect(italicButton.getAttribute("aria-pressed")).toBe("false");
    expect(underlineButton.getAttribute("aria-pressed")).toBe("true");
  });
  test("can select multiple", () => {
    render(<FontStyleWithState value={["bold", "italic"]} />);
    const boldButton = screen.getByTestId("boldButton");
    const italicButton = screen.getByTestId("italicButton");
    const underlineButton = screen.getByTestId("underlineButton");
    expect(boldButton.getAttribute("aria-pressed")).toBe("true");
    expect(italicButton.getAttribute("aria-pressed")).toBe("true");
    expect(underlineButton.getAttribute("aria-pressed")).toBe("false");
  });
});
