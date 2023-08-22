import { render, screen } from "@testing-library/react";

import Autocomplete from ".";
import React from "react";
import { userEvent } from "@storybook/testing-library";

// sample options
const options = ["option 1", "option 2", "option 3"];

/**
 * Tests
 */
describe("Select", () => {
  it("can single select", async () => {
    const onChange = jest.fn();

    render(
      <Autocomplete
        multiple={false}
        options={options}
        onChange={onChange}
        label="Select an option"
        value="option 2"
      />
    );
    // click the label selector down arrow
    await userEvent.click(screen.getByRole("button", { name: /open/i }));

    // check that the options are rendered
    expect(screen.getByText("option 1")).toBeInTheDocument();
    expect(screen.getByText("option 2")).toBeInTheDocument();
    expect(screen.getByText("option 3")).toBeInTheDocument();

    // click the first option
    await userEvent.click(screen.getByText("option 1"));

    // check that the onChange event is fired
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("can multi select", async () => {
    const onChange = jest.fn();
    render(
      <Autocomplete
        multiple={true}
        options={options}
        onChange={onChange}
        label="Select an option"
        value={[]}
      />
    );

    // click the label selector down arrow
    await userEvent.click(screen.getByRole("button", { name: /open/i }));

    // check that the options are rendered
    expect(screen.getByText("option 1")).toBeInTheDocument();
    expect(screen.getByText("option 2")).toBeInTheDocument();
    expect(screen.getByText("option 3")).toBeInTheDocument();

    // click the first option
    await userEvent.click(screen.getByText("option 1"));
    await userEvent.click(screen.getByRole("button", { name: /open/i }));
    await userEvent.click(screen.getByText("option 2"));

    // check that the onChange event is fired
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
