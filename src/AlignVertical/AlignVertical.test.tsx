import * as React from "react";

import { render, screen } from "@testing-library/react";

import AlignVertical from ".";
import { AlignVerticalProps } from "./AlignVertical.types";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for AlignVertical
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const AlignVerticalWithState = ({
  onChange,
  value: valueIn = null,
  ...rest
}: Partial<AlignVerticalProps>) => {
  const [value, setValue] =
    React.useState<AlignVerticalProps["value"]>(valueIn);
  const handleChange: AlignVerticalProps["onChange"] = (event, value) => {
    setValue(value);
    onChange && onChange(event, value);
  };
  return <AlignVertical {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("Select", () => {
  test("can select top", async () => {
    // center is the default, click top and confirm it is selected
    const user = userEvent.setup();
    render(<AlignVerticalWithState value="center" />);
    const top = screen.getByRole("button", { name: /top aligned/i });
    const center = screen.getByRole("button", { name: /vertically centered/i });
    expect(center.getAttribute("aria-pressed")).toBe("true");
    await user.click(top);
    expect(top.getAttribute("aria-pressed")).toBe("true");
  });
  test("can select center", async () => {
    // top is the default, click center and confirm it is selected
    const user = userEvent.setup();
    render(<AlignVerticalWithState value="top" />);
    const top = screen.getByRole("button", { name: /top aligned/i });
    const center = screen.getByRole("button", { name: /vertically centered/i });
    expect(top.getAttribute("aria-pressed")).toBe("true");
    await user.click(center);
    expect(center.getAttribute("aria-pressed")).toBe("true");
  });
  test("can select bottom", async () => {
    // top is the default, click bottom and confirm it is selected
    const user = userEvent.setup();
    render(<AlignVerticalWithState value="top" />);
    const top = screen.getByRole("button", { name: /top aligned/i });
    const bottom = screen.getByRole("button", { name: /bottom aligned/i });
    expect(top.getAttribute("aria-pressed")).toBe("true");
    await user.click(bottom);
    expect(bottom.getAttribute("aria-pressed")).toBe("true");
  });
});
