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

    // test the source list heading
    expect(screen.getByText("Source List Label"));

    // test the target list heading
    expect(screen.getByText("Target List Label"));

    // test the subheadings under the two headings
    const zeroSelectedHeadings = screen.getAllByText("0 Selected");
    expect(zeroSelectedHeadings.length).toBe(2);
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

  test("search bar appears awlays both when the list has entries and when the list is empty", () => {
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
    expect(inputs.length).toBe(2);
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

    // test selected items heading remains the same and both headings for source and target are present
    const zeroSelectedHeadings = screen.getAllByText("0 Selected");
    expect(zeroSelectedHeadings.length).toBe(2);

    // get target list
    const targetList = screen.getByLabelText("Target List Label");
    // get all list entries
    const targetItems = within(targetList).getAllByRole("listitem");

    // test existence of target list items
    expect(targetItems[0].textContent).toBe("Apples");
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
    expect(screen.getByText("2 Selected"));

    // make sure target shows 0 selected
    const zeroSelectedHeading = screen.getAllByText("0 Selected");
    expect(zeroSelectedHeading.length).toBe(1);

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

    // test selected items heading are both the same for source and target with all items unselected
    const zeroSelectedHeadings = screen.getAllByText("0 Selected");
    expect(zeroSelectedHeadings.length).toBe(2);
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

    // rerender with selectedItems as ["Apples", "Pears"]
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

    // Check that no transfer occurred, since the selectedItems list is directly controlled
    // (no re-selection and transfer should happen unless selectedItems is updated)
    expect(transferFn).toHaveBeenCalledTimes(1); // onChange should only be called once (on initial transfer)
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

  test("search for an item, check it, clear search, and verify selection", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get search input
    const searchInput = screen.getAllByLabelText("Search");

    // search for "Pears"
    await user.type(searchInput[0], "Pears");

    // get filtered list
    const sourceList = screen.getByLabelText("Source List Label");

    // find the list item that contains "Pears"
    const pearsItem = within(sourceList)
      .getAllByRole("listitem")
      .find(item => within(item).queryByText("Pears"));

    if (pearsItem) {
      // get the checkbox
      const pearsCheckbox = within(pearsItem).getByRole("checkbox");

      // check "Pears"
      await user.click(pearsCheckbox);
      expect(pearsCheckbox).toHaveProperty("checked", true);
    }

    // clear search
    const clearButton = screen.getByLabelText("clear search");
    await user.click(clearButton);

    // get all items in source list after clearing search
    const allItems = within(sourceList).getAllByRole("listitem");

    // verify only "Pears" remains checked
    allItems.forEach(item => {
      // get the checkboxes
      const checkbox = within(item).getByRole("checkbox");

      // check for the item text content
      if (item?.textContent?.includes("Pears")) {
        // if the text is "Pears" the checkbox should be checked
        expect(checkbox).toHaveProperty("checked", true);
      } else {
        // if the text is not "Pears" the checkbox should be false
        expect(checkbox).toHaveProperty("checked", false);
      }
    });
  });

  test("user selects an item, searches another, selects it, transfers both", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List"
        targetListLabel="Target List"
      />
    );

    const sourceList = screen.getByLabelText("Source List");
    const sourceItems = within(sourceList).getAllByRole("listitem");

    // select first item
    await user.click(sourceItems[0]);

    // get search input
    const searchInput = screen.getAllByLabelText("Search");
    await user.type(searchInput[0], "Pears");

    // select the searched item
    const filteredItems = within(sourceList).getAllByRole("listitem");
    await user.click(filteredItems[0]);

    // ensure label shows correct selected count
    const selected = screen.getByText("2 Selected");
    expect(selected).not.toBeNull();

    // transfer items
    await user.click(screen.getByLabelText("transfer to target list"));

    // verify items moved to target list
    const targetList = screen.getByLabelText("Target List");
    const targetItems = within(targetList).getAllByRole("listitem");
    expect(targetItems.length).toBe(2);
  });

  test("select all toggles correctly with search", async () => {
    // render component
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List"
        targetListLabel="Target List"
      />
    );

    const sourceList = screen.getByLabelText("Source List");

    // select 'Oranges'
    await user.click(within(sourceList).getByText("Oranges"));

    // get search input
    const searchInput = screen.getAllByLabelText("Search");
    await user.type(searchInput[0], "Apples");

    // select all and check if we have 2 selected("Oranges" and "Apples")
    const selectAllCheckbox = screen.getByLabelText(
      "select all source list items"
    );
    await user.click(selectAllCheckbox);
    expect(screen.getByText("2 Selected")).not.toBeNull();

    // deselect all
    await user.click(selectAllCheckbox);

    // check if now only one have been left as selected("Oranges")
    expect(screen.getByText("1 Selected")).not.toBeNull();

    // select all again and clear search
    await user.click(selectAllCheckbox);
    await user.type(searchInput[0], "{selectall}{backspace}");

    // assert that after the search is cleared we still have both "Apples" and "Oranges" selected
    expect(screen.getByText("2 Selected")).not.toBeNull();

    // deselect all
    await user.click(selectAllCheckbox);

    // make sure both source target shows 0 selected after the diselection
    const zeroSelectedHeadings = screen.getAllByText("0 Selected");
    expect(zeroSelectedHeadings.length).toBe(1);
  });

  test("select all only affects its own list", async () => {
    const user = userEvent.setup();

    render(
      <TransferList
        items={defaultItemArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get source and target lists
    const sourceList = screen.getByLabelText("Source List Label");
    const targetList = screen.getByLabelText("Target List Label");

    // verify source list has items
    const sourceItems = within(sourceList).getAllByRole("listitem");
    expect(sourceItems.length).toBe(3);

    // select all checkboxes for source
    const selectAllSource = within(
      screen.getByLabelText("select all source list items")
    ).getByRole("checkbox") as HTMLInputElement;

    // select all checkboxes for target
    const selectAllTarget = within(
      screen.getByLabelText("select all target list items")
    ).getByRole("checkbox") as HTMLInputElement;

    // ensure source select all is enabled and target select all is disabled
    expect(selectAllSource.disabled).toBe(false);
    expect(selectAllTarget.disabled).toBe(true);

    // select all in source list
    await user.click(selectAllSource);
    expect(screen.getByText("3 Selected")).toBeTruthy();
    expect(selectAllSource).toHaveProperty("checked", true);

    // get transfer button and move items to target list
    const transferButton = screen.getByLabelText("transfer to target list");
    await user.click(transferButton);

    // verify target list now has items
    const targetItems = within(targetList).getAllByRole("listitem");
    expect(targetItems.length).toBe(3);

    // ensure target select all is now enabled and source is disabled
    expect(selectAllSource.disabled).toBe(true);
    expect(selectAllTarget.disabled).toBe(false);

    // verify source list select all is unchecked and unaffected by the target check
    expect(selectAllSource).toHaveProperty("checked", false);

    // select all in target list
    await user.click(selectAllTarget);
    expect(screen.getByText("3 Selected")).toBeTruthy();
    expect(selectAllTarget).toHaveProperty("checked", true);
  });

  test("select two items from each list independently", async () => {
    // array with more items
    const itemsArray = [
      { key: "Apples", primaryLabel: "Apples" },
      { key: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
      { key: "Oranges", primaryLabel: "Oranges" },
      { key: "Pineapple", primaryLabel: "Pineapple" }
    ];

    // render the component
    const user = userEvent.setup();

    render(
      <TransferList
        items={itemsArray}
        sourceListLabel="Source List Label"
        targetListLabel="Target List Label"
      />
    );

    // get source and target lists
    const sourceList = screen.getByLabelText("Source List Label");
    const targetList = screen.getByLabelText("Target List Label");

    // verify source list has items
    const sourceItems = within(sourceList).getAllByRole("listitem");
    expect(sourceItems.length).toBe(4);

    // select first two items in the source list
    const sourceCheckboxes = within(sourceList).getAllByRole(
      "checkbox"
    ) as HTMLInputElement[];
    await user.click(sourceCheckboxes[0]);
    await user.click(sourceCheckboxes[1]);

    // verify two items are selected in source
    expect(screen.getByText("2 Selected")).toBeTruthy();

    // move selected items to target list
    const transferButton = screen.getByLabelText("transfer to target list");
    await user.click(transferButton);

    // verify target list now has 2 items
    const targetItems = within(targetList).getAllByRole("listitem");
    expect(targetItems.length).toBe(2);

    // ensure source still has the remaining items
    const updatedSourceItems = within(sourceList).getAllByRole("listitem");
    expect(updatedSourceItems.length).toBe(2);

    // select first two items in the source list again
    const sourceCheckboxesAgain = within(sourceList).getAllByRole(
      "checkbox"
    ) as HTMLInputElement[];
    await user.click(sourceCheckboxesAgain[0]);
    await user.click(sourceCheckboxesAgain[1]);

    // select first two items in the target list
    const targetCheckboxes = within(targetList).getAllByRole(
      "checkbox"
    ) as HTMLInputElement[];
    await user.click(targetCheckboxes[0]);
    await user.click(targetCheckboxes[1]);

    // verify two items are selected in source and in target
    const selectedItems = screen.getAllByText("2 Selected");
    expect(selectedItems.length).toBe(2);
  });

  test("calls onAdd when items are transferred to the target list", async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    const onAddMock = vi.fn();

    // render the transfer list component with onAdd mock function
    render(
      <TransferList
        items={defaultItemArray}
        onAdd={onAddMock}
        onChange={onChangeMock}
        sourceListLabel="Source"
        targetListLabel="Target"
      />
    );

    // get the source list
    const sourceList = screen.getByLabelText("Source");

    // select only 'Apples' in the list
    await user.click(within(sourceList).getByText("Apples"));

    // get the transfer to target button
    const transferToTargetButton = screen.getByLabelText(
      "transfer to target list"
    );

    // click the transfer button to move items to the target list
    await user.click(transferToTargetButton);

    // check that onChange was called with the correct items in the target list
    expect(onChangeMock).toHaveBeenCalledWith([
      { key: "Apples", primaryLabel: "Apples" }
    ]);

    // check that onAdd was called with the correct items
    expect(onAddMock).toHaveBeenCalledWith([
      { key: "Apples", primaryLabel: "Apples" }
    ]);

    // select only 'Oranges' in the list
    await user.click(within(sourceList).getByText("Oranges"));

    // click the transfer button to move items to the target list
    await user.click(transferToTargetButton);

    // check that onChange was called with the correct items in the target list
    expect(onChangeMock).toHaveBeenCalledWith([
      { key: "Apples", primaryLabel: "Apples" },
      { key: "Oranges", primaryLabel: "Oranges" }
    ]);

    // check that onAdd was called with the correct items
    expect(onAddMock).toHaveBeenCalledWith([
      { key: "Oranges", primaryLabel: "Oranges" }
    ]);
  });

  test("calls onRemove when some items are transferred back to the source list", async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    const onRemoveMock = vi.fn();

    // render the transfer list component with selected items and onRemove mock function
    render(
      <TransferList
        items={defaultItemArray}
        selectedItems={["Apples", "Pears", "Oranges"]}
        onChange={onChangeMock}
        onRemove={onRemoveMock}
        sourceListLabel="Source"
        targetListLabel="Target"
      />
    );

    // get the target list
    const targetList = screen.getByLabelText("Target");

    // select only 'Apples' in the list
    await user.click(within(targetList).getByText("Apples"));

    // get the transfer to source button
    const transferToSourceButton = screen.getByLabelText(
      "transfer to source list"
    );

    // click the transfer button to move "Apples" back to the source list
    await user.click(transferToSourceButton);

    // check that onChange was called with the remaining items in the target list
    expect(onChangeMock).toHaveBeenCalledWith([
      { key: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
      { key: "Oranges", primaryLabel: "Oranges" }
    ]);

    // check that onRemove was called with the correct items
    expect(onRemoveMock).toHaveBeenCalledWith([
      {
        key: "Apples",
        primaryLabel: "Apples"
      }
    ]);
  });
});
