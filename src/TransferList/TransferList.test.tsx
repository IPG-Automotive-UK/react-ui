import { describe, expect, test } from "vitest";
import { getByLabelText, render, screen, within } from "@testing-library/react";

import React from "react";
import TransferList from ".";
import { TransferListProps } from "./TransferList.types";
import userEvent from "@testing-library/user-event";

const defaultItemArray = [
  { id: "Apples", label: "Apples" },
  { id: "Pears", label: "Pears" },
  { id: "Oranges", label: "Oranges" }
];

const stringItemArray = ["Apples", "Pears", "Oranges"];

const customItemArray = [
  {
    fruit: "Apples",
    key: "a"
  },
  {
    fruit: "Pears",
    key: "b"
  },
  {
    fruit: "oranges",
    key: "c"
  }
];

// /**
//  * Test wrapper for TransferList
//  * Provides state for the selectedItems
//  */
// const SelectedItemsWithState = ({
//   items: itemsIn = [
//     { key: "Apples", label: "Apples" },
//     { key: "Pears", label: "Pears" },
//     { key: "Oranges", label: "Oranges" }
//   ],
//   onChange,
//   selectedItems: selectedItemsIn = ["Apples"],
//   ...rest
// }: TransferListProps) => {
//   const [selectedItems, setSelectedItems] = React.useState(selectedItemsIn);
//   const handleChange: TransferListProps["onChange"] = newSelections => {
//     setSelectedItems(newSelections);
//     onChange && onChange(newSelections);
//   };
//   return (
//     <TransferList
//       {...rest}
//       filterKey={item => item.key}
//       itemLabel={item => item.label}
//       items={itemsIn}
//       onChange={handleChange}
//       selectedItems={selectedItems}
//     />
//   );
// };

