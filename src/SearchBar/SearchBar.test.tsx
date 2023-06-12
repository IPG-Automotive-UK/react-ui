import React from "react";
import SearchBar from ".";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SearchBar", () => {
  test("Search bar updates value", () => {
    const message = "some search query";
    const { container } = render(<SearchBar value={message} />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    expect(inputBase?.value).toBe(message);
  });
  test("onChange works as expected", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const message = "another search query";
    const { container } = render(<SearchBar onChange={onChange} />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, message);
    expect(onChange).toBeCalled();
  });
  test("onBlur works as expected", async () => {
    const user = userEvent.setup();
    const onBlur = jest.fn();
    const message = "another search query";
    const { container } = render(<SearchBar onBlur={onBlur} />);
    const inputBase = container.querySelector(
      ".MuiInputBase-input"
    ) as HTMLInputElement;
    await user.type(inputBase, message);
    await user.tab();
    expect(onBlur).toBeCalled();
  });
});
