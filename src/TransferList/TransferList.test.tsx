import { render, screen, within } from "@testing-library/react";

import React from "react";
import TransferList from ".";
import { TransferListProps } from "./TransferList.types";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for TransferList
 * Provides state for the selectedItems
 */
const SelectedItemsWithState = ({
  items: itemsIn = ["Apples", "Pears", "Oranges"],
  onChange,
  selectedItems: selectedItemsIn = ["Apples"],
  ...rest
}: TransferListProps) => {
  const [selectedItems, setSelectedItems] = React.useState(selectedItemsIn);
  const handleChange: TransferListProps["onChange"] = newSelections => {
    setSelectedItems(newSelections);
    onChange && onChange(newSelections);
  };
  return (
    <TransferList
      {...rest}
      items={itemsIn}
      onChange={handleChange}
      selectedItems={selectedItems}
    />
  );
};

describe("TransferList", () => {
  test("Clicking clear all button clears selections", async () => {
    // render component
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { container } = render(
      <SelectedItemsWithState onChange={onChange} />
    );

    // click clear button
    const button = screen.getByTestId("clear-all-button");
    await user.click(button);

    // check selections have been cleared
    expect(container.querySelector(".MuiTypography-body1")?.textContent).toBe(
      "None Selected"
    );
    expect(onChange).toHaveBeenCalledWith([]);
  });

  test("Search filters the list items", async () => {
    // render component
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { container } = render(
      <SelectedItemsWithState onChange={onChange} />
    );

    // type in search input
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, "p");

    // check if the left list has been filtered
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem1");
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("Pears");
  });

  test("Can select a list item", async () => {
    // render component
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <SelectedItemsWithState
        onChange={onChange}
        items={["Apples", "Pears", "Oranges"]}
        selectedItems={[]}
      />
    );

    // select item
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem1");
    await user.click(items[1]);

    // check if the item has been selected
    expect(onChange).toHaveBeenCalledWith(["Pears"]);
  });

  test("Can remove a list item selection", async () => {
    // render component
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { container } = render(
      <SelectedItemsWithState onChange={onChange} />
    );

    // remove selected item
    const listItem = screen.getByRole("listitem2");
    await user.click(listItem);

    // check selections have been cleared
    expect(container.querySelector(".MuiTypography-body1")?.textContent).toBe(
      "None Selected"
    );
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
