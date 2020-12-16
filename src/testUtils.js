import {
  fireEvent,
  waitForElementToBeRemoved,
  within
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Helper to select a material ui component
 */
export function selectMaterialUiSelectOption(element, optionText) {
  return new Promise(resolve => {
    // The the button that opens the dropdown, which is a sibling of the input
    const selectButton = element.parentNode.querySelector("[role=button]");

    // Open the select dropdown
    fireEvent.mouseDown(selectButton);

    // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
    const listbox = document.body.querySelector("ul[role=listbox]");

    // Click the list item
    const listItem = within(listbox).getByText(optionText);

    if (!listItem) throw new Error("No listItem");
    userEvent.click(listItem);

    // Wait for the listbox to be removed, so it isn't visible in subsequent calls
    waitForElementToBeRemoved(() =>
      document.body.querySelector("ul[role=listbox]")
    ).then(resolve);
  });
}
