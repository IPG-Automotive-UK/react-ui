import "@testing-library/jest-dom";

import React, { useState } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, renderHook, waitFor } from "@testing-library/react";

import ConfirmProvider from "./ConfirmProvider";
import { ThemeProvider } from "../ThemeProvider";
import useConfirm from "./useConfirm";

describe("useConfirm", () => {
  const deleteConfirmed = vi.fn();
  const deleteCancelled = vi.fn();

  // clear all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // component that uses the useConfirm hook
  const DeleteButton = ({ confirmOptions, text = "Delete" }) => {
    const confirm = useConfirm();

    return (
      <button
        onClick={() =>
          confirm(confirmOptions).then(deleteConfirmed).catch(deleteCancelled)
        }
      >
        {text}
      </button>
    );
  };

  // main test component that provides the ConfirmProvider context
  const TestComponent = ({ confirmOptions = {} }) => (
    <ConfirmProvider>
      <DeleteButton confirmOptions={confirmOptions} />
    </ConfirmProvider>
  );

  test("resolves the promise on confirm", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    // ensure the dialog is not shown initially
    expect(queryByText("Dialog Title")).toBeFalsy();

    // simulate clicking the "Delete" button to open the confirmation dialog
    fireEvent.click(getByText("Delete"));

    // ensure the confirmation dialog is shown after the click
    expect(queryByText("Dialog Title")).toBeTruthy();

    // simulate clicking the "Ok" button to confirm
    fireEvent.click(getByText("Yes"));

    // wait for the confirmation dialog to be removed or not present anymore
    await waitFor(() => {
      expect(queryByText("Dialog Title")).toBeFalsy();
    });

    // ensure the confirm function is called, and cancel function is not called
    expect(deleteConfirmed).toHaveBeenCalled();
    expect(deleteCancelled).not.toHaveBeenCalled();
  });

  test("rejects the promise on cancel", async () => {
    const { getByText, queryByText } = render(
      <TestComponent
        confirmOptions={{
          cancellationText: "No",
          confirmationText: "Yes",
          title: "Dialog Title"
        }}
      />
    );

    // ensure the dialog is not shown initially
    expect(queryByText("Dialog Title")).toBeFalsy();

    // simulate clicking the "Delete" button to open the confirmation dialog
    fireEvent.click(getByText("Delete"));

    // ensure the confirmation dialog is shown after the click
    expect(queryByText("Dialog Title")).toBeTruthy();

    // simulate clicking the "Cancel" button to cancel
    fireEvent.click(getByText("No"));

    // wait for the confirmation dialog to be removed or not present anymore
    await waitFor(() => {
      expect(queryByText("Dialog Title")).toBeFalsy();
    });

    // ensure the cancel function is called, and confirm function is not called
    expect(deleteConfirmed).not.toHaveBeenCalled();

    expect(deleteCancelled).toHaveBeenCalled();
  });

  describe("options", () => {
    // test to check if dialog is shown with correct title, description, cancellation text and confirmation text
    test("should have the correct default text", () => {
      const { getByText, queryByText } = render(<TestComponent />);
      fireEvent.click(getByText("Delete"));
      expect(queryByText("Dialog Title")).toBeTruthy();
      expect(queryByText("Would you like to continue?")).toBeTruthy();
      expect(queryByText("No")).toBeTruthy();
      expect(queryByText("Yes")).toBeTruthy();
    });

    test("accepts custom text", () => {
      const { getByText, queryByText } = render(
        <TestComponent
          confirmOptions={{
            cancellationText: "No way",
            confirmationText: "Yessir",
            description: "This will permanently remove the item.",
            title: "Remove this item?"
          }}
        />
      );
      fireEvent.click(getByText("Delete"));
      expect(queryByText("Remove this item?")).toBeTruthy();
      expect(
        queryByText("This will permanently remove the item.")
      ).toBeTruthy();
      expect(queryByText("No way")).toBeTruthy();
      expect(queryByText("Yessir")).toBeTruthy();
    });

    test("accepts custom content", () => {
      const { getByText, queryByText } = render(
        <TestComponent
          confirmOptions={{
            content: <div>Arbitrary content</div>
          }}
        />
      );
      fireEvent.click(getByText("Delete"));
      expect(queryByText("Arbitrary content")).toBeTruthy();
    });

    test("keeps custom text during close", () => {
      const { getByText, queryByText } = render(
        <TestComponent
          confirmOptions={{
            title: "Remove this item?"
          }}
        />
      );
      fireEvent.click(getByText("Delete"));
      expect(queryByText("Remove this item?")).toBeTruthy();
      fireEvent.click(getByText("Yes"));
      expect(queryByText("Remove this item?")).toBeTruthy();
    });

    test("honours default options passed to the provider", () => {
      const { getByText, queryByText } = render(
        <ConfirmProvider
          defaultOptions={{
            cancellationText: "No way",
            confirmationText: "Yessir"
          }}
        >
          <DeleteButton confirmOptions={{ cancellationText: "Nope" }} />
        </ConfirmProvider>
      );
      fireEvent.click(getByText("Delete"));
      expect(queryByText("Yessir")).toBeTruthy();
      expect(queryByText("Nope")).toBeTruthy();
    });

    test("merges default options with local options in a deep manner", () => {
      const { getByText } = render(
        <ConfirmProvider
          defaultOptions={{
            confirmationButtonProps: { "aria-label": "Confirm" }
          }}
        >
          <DeleteButton
            confirmOptions={{
              confirmationButtonProps: { disabled: true },
              confirmationText: "Yes"
            }}
          />
        </ConfirmProvider>
      );
      fireEvent.click(getByText("Delete"));
      const button = getByText("Yes") as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      expect(button.getAttribute("aria-label")).toEqual("Confirm");
    });

    test("respects updates to default options", () => {
      function App() {
        const [confirmationText, setConfirmationText] = useState("Yes");

        return (
          <ConfirmProvider defaultOptions={{ confirmationText }}>
            <DeleteButton confirmOptions={{}} />
            <button onClick={() => setConfirmationText("Ok")}>
              Change text
            </button>
          </ConfirmProvider>
        );
      }

      const { getByText, queryByText } = render(<App />);

      fireEvent.click(getByText("Delete"));

      expect(getByText("Yes")).toBeTruthy();
      expect(queryByText("Ok")).toBeFalsy();

      fireEvent.click(getByText("Change text"));

      expect(queryByText("Yes")).toBeFalsy();
      expect(getByText("Ok")).toBeTruthy();
    });
  });

  describe("confirm dialog theme support in light and dark mode", () => {
    // test to check if dialog supports light mode
    test("should support light mode", () => {
      const { getByText } = render(
        <ThemeProvider theme={"light"}>
          <ConfirmProvider>
            <DeleteButton confirmOptions={{}} />
          </ConfirmProvider>
        </ThemeProvider>
      );
      fireEvent.click(getByText("Delete"));
      const dialog = getByText("Dialog Title").closest("div");
      expect(dialog).toHaveStyle("color:rgba(0, 0, 0, 0.87)");
    });

    // test to check if dialog supports dark mode
    test("should support dark mode", () => {
      const { getByText } = render(
        <ThemeProvider theme={"dark"}>
          <ConfirmProvider>
            <DeleteButton confirmOptions={{}} />
          </ConfirmProvider>
        </ThemeProvider>
      );
      fireEvent.click(getByText("Delete"));
      const dialog = getByText("Dialog Title").closest("div");
      expect(dialog).toHaveStyle("color:rgb(255, 255, 255)");
    });
  });

  describe("closeOnParentUnmount", () => {
    test("closes the modal when the opening component is unmounted", async () => {
      const ParentComponent = () => {
        const [alive, setAlive] = useState(true);

        return (
          <ConfirmProvider>
            {alive && <DeleteButton confirmOptions={{}} />}
            <button onClick={() => setAlive(false)}>Unmount child</button>
          </ConfirmProvider>
        );
      };

      const { getByText, queryByText } = render(<ParentComponent />);

      fireEvent.click(getByText("Delete"));
      expect(queryByText("Dialog Title")).toBeTruthy();

      // remove <DeleteButton /> from the tree
      fireEvent.click(getByText("Unmount child"));

      await waitFor(() => queryByText("Dialog Title"));

      expect(deleteConfirmed).not.toHaveBeenCalled();
      expect(deleteCancelled).not.toHaveBeenCalled();
    });

    test("does not close the modal when another component with useConfirm is unmounted", async () => {
      const ParentComponent = () => {
        const [alive, setAlive] = useState(true);

        return (
          <ConfirmProvider>
            {alive && <DeleteButton confirmOptions={{}} text="Delete 1" />}
            <DeleteButton confirmOptions={{}} text="Delete 2" />
            <button onClick={() => setAlive(false)}>Unmount child</button>
          </ConfirmProvider>
        );
      };

      const { getByText, queryByText } = render(<ParentComponent />);

      fireEvent.click(getByText("Delete 2"));
      expect(queryByText("Dialog Title")).toBeTruthy();

      // remove the first <DeleteButton /> from the tree
      fireEvent.click(getByText("Unmount child"));

      fireEvent.click(getByText("Yes"));
      await waitFor(() => queryByText("Dialog Title"));
      expect(deleteConfirmed).toHaveBeenCalled();
    });
  });

  describe("missing ConfirmProvider", () => {
    test("throws an error when ConfirmProvider is missing", () => {
      const { result } = renderHook(() => useConfirm());
      expect(() => result.current({})).toThrowError("Missing ConfirmProvider");
    });

    test("does not throw an error if it's not used", () => {
      expect(() => render(<DeleteButton confirmOptions={{}} />)).not.toThrow();
    });
  });
});
