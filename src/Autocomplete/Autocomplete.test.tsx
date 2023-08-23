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

    expect(onChange).toHaveBeenCalledTimes(1);

    // check that the onChange event is fired with the expected value
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      "option 1",
      "selectOption",
      { option: "option 1" }
    );
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

    expect(onChange).toHaveBeenCalledTimes(1);

    // check that the onChange event is fired with the expected value
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      ["option 1"],
      "selectOption",
      { option: "option 1" }
    );

    await userEvent.click(screen.getByRole("button", { name: /open/i }));

    // click the second option
    await userEvent.click(screen.getByText("option 2"));

    expect(onChange).toHaveBeenCalledTimes(2);

    // check that the onChange event is fired with the expected value
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      ["option 2"],
      "selectOption",
      { option: "option 2" }
    );

    // Check the first call with "option 1"
    expect(onChange.mock.calls[0][1]).toEqual(["option 1"]);

    // Check the second call with "option 2"
    expect(onChange.mock.calls[1][1]).toEqual(["option 2"]);
  });
});
