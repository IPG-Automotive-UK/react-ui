import { render, screen } from "@testing-library/react";

import LabelSelector from "./";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for LabelSelector
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const LabelSelectorWithState = ({ onChange, value: valueIn = [], ...rest }) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = selectedValues => {
    setValue(selectedValues);
    onChange(selectedValues);
  };

  return <LabelSelector {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("LabelSelector", () => {
  // test that the label selector renders
  it("renders", () => {
    render(<LabelSelectorWithState options={[]} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  // test that the label selector renders with options
  it("renders with options", async () => {
    const options = [
      {
        _id: "1",
        color: "#005FA8",
        description: "first label",
        name: "label 1"
      },
      {
        _id: "2",
        color: "#f542e0",
        description: "second label",
        name: "label 2"
      }
    ];

    // render the label selector
    render(<LabelSelectorWithState options={options} />);

    // click the label selector down arrow
    await userEvent.click(screen.getByRole("button"));

    // check that the options are rendered with the correct names and descriptions
    expect(screen.getByText("label 1")).toBeInTheDocument();
    expect(screen.getByText("label 2")).toBeInTheDocument();
    expect(screen.getByText("first label")).toBeInTheDocument();
    expect(screen.getByText("second label")).toBeInTheDocument();
  });
  // test that the label selector renders with an initial value
  it("renders with an initial value", () => {
    const options = [
      {
        _id: "1",
        color: "#005FA8",
        description: "first label",
        name: "label 1"
      }
    ];

    // render the label selector
    render(<LabelSelector options={options} value={options} />);

    // find the chip
    const chip = screen.getByRole("button", {
      name: /label 1/i
    });

    // check that the chip is rendered with the correct name and color
    expect(chip).toHaveStyle("background-color: rgb(0, 95, 168)");
    expect(chip).toHaveTextContent("label 1");
  });
  // test can select an item and that the onChange event is fired and the chip is rendered
  it("can select an item", async () => {
    const options = [
      {
        _id: "1",
        color: "#005FA8",
        description: "first label",
        name: "label 1"
      }
    ];

    // mock the onChange event
    const onChange = vi.fn();

    // render the label selector
    render(<LabelSelectorWithState options={options} onChange={onChange} />);

    // click the label selector down arrow
    await userEvent.click(screen.getByTestId("ArrowDropDownIcon"));

    // click the first option
    await userEvent.click(screen.getByText("label 1"));

    // click the label selector down arrow to close the menu
    await userEvent.click(screen.getByTestId("ArrowDropDownIcon"));

    // check that the onChange event is fired
    expect(onChange).toHaveBeenCalled();

    // find the chip
    const chip = screen.getByRole("button", {
      name: /label 1/i
    });

    // check that the chip is rendered with the correct name and color
    expect(chip).toHaveStyle("background-color: rgb(0, 95, 168)");
    expect(chip).toHaveTextContent("label 1");
  });
  // test can select multiple items and that the onChange event is fired and the chips are rendered
  it("can select multiple items", async () => {
    const options = [
      {
        _id: "1",
        color: "#005FA8",
        description: "first label",
        name: "label 1"
      },
      {
        _id: "2",
        color: "#f542e0",
        description: "second label",
        name: "label 2"
      }
    ];

    // mock the onChange event
    const onChange = vi.fn();

    // render the label selector
    render(
      <LabelSelectorWithState multiple options={options} onChange={onChange} />
    );

    // click the label selector down arrow
    await userEvent.click(screen.getByTestId("ArrowDropDownIcon"));

    // click the first option
    await userEvent.click(screen.getByText("label 1"));

    // click the second option
    await userEvent.click(screen.getByText("label 2"));

    // click the label selector down arrow to close the menu
    await userEvent.click(screen.getByTestId("ArrowDropDownIcon"));

    // check that the onChange event is fired
    expect(onChange).toHaveBeenCalled();

    // find the first chip
    const chip1 = screen.getByRole("button", {
      name: /label 1/i
    });

    // check that the first chip is rendered with the correct name and color
    expect(chip1).toHaveStyle("background-color: rgb(0, 95, 168)");
    expect(chip1).toHaveTextContent("label 1");

    // find the second chip
    const chip2 = screen.getByRole("button", {
      name: /label 2/i
    });

    // check that the second chip is rendered with the correct name and color
    expect(chip2).toHaveStyle("background-color: rgb(245, 66, 224)");
    expect(chip2).toHaveTextContent("label 2");
  });
  // can add a new label
  it("can add a new label", async () => {
    // mock the onChange event
    const onNew = vi.fn();

    // render the label selector
    render(<LabelSelectorWithState onNew={onNew} addEnabled options={[]} />);

    // click the label selector down arrow
    await userEvent.click(screen.getByTestId("ArrowDropDownIcon"));

    // click the add new label button in the menu
    await userEvent.click(
      screen.getByRole("button", { name: "+ Add New Label" })
    );

    // find the input with the label "Label Name" and type "new label"
    const labelName = screen.getByText("Label Name");
    await userEvent.type(labelName, "new label");

    // find the save button and click it
    const saveButton = screen.getByRole("button", { name: "Add" });
    await userEvent.click(saveButton);

    // check that the onChange event is fired
    expect(onNew).toHaveBeenCalled();
  });
  // can edit a  label
  it("can edit a label", async () => {
    const options = [
      {
        _id: "1",
        color: "#005FA8",
        description: "first label",
        name: "label 1"
      }
    ];

    // mock the onChange event
    const onEdit = vi.fn();

    // render the label selector
    render(
      <LabelSelectorWithState options={options} onEdit={onEdit} editEnabled />
    );

    // click the label selector down arrow
    await userEvent.click(screen.getByTestId("ArrowDropDownIcon"));

    // click the edit button in the menu by finding by data-testid and clicking
    await userEvent.click(screen.getByTestId("edit-label-1"));

    // find the input with the label "Label Name" and type "edit label"
    const labelName = screen.getByText("Label Name");
    await userEvent.type(labelName, "edit label");

    // find the save button and click it
    const saveButton = screen.getByRole("button", { name: "Save" });
    await userEvent.click(saveButton);

    // check that the onChange event is fired with the correct arguments
    expect(onEdit).toHaveBeenCalledWith({
      _id: "1",
      color: "#005FA8",
      description: "first label",
      name: "label 1edit label"
    });
  });
  // can delete a label
  it("can delete a label", async () => {
    const options = [
      {
        _id: "1",
        color: "#005FA8",
        description: "first label",
        name: "label 1"
      }
    ];

    // mock the onChange event
    const onDelete = vi.fn();

    // render the label selector
    render(
      <LabelSelectorWithState
        options={options}
        onDelete={onDelete}
        deleteEnabled
      />
    );

    // click the label selector down arrow
    await userEvent.click(screen.getByTestId("ArrowDropDownIcon"));

    // click the delete button in the menu by finding by data-testid and clicking
    await userEvent.click(screen.getByTestId("delete-label-1"));

    // find the delete button and click it
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await userEvent.click(deleteButton);

    // check that the onChange event is fired with the correct arguments
    expect(onDelete).toHaveBeenCalledWith({
      _id: "1",
      color: "#005FA8",
      description: "first label",
      name: "label 1"
    });
  });
  // cannot save a new label that exceeds the max length
  it("cannot save a new label that exceeds the max length", async () => {
    // mock the onChange event
    const onNew = vi.fn();

    // render the label selector
    render(
      <LabelSelectorWithState
        onNew={onNew}
        addEnabled
        nameMaxLength={5}
        options={[]}
      />
    );

    // click the label selector down arrow
    await userEvent.click(screen.getByTestId("ArrowDropDownIcon"));

    // click the add new label button in the menu
    await userEvent.click(
      screen.getByRole("button", { name: "+ Add New Label" })
    );

    // find the input with the label "Label Name" and type "new label"
    const labelName = screen.getByText("Label Name");
    await userEvent.type(labelName, "new label");

    // expect the add button to be disabled
    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });

  // It renders with an error and helper text
  it("renders with an error and helper text", () => {
    const options = [
      {
        _id: "1",
        color: "#005FA8",
        description: "first label",
        name: "label 1"
      }
    ];

    // render the label selector
    render(
      <LabelSelector
        error={true}
        helperText="Label is required"
        options={options}
        value={options}
      />
    );

    const helperText = screen.getByText("Label is required");
    // check that the helper text is being rendered correctly
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("Mui-error");
  });
});
