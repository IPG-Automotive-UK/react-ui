import { render, screen } from "@testing-library/react";

import { LinkWithPreview } from ".";
import React from "react";
import { userEvent } from "@testing-library/user-event";

// tests for the RoadPreview component
describe("RoadPreview", () => {
  // test to check the component renders
  test("renders", () => {
    render(
      <LinkWithPreview
        href="https://example.com"
        content={<h1>Hello World!</h1>}
      >
        My Link
      </LinkWithPreview>
    );

    const linkText = screen.getByText("My Link");
    const link = screen.getByRole("link");

    expect(link.getAttribute("href")).toContain("https://example.com");
    expect(linkText).toBeInTheDocument();
    expect(linkText).toHaveTextContent("My Link");
  });
  test("popover opens/closes on hover enter/leave", async () => {
    const wait = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));

    render(
      <LinkWithPreview
        href="https://example.com"
        content={<h1>Hello World!</h1>}
      >
        My Link
      </LinkWithPreview>
    );

    const linkComponent = screen.getByText("My Link");
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toContain("https://example.com");
    expect(linkComponent).toBeInTheDocument();
    expect(linkComponent).toHaveTextContent("My Link");

    // before mouse hover there should be no popper
    expect(screen.queryByTestId("preview-popper")).not.toBeInTheDocument();

    // simulate the user hovering over the link
    await userEvent.hover(linkComponent);

    // wait for 1000ms (1s) popper should appear after 1000ms of hovering
    await wait(900);
    expect(screen.queryByTestId("preview-popper")).not.toBeInTheDocument(); // check that the popper hasn't rendered yet
    await wait(100);
    expect(screen.getByTestId("preview-popper")).toBeInTheDocument();

    // check that the contents of the popper match the contents passed
    const content = screen.getByText("Hello World!");
    expect(content.tagName).toBe("H1");

    // simulate not hovering
    await userEvent.unhover(linkComponent);

    // wait for 300ms (0.3s) poppers should disappear after 300ms on mouse leave
    await wait(200);
    expect(screen.queryByTestId("preview-popper")).toBeInTheDocument(); // check that the popper is still there
    await wait(100);
    expect(screen.queryByTestId("preview-popper")).not.toBeInTheDocument();
  });
});
