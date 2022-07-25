import { render, screen, within } from "@testing-library/react";
import React from "react";
import TransferList from ".";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for TransferList
 * Provides state for the selectedItems
 */
const SelectedItemsWithState = ({
  items: itemsIn = ["Apples", "Pears", "Oranges"],
  onChange,
  selectedItem: selectedItemsIn = ["Apples"],
  ...rest
}) => {
  const [selectedItems, setSelectedItems] = React.useState(selectedItemsIn);
  const handleChange = selectedItem => {
    setSelectedItems(selectedItems);
    onChange && onChange(selectedItems);
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
  test("Search bar updates value", async () => {
    const user = userEvent.setup();
    const { container } = render(<SelectedItemsWithState />);

    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "pears");
    expect(inputBase.value).toBe("pears");
  });

  test("On click clearAll button should has text 'None Selected'", () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { container } = render(
      <SelectedItemsWithState onChange={onChange} selectedItem={[]} />
    );

    user.click(screen.queryByTestId("clear-all"));

    expect(container.querySelector(".MuiTypography-body1").textContent).toBe(
      "None Selected"
    );
  });

  test("on search sort the list items", async () => {
    const user = userEvent.setup();
    const { container } = render(<SelectedItemsWithState />);

    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "p");

    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem1");
    expect(items.length).toBe(2);
  });

  test("test selected item in the list", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <SelectedItemsWithState onChange={onChange} selectedItem={["Pears"]} />
    );

    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem1");

    await user.click(items[1]);
    expect(onChange).toHaveBeenCalledWith(["Pears"]);
  });

  test("On cancel selected item should show text 'None Selected'", () => {
    const user = userEvent.setup();

    const onChange = jest.fn();
    const { container } = render(
      <SelectedItemsWithState onChange={onChange} selectedItem={[]} />
    );

    user.click(screen.queryByTestId("close"));

    expect(container.querySelector(".MuiTypography-body1").textContent).toBe(
      "None Selected"
    );
  });
});
