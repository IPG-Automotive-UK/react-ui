import DeletableList from ".";
import React from "react";
import { render } from "@testing-library/react";

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
    const onDelete = jest.fn();
    const { container } = render(
      <DeletableList items={["Apple", "Mango", "Banana"]} onDelete={onDelete} />
    );
    const deleteButton = container.querySelector("button");
    deleteButton && deleteButton.click();
    expect(onDelete).toHaveBeenCalledWith("Apple");
  });
});
