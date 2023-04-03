import { render, screen } from "@testing-library/react";

import { Box } from "@mui/material";
import NoWrapTypography from "./NoWrapTypography";
import React from "react";
import userEvent from "@testing-library/user-event";

const children = "This is a very long text that should overflow";
// test that the tooltip shows when the text overflows
describe("NoWrapTypography", () => {
  it("shows tooltip when text overflows", async () => {
    const user = userEvent.setup();
    const App = () => {
      return (
        <Box sx={{ border: "1px solid black", mt: 2, width: "100px" }}>
          <NoWrapTypography maxWidth="100px" sx={{ fontSize: "18px" }}>
            {children}
          </NoWrapTypography>
        </Box>
      );
    };
    render(<App />);
    const text = screen.getByText(children);
    await user.hover(text);

    screen.logTestingPlaygroundURL();

    // expect text parent has a width of 250px
    expect(text.parentElement.style.width).toBe("250px");
    // expect text parent has a overflow of hidden
    expect(text.parentElement.style.overflow).toBe("hidden");
    // expect text parent has a textOverflow of ellipsis
    expect(text.parentElement.style.textOverflow).toBe("ellipsis");
    // expect text parent has a whiteSpace of nowrap
    expect(text.parentElement.style.whiteSpace).toBe("nowrap");

    // expect text has a text of "This is a very long text that should overflow"
    expect(text.textContent).toBe(children);
  });
});
