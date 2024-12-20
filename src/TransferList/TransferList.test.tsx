import { describe, expect, test, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

import React from "react";
import TransferList from ".";
import userEvent from "@testing-library/user-event";

// item array using an object array structure
const defaultItemArray = [
  { key: "Apples", primaryLabel: "Apples" },
  { key: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
  { key: "Oranges", primaryLabel: "Oranges" }
];

// item array using strings
const stringItemArray = ["Apples", "Pears", "Oranges"];

describe("TransferList", () => {
  test("list of unfiltered items in the source list", () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get list
    const list = screen.getByLabelText("Source List Label");

    // get all list entries
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");

    // test existence of correct list items
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("PearsConference");
    expect(items[2].textContent).toBe("Oranges");
  });

  test("list heading text", () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // test the source list heading and subheading
    expect(screen.getByText("Source List Label"));
    expect(screen.getByText("0/3 selected"));

    // test the target list heading and subheading
    expect(screen.getByText("Target List Label"));
    expect(screen.getByText("0/0 selected"));
  });

  test("transfer buttons are disabled by default", () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
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
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get search bar
    const input = screen.getAllByLabelText("Search");

    // get list entries
    const list = screen.getByLabelText("Source List Label");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");

    // get initially rendered list
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("PearsConference");
    expect(items[2].textContent).toBe("Oranges");

    // Filter the list
    await user.type(input[0], "p");

    // check if the source list has been filtered
    const filteredItems = getAllByRole("listitem");
    expect(filteredItems[2]).toBeUndefined();
  });

  test("search bar only appears when the list has entries", () => {
    render(
      <TransferList
        items={defaultItemArray}
        defaultSelectedItems={["Apples", "Pears", "Oranges"]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
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
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get search bar
    const input = screen.getAllByLabelText("Search");

    // get list entries
    const list = screen.getByLabelText("Source List Label");
    const { getAllByRole } = within(list);

    // filter the list
    await user.type(input[0], "p");

    // clear the filter
    const clearButton = screen.getByLabelText("clear search");
    await user.click(clearButton);

    // test if the source list has been unfiltered
    const items = getAllByRole("listitem");
    expect(items[0].textContent).toBe("Apples");
    expect(items[1].textContent).toBe("PearsConference");
    expect(items[2].textContent).toBe("Oranges");
  });

  test("renders items in the target list and not the source list if selected items are provided", () => {
    // render component
    render(
      <TransferList
        items={defaultItemArray}
        defaultSelectedItems={["Apples"]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get source list
    const sourceList = screen.getByLabelText("Source List Label");
    // get all list entries
    const sourceItems = within(sourceList).getAllByRole("listitem");

    // test existence of source list items
    expect(sourceItems[0].textContent).toBe("PearsConference");
    expect(sourceItems[1].textContent).toBe("Oranges");

    // test selected items heading remains the same
    expect(screen.getByText("0/2 selected"));

    // get target list
    const targetList = screen.getByLabelText("Target List Label");
    // get all list entries
    const targetItems = within(targetList).getAllByRole("listitem");

    // test existence of target list items
    expect(targetItems[0].textContent).toBe("Apples");
    expect(screen.getByText("0/1 selected"));
  });

  test("clicked items toggle correctly, enable the relevant transfer button and update the heading", async () => {
    // render component
    const user = userEvent.setup();
    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get list entries
    const list = screen.getByLabelText("Source List Label");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");

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

    // click first two items in list for a second time
    await user.click(items[0]);
    await user.click(items[1]);

    // test checked status of checkboxes
    expect(within(items[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(within(items[1]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(within(items[2]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );

    // test subheading is correct
    expect(screen.getByText("0/3 selected"));
  });

  test("if uncontrolled, checked items transfer from source to target list and uncheck", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get list entries
    const sourceList = screen.getByLabelText("Source List Label");
    const sourceItems = within(sourceList).getAllByRole("listitem");

    // get transfer to target button
    const transferToTargetButton = screen.getByLabelText(
      "transfer to target list"
    );

    // test the list entries
    expect(sourceItems.length).toBe(3);
    expect(sourceItems[0].textContent).toBe("Apples");
    expect(sourceItems[1].textContent).toBe("PearsConference");
    expect(sourceItems[2].textContent).toBe("Oranges");

    // click first two items in list
    await user.click(sourceItems[0]);
    await user.click(sourceItems[1]);

    // click transfer button
    await user.click(transferToTargetButton);

    // get target entries
    const targetList = screen.getByLabelText("Target List Label");
    const targetItems = within(targetList).getAllByRole("listitem");

    // test the target entries
    expect(targetItems.length).toBe(2);
    expect(targetItems[0].textContent).toBe("Apples");
    expect(targetItems[1].textContent).toBe("PearsConference");

    // check updated source entries
    const updatedSourceList = screen.getByLabelText("Source List Label");
    const updatedSourceItems =
      within(updatedSourceList).getAllByRole("listitem");

    // test the updated entries
    expect(updatedSourceItems.length).toBe(1);
    expect(updatedSourceItems[0].textContent).toBe("Oranges");

    // test that everything is unchecked
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

  test("if controlled, checked items do not transfer unless selected items is updated", async () => {
    // render component
    const user = userEvent.setup();

    // transfer function
    const transferFn = vi.fn();

    const { rerender } = render(
      <TransferList
        items={defaultItemArray}
        onChange={transferFn}
        selectedItems={[]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get list entries
    const sourceList = screen.getByLabelText("Source List Label");
    const sourceItems = within(sourceList).getAllByRole("listitem");
    const targetList = screen.getByLabelText("Target List Label");
    const targetItems = within(targetList).queryAllByRole("listitem");

    // get transfer to target button
    const transferToTargetButton = screen.getByLabelText(
      "transfer to target list"
    );

    // Test the list lengths
    expect(sourceItems.length).toBe(3);
    expect(targetItems.length).toBe(0);

    // click first two items in list
    await user.click(sourceItems[0]);
    await user.click(sourceItems[1]);

    // click transfer button
    await user.click(transferToTargetButton);

    // get unchanged list entries
    const unchangedSourceItems = within(sourceList).getAllByRole("listitem");
    const unchangedTargetItems = within(targetList).queryAllByRole("listitem");

    // test onChange was called with the correct items
    expect(transferFn).toHaveBeenCalledWith([
      { key: "Apples", primaryLabel: "Apples" },
      { key: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" }
    ]);

    // test the list lengths remain the same
    expect(unchangedSourceItems.length).toBe(3);
    expect(unchangedTargetItems.length).toBe(0);

    rerender(
      <TransferList
        items={defaultItemArray}
        onChange={transferFn}
        selectedItems={["Apples", "Pears"]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get updated target entries
    const updatedSourceItems = within(sourceList).queryAllByRole("listitem");
    const updatedTargetItems = within(targetList).getAllByRole("listitem");

    // test that selected items has updated the lists
    expect(updatedSourceItems.length).toBe(1);
    expect(updatedTargetItems.length).toBe(2);

    // test that everything is unchecked
    expect(within(updatedSourceItems[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(within(updatedTargetItems[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(within(updatedTargetItems[1]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
  });

  test("select all checkboxes are disabled unless the relevant list has entries", () => {
    // render component
    render(
      <TransferList
        items={[]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get both checkboxes in the headers
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

  test("source list select all checkbox selects all the source list items", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
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
    const sourceList = screen.getByLabelText("Source List Label");
    const sourceItems = within(sourceList).getAllByRole("listitem");

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

  test("source list select all checkbox clears the source list items if all are selected", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
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

    // click select all source checkbox a second time
    await user.click(selectAllSourceCheckbox);

    // check updated source entries
    const sourceList = screen.getByLabelText("Source List Label");
    const sourceItems = within(sourceList).getAllByRole("listitem");

    // all source list elements should be checked
    expect(within(sourceItems[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(within(sourceItems[1]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
    expect(within(sourceItems[2]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
  });

  test("target list select all checkbox checks all the selected list items", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        defaultSelectedItems={["Apples", "Pears", "Oranges"]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
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
    const targetList = screen.getByLabelText("Target List Label");
    const targetItems = within(targetList).getAllByRole("listitem");

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

  test("target list select all checkbox clears the selected list items if all are selected", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        defaultSelectedItems={["Apples", "Pears", "Oranges"]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get checkboxes
    const selectAllTargetCheckbox = within(
      screen.getByLabelText("select all target list items")
    ).getByRole("checkbox");

    // click select all target checkbox
    await user.click(selectAllTargetCheckbox);

    // click select all target checkbox a second time
    await user.click(selectAllTargetCheckbox);

    // check updated source entries
    const targetList = screen.getByLabelText("Target List Label");
    const targetItems = within(targetList).getAllByRole("listitem");

    // all source list elements should be checked
    expect(within(targetItems[0]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );

    expect(within(targetItems[1]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );

    expect(within(targetItems[2]).getByRole("checkbox")).toHaveProperty(
      "checked",
      false
    );
  });

  test("transfer to target fires onChange callback with selected items", async () => {
    // render component
    const user = userEvent.setup();
    // transfer function
    const transferFn = vi.fn();

    render(
      <TransferList
        items={defaultItemArray}
        onChange={transferFn}
        defaultSelectedItems={["Apples", "Pears", "Oranges"]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
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
    expect(transferFn).toHaveBeenCalledWith([]);

    // select all the source list items
    await user.click(selectAllSourceCheckbox);

    // get transfer to target button
    const transferToTargetButton = screen.getByLabelText(
      "transfer to target list"
    );

    // transfer all source list items to target
    await user.click(transferToTargetButton);

    // check the callback data
    expect(transferFn).toHaveBeenCalledWith([
      { key: "Apples", primaryLabel: "Apples" },
      { key: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
      { key: "Oranges", primaryLabel: "Oranges" }
    ]);
  });

  test("transfer to source fires onChange callback with selected items array", async () => {
    // render component
    const user = userEvent.setup();
    // transfer function
    const transferFn = vi.fn();

    render(
      <TransferList
        items={defaultItemArray}
        onChange={transferFn}
        selectedItems={["Apples", "Pears", "Oranges"]}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
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
    expect(transferFn).toHaveBeenCalledWith([]);
  });

  test("accepts array of strings as items and returns them", async () => {
    // render component
    const user = userEvent.setup();

    // transfer function
    const transferFn = vi.fn();

    render(
      <TransferList
        items={stringItemArray}
        onChange={transferFn}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get all source checkbox
    const selectAllSourceCheckbox = within(
      screen.getByLabelText("select all source list items")
    ).getByRole("checkbox");

    // select all the target list items
    await user.click(selectAllSourceCheckbox);

    // get transfer to source button
    const transferToTargetButton = screen.getByLabelText(
      "transfer to target list"
    );

    // transfer all target list items to source
    await user.click(transferToTargetButton);

    // check the callback data
    expect(transferFn).toHaveBeenCalledWith(["Apples", "Pears", "Oranges"]);
  });
});