describe("TransferList", () => {
  // test("Clicking clear all button clears selections", async () => {
  //   // render component
  //   const user = userEvent.setup();
  //   const onChange = vi.fn();
  //   const { container } = render(
  //     <SelectedItemsWithState onChange={onChange} />
  //   );

  //   // click clear button
  //   const button = screen.getByTestId("clear-all-button");
  //   await user.click(button);

  //   // check selections have been cleared
  //   expect(container.querySelector(".MuiTypography-body1")?.textContent).toBe(
  //     "None Selected"
  //   );
  //   expect(onChange).toHaveBeenCalledWith([]);
  // });
  test("Renders a list of unfiltered items in the source list", async () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get list
    const list = screen.getByRole("source-list");
    // get all list entries
    const { getAllByRole } = within(list);
    const items = getAllByRole("source-list-item");

    // test existence of list items
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("Pears");
    expect(items[2].textContent).toBe("Oranges");
  });

  test("Renders correct heading text", () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // test existence of list items
    expect(screen.getByText("My Source List"));
    expect(screen.getByText("0/3 selected"));

    // test existence of list items
    expect(screen.getByText("My Target List"));
    expect(screen.getByText("0/0 selected"));
  });

  test("Renders disabled transfer buttons by default", () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // test transfer buttons exist and are disabled by default
    expect(screen.getByLabelText("transfer to target list")).toHaveProperty(
      "disabled",
      true
    );
    expect(screen.getByLabelText("transfer to source list")).toHaveProperty(
      "disabled",
      true
    );
  });

  test("Source search filters the source list", async () => {
    // render component
    const user = userEvent.setup();
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get search bar
    const input = screen.getAllByPlaceholderText("Search");

    // get list entries
    const list = screen.getByRole("source-list");
    const { getAllByRole } = within(list);
    const items = getAllByRole("source-list-item");

    // get initially rendered list
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("Pears");
    expect(items[2].textContent).toBe("Oranges");

    // Filter the list
    await user.type(input[0], "p");

    // check if the source list has been filtered
    const filteredItems = getAllByRole("source-list-item");
    expect(filteredItems[2]).toBeUndefined();

    // check that the selected items title remains the same
    expect(screen.getByText("0/3 selected"));
  });

  test("Clearing the source filter brings back the full source list", async () => {
    // render component
    const user = userEvent.setup();
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get search bar
    const input = screen.getAllByPlaceholderText("Search");

    // get list entries
    const list = screen.getByRole("source-list");
    const { getAllByRole } = within(list);

    // filter the list
    await user.type(input[0], "p");

    // clear the filter
    const clearButton = screen.getByLabelText("clear search");
    await user.click(clearButton);

    // check if the source list has been unfiltered
    const items = getAllByRole("source-list-item");
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("Pears");
    expect(items[2].textContent).toBe("Oranges");
  });

  test("Renders items in target list and not source list if keys provided in prop", () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        targetListKeys={["Apples"]}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get source list
    const sourceList = screen.getByRole("source-list");
    // get all list entries
    const sourceItems = within(sourceList).getAllByRole("source-list-item");

    // test existence of source list items
    expect(sourceItems[0].textContent).toBe("Pears");
    expect(sourceItems[1].textContent).toBe("Oranges");

    // test selected items heading remains the same
    expect(screen.getByText("0/2 selected"));

    // get target list
    const targetList = screen.getByRole("target-list");
    // get all list entries
    const targetItems = within(targetList).getAllByRole("target-list-item");

    // test existence of target list items
    expect(targetItems[0].textContent).toBe("Apples");
    expect(screen.getByText("0/1 selected"));
  });

  test("clicked items check correctly, enable transfer and update the heading", async () => {
    // render component
    const user = userEvent.setup();
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get list entries
    const list = screen.getByRole("source-list");
    const { getAllByRole } = within(list);

    // check if the source list has been unfiltered
    const items = getAllByRole("source-list-item");

    // click first two items in list
    await user.click(items[0]);
    await user.click(items[1]);

    // test button is enabled
    expect(screen.getByLabelText("transfer to target list")).toHaveProperty(
      "disabled",
      false
    );

    // test checked status of checkboxes
    expect(within(items[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      true
    );
    expect(within(items[1]).getByRole("checkbox")).toHaveProperty(
      "checked",
      true
    );
    expect(within(items[2]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(screen.getByText("2/3 selected"));
  });

  test("checked items transfer from source to target and uncheck", async () => {
    // render component
    const user = userEvent.setup();
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get list entries
    const sourceList = screen.getByRole("source-list");
    const sourceItems = within(sourceList).getAllByRole("source-list-item");

    // get transfer to target button
    const transferToTargetButton = screen.getByLabelText(
      "transfer to target list"
    );

    // click first two items in list
    expect(sourceItems.length).toBe(3);
    expect(sourceItems[0].textContent).toBe("Apples");
    expect(sourceItems[1].textContent).toBe("Pears");
    expect(sourceItems[2].textContent).toBe("Oranges");
    await user.click(sourceItems[0]);
    await user.click(sourceItems[1]);

    // click transfer button
    await user.click(transferToTargetButton);

    // get target entries
    const targetList = screen.getByRole("target-list");
    const targetItems = within(targetList).getAllByRole("target-list-item");
    expect(targetItems.length).toBe(2);
    expect(targetItems[0].textContent).toBe("Apples");
    expect(targetItems[1].textContent).toBe("Pears");

    // check updated source entries
    const updatedSourceList = screen.getByRole("source-list");
    const updatedSourceItems =
      within(updatedSourceList).getAllByRole("source-list-item");

    expect(updatedSourceItems.length).toBe(1);
    expect(updatedSourceItems[0].textContent).toBe("Oranges");

    // ensure everything is unchecked
    expect(within(updatedSourceItems[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(within(targetItems[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(within(targetItems[1]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
  });

  test("Check all checkboxes are disabled unless the list has entries", () => {
    // render component
    render(
      <TransferList
        items={[]}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    const selectAllSourceCheckbox = within(
      screen.getByLabelText("select all source list items")
    ).getByRole("checkbox");
    const selectAllTargetCheckbox = within(
      screen.getByLabelText("select all target list items")
    ).getByRole("checkbox");

    // test transfer buttons exist and are disabled by default
    expect(selectAllSourceCheckbox).toHaveProperty("disabled", true);
    expect(selectAllTargetCheckbox).toHaveProperty("disabled", true);
  });

  test("Check all checkboxes check all the list items", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get checkboxes
    const selectAllSourceCheckbox = within(
      screen.getByLabelText("select all source list items")
    ).getByRole("checkbox");
    const selectAllTargetCheckbox = within(
      screen.getByLabelText("select all target list items")
    ).getByRole("checkbox");

    // test transfer buttons exist and are disabled and enabled correctly
    expect(selectAllSourceCheckbox).toHaveProperty("disabled", false);
    expect(selectAllTargetCheckbox).toHaveProperty("disabled", true);

    //user.click(selectAllSourceCheckbox);
  });

  // test("the check all checkboxes check all the list items", async () => {
  //   const checkAllSource;
  // });

  // test("Search filters the list items", async () => {
  //   // render component
  //   const user = userEvent.setup();
  //   const onChange = vi.fn();
  //   const { container } = render(
  //     <SelectedItemsWithState onChange={onChange} />
  //   );

  //   // type in search input
  //   const inputBase = container.querySelector(
  //     ".MuiInputBase-input"
  //   ) as HTMLInputElement;
  //   await user.type(inputBase, "p");

  //   // check if the left list has been filtered
  //   const list = screen.getByRole("list");
  //   const { getAllByRole } = within(list);
  //   const items = getAllByRole("listitem1");
  //   expect(items[0].textContent).toBe("Apples");
  //   expect(items[1].textContent).toBe("Pears");
  // });

  // test("Can select a list item", async () => {
  //   // render component
  //   const user = userEvent.setup();
  //   const onChange = vi.fn();
  //   render(
  //     <SelectedItemsWithState
  //       onChange={onChange}
  //       items={["Apples", "Pears", "Oranges"]}
  //       selectedItems={[]}
  //     />
  //   );

  //   // select item
  //   const list = screen.getByRole("list");
  //   const { getAllByRole } = within(list);
  //   const items = getAllByRole("listitem1");
  //   await user.click(items[1]);

  //   // check if the item has been selected
  //   expect(onChange).toHaveBeenCalledWith(["Pears"]);
  // });

  // it("Can remove a list item selection", async () => {
  //   // render component
  //   const user = userEvent.setup();
  //   const onChange = vi.fn();
  //   render(
  //     <SelectedItemsWithState
  //       onChange={onChange}
  //       items={["Apples", "Pears", "Oranges"]}
  //       selectedItems={[]}
  //     />
  //   );

  //   // select item
  //   const list = screen.getByRole("list");
  //   const { getAllByRole } = within(list);
  //   const items = getAllByRole("listitem1");
  //   await user.click(items[1]);

  //   // check if the item has been selected
  //   expect(onChange).toHaveBeenCalledWith(["Pears"]);

  //   // find the IconButton by its data-testid attribute
  //   const deleteButtons = screen.getAllByTestId("close");

  //   // trigger a click event on the IconButton
  //   fireEvent.click(deleteButtons[0]);

  //   // check if the onChange function was called with an empty array (selection removed)
  //   expect(onChange).toHaveBeenCalledWith([]);

  //   // check if the "None Selected" text is displayed
  //   expect(screen.getByTestId("none-selected")).toBeInTheDocument();
  // });
});
