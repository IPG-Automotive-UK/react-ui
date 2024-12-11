import { render, screen } from "@testing-library/react";
import useColorMap, { colorMap } from "./colorMap";

import React from "react";

describe("colorMap", () => {
  // check background color is set when color prop is set
  test("colorMap assigns correct colors", () => {
    const ids = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16"
    ];
    const getColor = colorMap(ids);
    const colors: Array<string> = [];
    for (let id = 1; id <= ids.length; id++) {
      colors.push(getColor(id.toString()));
    }

    // sanity check calling the same id, gets the same color
    const color1 = getColor("1");
    const color2 = getColor("1");
    expect(color1).toBe(color2);

    // we loop over after the 8th element, thus expect 8 unique colors
    expect(8).toBe(new Set(colors).size);
    // expect the looping effect
    expect(colors.slice(0, 7)).toMatchObject(colors.slice(8, 15));

    // passing an non-mapped id returns undefined
    expect(getColor("nonExistant")).toBe(undefined);
  });
  test("useColorMap assigns colors and memoises", () => {
    // spy on the colorMap function
    const Example = ({ id, currentId }) => {
      const getColor = useColorMap(id);
      return <p data-testid="color-array">{getColor(currentId)}</p>;
    };
    const id1 = ["1", "2"];
    const id2 = ["0", "1", "2"];

    // check that the hook works and returns a color
    const { rerender } = render(<Example id={id1} currentId={"1"} />);
    expect(screen.getByTestId("color-array").textContent).toBe("#3f51b5");

    // check that after a rerender with the same inputs the color is the same (it is memoised)
    rerender(<Example id={id1} currentId={"1"} />);
    expect(screen.getByTestId("color-array").textContent).toBe("#3f51b5");

    // check that when the options (here id) change the hook runs again and colors are reassigned
    rerender(<Example id={id2} currentId={"1"} />);
    expect(screen.getByTestId("color-array").textContent).not.toBe("#3f51b5");
  });
});
