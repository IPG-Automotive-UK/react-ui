import React, { act } from "react";
import { render, screen } from "@testing-library/react";

import { Box } from "@mui/material";
import { LinkWithPreview } from ".";
import { expect } from "vitest";
import { userEvent } from "@testing-library/user-event";

// tests for the LinkWithPreview component
describe("LinkWithPreview", () => {
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

    // capture the components of interest
    const linkComponent = screen.getByText("My Link");
    const link = screen.getByRole("link");

    // check that captured components are rendered as expected
    expect(link.getAttribute("href")).toContain("https://example.com");
    expect(linkComponent).toBeInTheDocument();
    expect(linkComponent).toHaveTextContent("My Link");
  });

  // test to check that the color can be adjusted
  test("renders with custom color and heading variant", () => {
    render(
      <LinkWithPreview
        href="https://example.com"
        color={"red"}
        content={<h1>Hello World!</h1>}
        variant="h4"
      >
        My Link
      </LinkWithPreview>
    );

    // capture components of interest
    const linkComponent = screen.getByText("My Link");
    const linkComponentStyle = window.getComputedStyle(linkComponent);
    const linkParent = linkComponent.parentElement;

    // check that captured components are rendered as expected
    expect(linkComponent).toBeInTheDocument();
    expect(linkComponentStyle.color).toBe("rgb(255, 0, 0)"); // rgb value for "red"
    expect(linkParent?.tagName).toBe("H4"); // expect the link to render as an h4
  });

  // test to check that the color can be adjusted
  test("renders with truncation and wrap", () => {
    // render default (nowrap is enabled)
    const { rerender } = render(
      <Box width={100}>
        <LinkWithPreview
          href="https://example.com"
          content={<h1>Hello World!</h1>}
        >
          My Link
        </LinkWithPreview>
      </Box>
    );

    // capture components of interest
    const linkComponent = screen.getByText("My Link");
    const linkComponentStyle = window.getComputedStyle(linkComponent);
    const linkParent = linkComponent.parentElement;
    if (!linkParent) {
      throw new Error("Couldn't find parent element");
    }
    const linkParentStyle = window.getComputedStyle(linkParent);

    // check that captured components are rendered as expected
    expect(linkComponent).toBeInTheDocument();
    expect(linkComponentStyle.whiteSpace).toBe("inherit");
    expect(linkParentStyle.whiteSpace).toBe("nowrap");

    // render with wrapping allowed (overwrite normal behaviour)
    rerender(
      <Box width={100}>
        <LinkWithPreview
          href="https://example.com"
          content={<h1>Hello World!</h1>}
          sx={{ whiteSpace: "normal" }}
        >
          My Link
        </LinkWithPreview>
      </Box>
    );

    // capture components of interest
    const updatedLinkComponent = screen.getByText("My Link");
    const updatedLinkComponentStyle =
      window.getComputedStyle(updatedLinkComponent);
    const updatedLinkParent = updatedLinkComponent.parentElement;
    if (!updatedLinkParent) {
      throw new Error("Couldn't find parent element");
    }
    const updatedLinkParentStyle = window.getComputedStyle(updatedLinkParent);

    // check components match expectations
    expect(updatedLinkComponent).toBeInTheDocument();
    expect(updatedLinkComponentStyle.whiteSpace).toBe("inherit");
    expect(updatedLinkParentStyle.whiteSpace).toBe("normal");
  });
  // test to check that the font variant can be adjusted
  test("popover opens/closes on hover enter/leave", async () => {
    const wait = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));
    act(() => {
      render(
        <LinkWithPreview
          href="https://example.com"
          content={<h1>Hello World!</h1>}
        >
          My Link
        </LinkWithPreview>
      );
    });

    // capture components of interest
    const linkComponent = screen.getByText("My Link");
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toContain("https://example.com");
    expect(linkComponent).toBeInTheDocument();
    expect(linkComponent).toHaveTextContent("My Link");

    // before mouse hover there should be no popper
    expect(screen.queryByTestId("preview-popper")).not.toBeInTheDocument();
    // simulate the user hovering over the link
    // Note: user actions are recommended to be wrapped in act() https://legacy.reactjs.org/docs/test-utils.html#act
    await act(async () => {
      await userEvent.hover(linkComponent);
      // wait for 900ms (0.9s) popper should appear after 1000ms of hovering, so not yet!
      await wait(900);
    });

    // check that the popper hasn't rendered yet
    expect(screen.queryByTestId("preview-popper")).not.toBeInTheDocument();

    // wait a further 100 ms
    await act(async () => {
      await wait(100);
    });

    // total wait 900 + 100 = 1000ms, popper should appear
    // check popper appears and contents match expectations
    expect(screen.getByTestId("preview-popper")).toBeInTheDocument();
    const content = screen.getByText("Hello World!");
    expect(content.tagName).toBe("H1");

    // simulate not hovering
    await act(async () => {
      await userEvent.unhover(linkComponent);
      // wait for 200ms (0.2s) poppers should disappear after 300ms on mouse leave (so we expect it to still be here)
      await wait(200);
    });

    // check that the popper is still there
    expect(screen.queryByTestId("preview-popper")).toBeInTheDocument();

    // wait a further 100ms
    await act(async () => {
      await wait(100);
    });

    // total wait time is, 200 + 100 = 300, so 300ms in total. We expect the popper to be gone.
    expect(screen.queryByTestId("preview-popper")).not.toBeInTheDocument();
  });
});
