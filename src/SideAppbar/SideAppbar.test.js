import { render, screen } from "@testing-library/react";

import React from "react";
import SideAppbar from ".";

/**
 * Tests for sideappbar component
 */
describe("SideAppbar", () => {
  test("can hide logo", () => {
    render(<SideAppbar showLogo={false} />);
    const logoBox = screen.queryByTestId("logo-box");
    expect(logoBox).not.toBeInTheDocument();
  });
  test("calls butonClick when clicked", () => {
    const onButtonClick = jest.fn();
    render(<SideAppbar onButtonClick={onButtonClick} />);
    const button = screen.queryByTestId("VIRTO.BUILD");
    button.click();
    expect(onButtonClick).toHaveBeenCalled();
  });
  test("has empty logo link href on default", () => {
    const { container } = render(<SideAppbar />);
    expect(container.querySelector("a")).not.toBeInTheDocument();
  });
  test("has a valid logo link href if a string is provided", () => {
    const { container } = render(
      <SideAppbar logoLinkUrl={"https://www.some.url/"} />
    );
    expect(
      container.querySelector("a[href='https://www.some.url/']")
    ).toBeInTheDocument();
  });
});
