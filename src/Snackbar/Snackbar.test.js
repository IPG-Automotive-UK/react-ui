import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Snackbar from "./";
import userEvent from "@testing-library/user-event";

describe("Snackbar", () => {
  it("is hidden when open=false", () => {
    const { container } = render(
      <Snackbar message="Hello world" open={false} onClose={jest.fn} />
    );
    expect(container.querySelector(".MuiSnackbar-root")).toBeFalsy();
  });
  it("is shown when open=true", () => {
    const { container } = render(
      <Snackbar message="Hello world" open onClose={jest.fn} />
    );
    expect(container.querySelector(".MuiSnackbar-root")).toBeTruthy();
  });
  it("calls onClose when user clicks x", () => {
    const onClose = jest.fn();
    render(<Snackbar message="Hello world" open onClose={onClose} />);
    userEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalled();
  });
  it("calls onClose when user clicks action button", () => {
    const onClose = jest.fn();
    render(
      <Snackbar
        message="Hello world"
        open
        onClose={onClose}
        actionText="Action"
        actionCallback={jest.fn()}
      />
    );
    userEvent.click(screen.getByRole("button", { name: "Action" }));
    expect(onClose).toHaveBeenCalled();
  });
  it("calls actionCallback when user clicks action button", () => {
    const onAction = jest.fn();
    render(
      <Snackbar
        message="Hello world"
        open
        onClose={jest.fn()}
        actionText="Action"
        actionCallback={onAction}
      />
    );
    userEvent.click(screen.getByRole("button", { name: "Action" }));
    expect(onAction).toHaveBeenCalled();
  });
  it("calls onClose after autohide duration", async () => {
    const onClose = jest.fn();
    render(
      <Snackbar
        message="Hello world"
        open
        onClose={onClose}
        actionText="Action"
        actionCallback={jest.fn()}
        autoHideDuration={100}
      />
    );
    waitFor(() => expect(onClose).toHaveBeenCalled());
  });
  it("shows message", () => {
    render(<Snackbar message="Hello world" open onClose={jest.fn} />);
    expect(screen.queryByText("Hello world")).toBeInTheDocument();
  });
});
