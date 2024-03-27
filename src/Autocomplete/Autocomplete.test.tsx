import { render, screen, waitFor } from "@testing-library/react";

import Autocomplete from ".";
import React from "react";
import { userEvent } from "@testing-library/user-event";

// sample options
const options = ["option 1", "option 2", "option 3"];
const keyValueOptions = [
  { key: 1, value: "Option 1" },
  { key: 2, value: "Option 2" },
  { key: 3, value: "Option 3" },
  { key: 4, value: "Option 4" }
];
const keyValueOptionsWithTooltip = [
  { key: 1, tooltip: "Tooltip 1", value: "Option 1" },
  { key: 2, tooltip: "Tooltip 2", value: "Option 2" },
  { key: 3, tooltip: "Tooltip 3", value: "Option 3" },
  { key: 4, tooltip: "Tooltip 4", value: "Option 4" }
];

/**
 * Tests
 */
describe("Select", () => {
  it("can single select", async () => {
    const onChange = vi.fn();

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

    // click the first option and check callback is called
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
    const onChange = vi.fn();
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

    // click the first option and check callback is called
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

    // check the first call with "option 1"
    expect(onChange.mock.calls[0][1]).toEqual(["option 1"]);

    // check the second call with "option 2"
    expect(onChange.mock.calls[1][1]).toEqual(["option 2"]);
  });

  it("can single select with key-value pairs", async () => {
    const onChange = vi.fn();

    render(
      <Autocomplete
        multiple={false}
        options={keyValueOptions}
        onChange={onChange}
        label="Select an option"
        value={keyValueOptions[1]}
      />
    );

    // click the label selector down arrow
    await userEvent.click(screen.getByRole("button", { name: /open/i }));

    // check that the options are rendered
    keyValueOptions.forEach(opt =>
      expect(screen.getByText(opt.value)).toBeInTheDocument()
    );

    // click the first option and check callback is called
    await userEvent.click(screen.getByText("Option 1"));
    expect(onChange).toHaveBeenCalledTimes(1);

    // check that the onChange event is fired with the expected value
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      { key: 1, value: "Option 1" },
      expect.anything(),
      expect.anything()
    );
  });

  it("check helper icon is visible and tooltip shown on hover", async () => {
    const onChange = vi.fn();

    render(
      <Autocomplete
        multiple={false}
        options={keyValueOptionsWithTooltip}
        onChange={onChange}
        label="Select an option"
        value={{ key: 2, tooltip: "Tooltip 2", value: "Option 2" }}
      />
    );

    // click the label selector down arrow
    await userEvent.click(screen.getByRole("button", { name: /open/i }));

    // check that the options are rendered
    keyValueOptionsWithTooltip.forEach(opt =>
      expect(screen.getByText(opt.value)).toBeInTheDocument()
    );

    // check that helper icons is rendered
    keyValueOptionsWithTooltip.forEach(opt =>
      expect(screen.getByTestId(`tooltip-${opt.key}`)).toBeInTheDocument()
    );

    // check tooltip is shown on hover of helper icon
    await userEvent.hover(screen.getByTestId("tooltip-1"));
    await waitFor(() => {
      expect(screen.getByText("Tooltip 1")).toBeInTheDocument();
    });

    // click the first option and check callback is called
    await userEvent.click(screen.getByText("Option 1"));
    expect(onChange).toHaveBeenCalledTimes(1);

    // check that the onChange event is fired with the expected value
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      { key: 1, tooltip: "Tooltip 1", value: "Option 1" },
      expect.anything(),
      expect.anything()
    );
  });

  it("textfield default value", () => {
    const { getByRole } = render(
      <Autocomplete
        defaultValue={"option-one"}
        options={["optione-one", "option-two", "option-three"]}
        label="Select an option"
      />
    );

    const input = getByRole("combobox") as HTMLInputElement;

    expect(input).toHaveValue("option-one");
  });

  it("can use an onBlur callback", async () => {
    const onBlur = vi.fn();

    render(
      <Autocomplete
        multiple={false}
        options={keyValueOptions}
        onBlur={onBlur}
        label="Select an option"
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /open/i }));
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
