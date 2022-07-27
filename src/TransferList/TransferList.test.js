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
  test("On click clearAll button should has text 'None Selected'", () => {
    // render component
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { container } = render(
      <SelectedItemsWithState onChange={onChange} />
    );

    // click clear button
    user.click(screen.queryByTestId("clear-all"));

    // check selections have been cleared
    expect(container.querySelector(".MuiTypography-body1").textContent).toBe(
      "None Selected"
    );
    expect(onChange).toHaveBeenCalledWith([]);
  });

  test("on search filter the list items", async () => {
    // render component
    const user = userEvent.setup();
    const { container } = render(<SelectedItemsWithState />);

    // type in search input
    const inputBase = container.querySelector(".MuiInputBase-input");
    await user.type(inputBase, "p");

    // check if the list has been filtered
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem1");
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("Pears");
  });

  test("test selected item in the list", async () => {
    // render component
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <SelectedItemsWithState
        onChange={onChange}
        items={["Apples", "Pears", "Oranges"]}
        selectedItem={[]}
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

  test("On cancel selected item should show text 'None Selected'", () => {
    // render component
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { container } = render(
      <SelectedItemsWithState onChange={onChange} selectedItem={[]} />
    );

    // click close button
    user.click(screen.queryByTestId("close"));

    // check selections have been cleared
    expect(container.querySelector(".MuiTypography-body1").textContent).toBe(
      "None Selected"
    );
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
