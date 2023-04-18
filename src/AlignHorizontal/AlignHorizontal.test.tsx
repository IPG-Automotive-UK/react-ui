import * as React from "react";

import { render, screen } from "@testing-library/react";

import AlignHorizontal from ".";
import { AlignHorizontalProps } from "./AlignHorizontal.types";

/**
 * Test wrapper for AlignHorizontal
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
interface AlignHorizontalWithStateProps
  extends Pick<AlignHorizontalProps, "value">,
    Partial<Pick<AlignHorizontalProps, "onChange">> {}
const AlignHorizontalWithState = ({
  onChange = () => {},
  value: valueIn = null,
  ...rest
}: AlignHorizontalWithStateProps) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: "left" | "center" | "right" | "justify" | null
  ) => {
    setValue(value);
    onChange && onChange(event, value);
  };
  return <AlignHorizontal {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("Select", () => {
  test("can select left", () => {
    render(<AlignHorizontalWithState value="left" />);
    const leftButton = screen.getByTestId("leftButton");
    const centerButton = screen.getByTestId("centerButton");
    const rightButton = screen.getByTestId("rightButton");
    const justifyButton = screen.getByTestId("justifyButton");
    expect(leftButton.getAttribute("aria-pressed")).toBe("true");
    expect(centerButton.getAttribute("aria-pressed")).toBe("false");
    expect(rightButton.getAttribute("aria-pressed")).toBe("false");
    expect(justifyButton.getAttribute("aria-pressed")).toBe("false");
  });
  test("can select center", () => {
    render(<AlignHorizontalWithState value="center" />);
    const leftButton = screen.getByTestId("leftButton");
    const centerButton = screen.getByTestId("centerButton");
    const rightButton = screen.getByTestId("rightButton");
    const justifyButton = screen.getByTestId("justifyButton");
    expect(leftButton.getAttribute("aria-pressed")).toBe("false");
    expect(centerButton.getAttribute("aria-pressed")).toBe("true");
    expect(rightButton.getAttribute("aria-pressed")).toBe("false");
    expect(justifyButton.getAttribute("aria-pressed")).toBe("false");
  });
  test("can select right", () => {
    render(<AlignHorizontalWithState value="right" />);
    const leftButton = screen.getByTestId("leftButton");
    const centerButton = screen.getByTestId("centerButton");
    const rightButton = screen.getByTestId("rightButton");
    const justifyButton = screen.getByTestId("justifyButton");
    expect(leftButton.getAttribute("aria-pressed")).toBe("false");
    expect(centerButton.getAttribute("aria-pressed")).toBe("false");
    expect(rightButton.getAttribute("aria-pressed")).toBe("true");
    expect(justifyButton.getAttribute("aria-pressed")).toBe("false");
  });
  test("can select justify", () => {
    render(<AlignHorizontalWithState value="justify" />);
    const leftButton = screen.getByTestId("leftButton");
    const centerButton = screen.getByTestId("centerButton");
    const rightButton = screen.getByTestId("rightButton");
    const justifyButton = screen.getByTestId("justifyButton");
    expect(leftButton.getAttribute("aria-pressed")).toBe("false");
    expect(centerButton.getAttribute("aria-pressed")).toBe("false");
    expect(rightButton.getAttribute("aria-pressed")).toBe("false");
    expect(justifyButton.getAttribute("aria-pressed")).toBe("true");
  });
});
