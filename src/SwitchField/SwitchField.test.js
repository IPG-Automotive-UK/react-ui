import { render, screen } from "@testing-library/react";
import React from "react";
import SwitchField from "./";
import userEvent from "@testing-library/user-event";

describe("SwitchField", () => {
  it.each([true, false])("can be checked = %s", async expected => {
    const user = userEvent.setup();
    const onChange = jest.fn(event => event.target.checked);
    render(
      <SwitchField
        options={["Option A", "Option B"]}
        onChange={onChange}
        checked={!expected}
      />
    );
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveReturnedWith(expected);
  });
  it("renders helper text when provided", () => {
    render(
      <SwitchField
        options={["Option A", "Option B"]}
        helperText="A descriptive helper"
        onChange={jest.fn()}
        checked={false}
      />
    );
    expect(screen.getByText("A descriptive helper")).toBeInTheDocument();
  });
  it("renders label when provided", () => {
    render(
      <SwitchField
        options={["Option A", "Option B"]}
        label="A descriptive label"
        onChange={jest.fn()}
        checked={false}
      />
    );
    expect(screen.getByText("A descriptive label")).toBeInTheDocument();
  });
  it("renders options", () => {
    render(
      <SwitchField
        options={["Option A", "Option B"]}
        onChange={jest.fn()}
        checked={false}
      />
    );
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });
  it("can be disabled", () => {
    const { container } = render(
      <SwitchField
        options={["Option A", "Option B"]}
        onChange={jest.fn()}
        checked={false}
        disabled
      />
    );
    expect(
      container.getElementsByClassName("Mui-disabled MuiSwitch-switchBase")[0]
    ).toBeInTheDocument();
  });
});
