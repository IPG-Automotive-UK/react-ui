import Color from "./";
import React from "react";
import { render } from "@testing-library/react";

describe("Color", () => {
  test("Color text value updates", () => {
    const value = "rgba(255,55,100,1)";
    render(<Color open value={value} />);

    // confirm RGBA and Hex values
    expect(document.querySelector("[id=red]").value).toBe("255");
    expect(document.querySelector("[id=green]").value).toBe("55");
    expect(document.querySelector("[id=blue]").value).toBe("100");
    expect(document.querySelector("[id=alpha]").value).toBe("1");
    expect(document.querySelector("[id=hex]").value).toBe("ff3764ff");
  });
  test("Color picker values update", () => {
    const value = "rgba(255,0,0,1)";
    render(<Color open value={value} />);

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
});
