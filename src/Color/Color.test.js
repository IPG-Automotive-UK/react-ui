import { render, screen } from "@testing-library/react";

import Color from ".";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for Color
 * Provides state for the value
 */
const ColorWithState = ({
  onChange,
  value: valueIn = "rgba(255,55,100,1)",
  ...rest
}) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = color => {
    setValue(color);
    onChange && onChange(color);
  };
  return <Color {...rest} onChange={handleChange} value={value} />;
};

function setup(inputs) {
  render(<ColorWithState open {...inputs} />);
  return {
    inputs: {
      alpha: screen.getByLabelText("Transparency"),
      blue: screen.getByLabelText("Blue"),
      green: screen.getByLabelText("Green"),
      red: screen.getByLabelText("Red")
    }
  };
}

describe("Color", () => {
  test("Color text value updates", () => {
    const value = "rgba(255,55,100,1)";
    render(<ColorWithState open value={value} />);

    // confirm RGBA and Hex values
    expect(document.querySelector("[id=red]").value).toBe("255");
    expect(document.querySelector("[id=green]").value).toBe("55");
    expect(document.querySelector("[id=blue]").value).toBe("100");
    expect(document.querySelector("[id=alpha]").value).toBe("1");
  });
  test("Color picker values update", () => {
    const value = "rgba(255,0,0,1)";
    render(<ColorWithState open value={value} />);

    expect(
      document.querySelector(".react-colorful__saturation").style
        .backgroundColor
    ).toBe("rgb(255, 0, 0)");
    expect(
      document.querySelector(".react-colorful__saturation-pointer").style.left
    ).toBe("100%");
    expect(
      document.querySelector(".react-colorful__hue-pointer").style.left
    ).toBe("0%");
    expect(
      document.querySelector(".react-colorful__alpha-pointer").style.left
    ).toBe("100%");
  });
  test("Red Text Updates", async () => {
    const user = userEvent.setup();
    const elements = setup();
    const input = screen.getByLabelText("Red");
    await user.type(input, "{backspace}{backspace}{backspace}");
    await user.type(elements.inputs.red, "201");
    expect(document.querySelector("[id=red]").value).toBe("201");
  });
  test("Green Text Updates", async () => {
    const user = userEvent.setup();
    const elements = setup();
    const input = screen.getByLabelText("Green");
    await user.type(input, "{backspace}{backspace}{backspace}");
    await user.type(elements.inputs.green, "155");
    expect(document.querySelector("[id=green]").value).toBe("155");
  });
  test("Blue Text Updates", async () => {
    const user = userEvent.setup();
    const elements = setup();
    const input = screen.getByLabelText("Blue");
    await user.type(input, "{backspace}{backspace}{backspace}");
    await user.type(elements.inputs.blue, "105");
    expect(document.querySelector("[id=blue]").value).toBe("105");
  });
  test("Alpha Text Updates", async () => {
    const user = userEvent.setup();
    const elements = setup();
    const input = screen.getByLabelText("Transparency");
    await user.type(input, "{backspace}");
    await user.type(elements.inputs.alpha, "0.5");
    expect(document.querySelector("[id=alpha]").value).toBe("0.5");
  });
  test("No initial color", () => {
    const value = "";
    render(<ColorWithState open value={value} />);

    // confirm RGBA and Hex values
    expect(document.querySelector("[id=red]").value).toBe("");
    expect(document.querySelector("[id=green]").value).toBe("");
    expect(document.querySelector("[id=blue]").value).toBe("");
    expect(document.querySelector("[id=alpha]").value).toBe("");
  });
  test("Click no color sets no color", async () => {
    const user = userEvent.setup();
    const value = "rgba(255,55,100,1)";
    render(<ColorWithState value={value} />);

    // click no color checkbox
    const noColor = document.querySelector("[type=checkbox]");
    await user.click(noColor);

    // confirm RGBA and Hex values
    expect(document.querySelector("[id=red]").value).toBe("");
    expect(document.querySelector("[id=green]").value).toBe("");
    expect(document.querySelector("[id=blue]").value).toBe("");
    expect(document.querySelector("[id=alpha]").value).toBe("");
  });
});
