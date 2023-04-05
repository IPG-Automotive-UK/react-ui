import { fireEvent, render, screen } from "@testing-library/react";

import NoWrapTypography from "./NoWrapTypography";
import React from "react";
import userEvent from "@testing-library/user-event";

const textContent = "This is a very long text that should overflow";

// test that the tooltip shows when the text overflows
describe("NoWrapTypography", () => {
  it("shows tooltip when text overflows", async () => {
    const user = userEvent.setup();
    const App = () => {
      return <NoWrapTypography>{textContent}</NoWrapTypography>;
    };
    render(<App />);
    const text = screen.getByText(textContent);

    // mock the text element to have a clientWidth of 50 and scrollWidth of 100
    Object.defineProperties(text, {
      clientWidth: {
        value: 50
      },
      scrollWidth: {
        value: 100
      }
    });

    // expect text to have some default styling for overflow
    expect(text.style.overflow).toBe("hidden");
    expect(text.style.textOverflow).toBe("ellipsis");
    expect(text.style.whiteSpace).toBe("nowrap");

    // expect text has a text of "This is a very long text that should overflow"
    expect(text.textContent).toBe(textContent);

    // hover
    fireEvent.mouseEnter(text);
    await user.hover(text);

    // await for tooltip to be visible (it has a delay)
    const tooltip = await screen.findByRole("tooltip");

    // expect tooltip to be visible
    expect(tooltip).toBeVisible();
    expect(tooltip).toHaveTextContent(textContent);
  });
});
