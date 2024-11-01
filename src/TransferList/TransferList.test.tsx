import { describe, expect, test, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

import React from "react";
import TransferList from ".";
import userEvent from "@testing-library/user-event";

// item array using the default object array structure
const defaultItemArray = [
  { id: "Apples", label: "Apples" },
  { id: "Pears", label: "Pears" },
  { id: "Oranges", label: "Oranges" }
];

// item array using strings
const stringItemArray = ["Apples", "Pears", "Oranges"];

// item array using custom object array structure
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
    fruit: "Oranges",
    key: "c"
  }
];

describe("TransferList", () => {
  test("list of unfiltered items in the source list", () => {
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

    // test existence of correct list items
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("Pears");
    expect(items[2].textContent).toBe("Oranges");
  });

  test("list heading text", () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // test the source list heading and subheading
    expect(screen.getByText("My Source List"));
    expect(screen.getByText("0/3 selected"));

    // test the target list heading and subheading
    expect(screen.getByText("My Target List"));
    expect(screen.getByText("0/0 selected"));
  });

  test("transfer buttons are disabled by default", () => {
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

  test("source search bar filters the source list", async () => {
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
    const input = screen.getAllByLabelText("Search");

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

  test("search bar only appears when the list has entries", () => {
    render(
      <TransferList
        items={defaultItemArray}
        targetListKeys={["Apples", "Pears", "Oranges"]}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get search bar
    const inputs = screen.getAllByLabelText("Search");

    // Check that only one search bar is rendered
    expect(inputs.length).toBe(1);
  });

  test("clearing the source filter brings back the full source list", async () => {
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
    const input = screen.getAllByLabelText("Search");

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

  test("renders items in target list and not source list if keys provided in prop", () => {
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

  test("clicked items check correctly, enable transfer button and update the heading", async () => {
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

    // test subheading is correct
    expect(screen.getByText("2/3 selected"));
  });

  test("checked items transfer from source to target list and uncheck", async () => {
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

  test("header check all checkboxes are disabled unless the list has entries", () => {
    // render component
    render(
      <TransferList
        items={[]}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get both check all checkboxes
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

  test("source list check all checkbox selects all the source list items", async () => {
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

    // test transfer buttons exist and are disabled and enabled correctly
    expect(selectAllSourceCheckbox).toHaveProperty("disabled", false);

    // click select all source checkbox
    await user.click(selectAllSourceCheckbox);

    // check updated source entries
    const sourceList = screen.getByRole("source-list");
    const sourceItems = within(sourceList).getAllByRole("source-list-item");

    // all source list elements should be checked
    expect(within(sourceItems[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      true
    );
    expect(within(sourceItems[1]).getByRole("checkbox")).toHaveProperty(
      "checked",
      true
    );
    expect(within(sourceItems[2]).getByRole("checkbox")).toHaveProperty(
      "checked",
      true
    );
  });

  test("target list check all checks all the target list items", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        targetListKeys={["Apples", "Pears", "Oranges"]}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get checkboxes
    const selectAllTargetCheckbox = within(
      screen.getByLabelText("select all target list items")
    ).getByRole("checkbox");

    // test transfer buttons exist and are disabled and enabled correctly
    expect(selectAllTargetCheckbox).toHaveProperty("disabled", false);

    // click select all target checkbox
    await user.click(selectAllTargetCheckbox);

    // check updated source entries
    const targetList = screen.getByRole("target-list");
    const targetItems = within(targetList).getAllByRole("target-list-item");

    // all source list elements should be checked
    expect(within(targetItems[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      true
    );

    expect(within(targetItems[1]).getByRole("checkbox")).toHaveProperty(
      "checked",
      true
    );

    expect(within(targetItems[2]).getByRole("checkbox")).toHaveProperty(
      "checked",
      true
    );
  });

  test("call onTransfer callback with data and intent", async () => {
    // render component
    const user = userEvent.setup();
    // transfer function
    const transferFn = vi.fn();

    render(
      <TransferList
        items={defaultItemArray}
        onTransfer={transferFn}
        targetListKeys={["Apples", "Pears", "Oranges"]}
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
    expect(selectAllSourceCheckbox).toHaveProperty("disabled", true);
    expect(selectAllTargetCheckbox).toHaveProperty("disabled", false);

    // select all the target list items
    await user.click(selectAllTargetCheckbox);

    // get transfer to source button
    const transferToSourceButton = screen.getByLabelText(
      "transfer to source list"
    );

    // transfer all target list items to source
    await user.click(transferToSourceButton);

    // check the callback data
    expect(transferFn).toHaveBeenCalledWith(
      ["Apples", "Pears", "Oranges"],
      "toSource"
    );

    // select all the source list items
    await user.click(selectAllSourceCheckbox);

    // get transfer to target button
    const transferToTargetButton = screen.getByLabelText(
      "transfer to target list"
    );

    // transfer all source list items to target
    await user.click(transferToTargetButton);

    // check the callback data
    expect(transferFn).toHaveBeenCalledWith(
      ["Apples", "Pears", "Oranges"],
      "toTarget"
    );
  });

  test("call handleTransfer callback with data and intent", async () => {
    // render component
    const user = userEvent.setup();
    // transfer function
    const transferFn = vi.fn();

    render(
      <TransferList
        items={defaultItemArray}
        handleTransfer={transferFn}
        targetListKeys={["Apples", "Pears", "Oranges"]}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get select all target checkbox
    const selectAllTargetCheckbox = within(
      screen.getByLabelText("select all target list items")
    ).getByRole("checkbox");

    // select all the target list items
    await user.click(selectAllTargetCheckbox);

    // get transfer to source button
    const transferToSourceButton = screen.getByLabelText(
      "transfer to source list"
    );

    // transfer all target list items to source
    await user.click(transferToSourceButton);

    // check the callback data
    expect(transferFn).toHaveBeenCalledWith(
      ["Apples", "Pears", "Oranges"],
      "toSource"
    );
  });

  test("accepts array of strings as items", async () => {
    // render component
    const user = userEvent.setup();
    // transfer function
    const transferFn = vi.fn();

    render(
      <TransferList
        items={stringItemArray}
        onTransfer={transferFn}
        targetListKeys={["Apples", "Pears", "Oranges"]}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    const selectAllTargetCheckbox = within(
      screen.getByLabelText("select all target list items")
    ).getByRole("checkbox");

    // select all the target list items
    await user.click(selectAllTargetCheckbox);

    // get transfer to source button
    const transferToSourceButton = screen.getByLabelText(
      "transfer to source list"
    );

    // transfer all target list items to source
    await user.click(transferToSourceButton);

    // check the callback data
    expect(transferFn).toHaveBeenCalledWith(
      ["Apples", "Pears", "Oranges"],
      "toSource"
    );
  });

  test("accepts any object type with a filterKey and item label function", async () => {
    // render component
    const user = userEvent.setup();
    // transfer function
    const transferFn = vi.fn();

    render(
      <TransferList
        filterKey={item => item.key}
        itemLabel={item => item.fruit}
        items={customItemArray}
        onTransfer={transferFn}
        targetListKeys={["a", "b", "c"]}
        sourceListLabel="My Source List"
        targetListLabel="My Target List"
      />
    );

    // get select all target checkbox
    const selectAllTargetCheckbox = within(
      screen.getByLabelText("select all target list items")
    ).getByRole("checkbox");

    // select all the target list items
    await user.click(selectAllTargetCheckbox);

    // get transfer to source button
    const transferToSourceButton = screen.getByLabelText(
      "transfer to source list"
    );

    // transfer all target list items to source
    await user.click(transferToSourceButton);

    // check the callback data
    expect(transferFn).toHaveBeenCalledWith(["a", "b", "c"], "toSource");
  });
});
