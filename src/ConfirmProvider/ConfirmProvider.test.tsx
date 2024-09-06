import React, { useState } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, renderHook, waitFor } from "@testing-library/react";

import ConfirmProvider from "./ConfirmProvider";
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

  describe("confirmation keyword", () => {
    test("renders textfield when confirmation keyword is set", () => {
      const { getByText, getAllByText } = render(
        <TestComponent
          confirmOptions={{
            confirmationKeyword: "DELETE"
          }}
        />
      );

      fireEvent.click(getByText("Delete"));

      // fix to ensure boolean is always returned
      const textfield = getAllByText((content, element) => {
        return element !== null && element.tagName.toLowerCase() === "input";
      })[0];

      const confirmationButton = getByText("Yes") as HTMLButtonElement;

      // ensure text field is found
      expect(textfield).toBeTruthy();

      // ensure confirmation button is disabled initially
      expect(confirmationButton.disabled).toBe(true);

      // simulate typing the confirmation keyword
      fireEvent.change(textfield, { target: { value: "DELETE" } });

      // ensure confirmation button is now enabled
      expect(confirmationButton.disabled).toBe(false);
    });

    test("resets the input value on every open", () => {
      const { getByText, getAllByText } = render(
        <TestComponent
          confirmOptions={{
            confirmationKeyword: "DELETE"
          }}
        />
      );

      fireEvent.click(getByText("Delete"));

      let textfield = getAllByText((content, element) => {
        return element !== null && element.tagName.toLowerCase() === "input";
      })[0];

      expect(textfield).toBeTruthy();
      fireEvent.change(textfield, { target: { value: "DELETE" } });

      fireEvent.click(getByText("Yes"));

      fireEvent.click(getByText("Delete"));

      textfield = getAllByText((content, element) => {
        return element !== null && element.tagName.toLowerCase() === "input";
      })[0];

      expect((textfield as HTMLInputElement).value).toEqual("");
    });

    test("renders textfield with custom props", () => {
      const { getByText, queryByPlaceholderText } = render(
        <TestComponent
          confirmOptions={{
            confirmationKeyword: "DELETE",
            confirmationKeywordTextFieldProps: {
              placeholder: "Custom placeholder"
            }
          }}
        />
      );

      fireEvent.click(getByText("Delete"));

      const textfield = queryByPlaceholderText("Custom placeholder");

      expect(textfield).toBeTruthy();
    });
  });

  describe("hide cancel button", () => {
    test("renders cancel button when hideCancelButton is false", () => {
      const { getByText } = render(
        <TestComponent
          confirmOptions={{
            hideCancelButton: false
          }}
        />
      );

      fireEvent.click(getByText("Delete"));
      const cancelButton = getByText("No");
      expect(cancelButton).toBeTruthy();
    });

    test("does not render cancel button when hideCancelButton is true", () => {
      const { getByText, queryByText } = render(
        <TestComponent
          confirmOptions={{
            hideCancelButton: true
          }}
        />
      );

      fireEvent.click(getByText("Delete"));
      const cancelButton = queryByText("No");
      expect(cancelButton).toBeFalsy();
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
