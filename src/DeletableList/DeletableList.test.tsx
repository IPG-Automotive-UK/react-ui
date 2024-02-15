import { fireEvent, render } from "@testing-library/react";

import DeletableList from ".";
import React from "react";
import { vi } from "vitest";

// tests for the DeletableList component
describe("DeletableList", () => {
  // test to check the component renders
  test("renders", () => {
    render(<DeletableList items={[]} onDelete={() => {}} />);
  });

  // test to check the list renders
  test("renders list", () => {
    const { container } = render(
      <DeletableList items={["Apple", "Mango", "Banana"]} onDelete={() => {}} />
    );
    expect(container.querySelectorAll("li").length).toBe(3);
  });

  // test that checks the delete button click called with the deleted item
  test("test list delete works", () => {
    const onDelete = vi.fn();
    const { queryAllByTestId } = render(
      <DeletableList items={["Apple", "Mango", "Banana"]} onDelete={onDelete} />
    );

    // find the IconButton by its data-testid attribute
    const deleteButtons = queryAllByTestId("close");

    // trigger a click event on the IconButton
    fireEvent.click(deleteButtons[0]);

    // check if onDelete was called with the expected argument
    expect(onDelete).toHaveBeenCalledWith("Apple");
  });
});
