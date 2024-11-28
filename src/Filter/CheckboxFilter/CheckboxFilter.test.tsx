import * as React from "react";

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import CheckboxFilter from "./CheckboxFilter";
import { CheckboxFilterProps } from "./CheckboxFilter.types";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for CheckboxFilter
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const CheckboxFilterWithState = ({
  onChange,
  value: valueIn = [],
  ...rest
}: CheckboxFilterProps) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = selectedValues => {
    setValue(selectedValues);
    onChange(selectedValues);
  };

  return <CheckboxFilter {...rest} onChange={handleChange} value={value} />;
};

// sample options
const options = ["option 1", "option 2", "option 3"];

// Tests
describe("CheckboxFilter", () => {
  describe("variant=popper", () => {
    it("can single select", async () => {
      const onChange = vi.fn();
      render(<CheckboxFilterWithState options={options} onChange={onChange} />);

      // click the label selector down arrow
      await userEvent.click(screen.getByRole("button", { name: /open/i }));

      // check that the options are rendered
      expect(screen.getByText("option 1")).toBeEnabled();
      expect(screen.getByText("option 2")).toBeEnabled();
      expect(screen.getByText("option 3")).toBeEnabled();

      // click the first option
      await userEvent.click(screen.getByText("option 1"));

      // check that the onChange event is fired
      expect(onChange).toHaveBeenLastCalledWith(["option 1"]);
    });
    it("can multi select", async () => {
      const onChange = vi.fn();
      render(<CheckboxFilterWithState options={options} onChange={onChange} />);

      // click the label selector down arrow
      await userEvent.click(screen.getByRole("button", { name: /open/i }));

      // check that the options are rendered
      expect(screen.getByText("option 1")).toBeEnabled();
      expect(screen.getByText("option 2")).toBeEnabled();
      expect(screen.getByText("option 3")).toBeEnabled();

      // click the first option
      await userEvent.click(screen.getByText("option 1"));
      await userEvent.click(screen.getByRole("button", { name: /open/i }));
      await userEvent.click(screen.getByText("option 2"));

      // check that the onChange event is fired
      expect(onChange).toHaveBeenLastCalledWith(["option 1", "option 2"]);
    });

    // test that filter is active when we either dont pass the prop
    it("can disable filter when disabled is undefined", () => {
      const onChange = vi.fn();
      render(<CheckboxFilterWithState options={options} onChange={onChange} />);
      const button: HTMLButtonElement = screen.getByRole("button", {
        name: /open/i
      });
      expect(button).toBeEnabled();
    });

    // test that filter is active when we pass disabled = false
    it("can disable filter when disabled is false", () => {
      const onChange = vi.fn();
      render(
        <CheckboxFilterWithState
          options={options}
          onChange={onChange}
          disabled={false}
        />
      );
      expect(screen.getByRole("button", { name: /open/i })).toBeEnabled();
    });

    // test that filter is active when we pass disabled = true
    it("can disable filter when disabled is true", () => {
      const onChange = vi.fn();
      render(
        <CheckboxFilterWithState
          options={options}
          onChange={onChange}
          disabled={true}
        />
      );
      expect(screen.getByRole("button", { name: /open/i })).not.toBeEnabled();
    });
  });
  describe("variant=always-open", () => {
    it("can single select", async () => {
      const onChange = vi.fn();
      render(
        <CheckboxFilterWithState
          options={options}
          onChange={onChange}
          variant="always-open"
        />
      );

      // check that the options are rendered
      expect(screen.getByText("option 1")).toBeInTheDocument();
      expect(screen.getByText("option 2")).toBeInTheDocument();
      expect(screen.getByText("option 3")).toBeInTheDocument();

      // click the first option
      await userEvent.click(screen.getByText("option 1"));

      // check that the onChange event is fired
      expect(onChange).toHaveBeenLastCalledWith(["option 1"]);
    });
    it("can multi select", async () => {
      const onChange = vi.fn();
      render(
        <CheckboxFilterWithState
          options={options}
          onChange={onChange}
          variant="always-open"
        />
      );

      // check that the options are rendered
      expect(screen.getByText("option 1")).toBeInTheDocument();
      expect(screen.getByText("option 2")).toBeInTheDocument();
      expect(screen.getByText("option 3")).toBeInTheDocument();

      // click the first option
      await userEvent.click(screen.getByText("option 1"));
      await userEvent.click(screen.getByText("option 2"));

      // check that the onChange event is fired
      expect(onChange).toHaveBeenLastCalledWith(["option 1", "option 2"]);
    });
    // test that filter is active when we either dont pass the prop
    it("can activate filter when disabled is undefined", () => {
      const onChange = vi.fn();
      render(<CheckboxFilterWithState options={options} onChange={onChange} />);
      expect(screen.getByRole("button", { name: /open/i })).toBeEnabled();
    });

    // test that filter is active when we pass disabled = false
    it("can activate filter when disabled is false", () => {
      const onChange = vi.fn();
      render(
        <CheckboxFilterWithState
          options={options}
          onChange={onChange}
          disabled={false}
        />
      );
      expect(screen.getByRole("button", { name: /open/i })).toBeEnabled();
    });

    // test that filter is active when we pass disabled = true
    it("can disable filter when disabled is true", () => {
      const onChange = vi.fn();
      render(
        <CheckboxFilterWithState
          options={options}
          disabled={true}
          onChange={onChange}
        />
      );
      expect(screen.getByRole("button", { name: /open/i })).not.toBeEnabled();
    });

    // test that the filter options are sorted alphabetically when the component is rendered
    it("can sort filter options alphabetically", () => {
      const onChange = vi.fn();
      const unsortedOptions = [
        "!",
        "2",
        "1",
        "10",
        "Gate 10",
        "Gate 4",
        "Gate 5",
        "@",
        "3",
        "b",
        "A",
        "C",
        "B",
        "Gate 1"
      ];
      render(
        <CheckboxFilterWithState
          options={unsortedOptions}
          onChange={onChange}
          variant="always-open"
        />
      );

      // find all the list items in the filter popper which have test id filter-option-label
      const filterOptions = screen.getAllByTestId("filter-option-label");

      // get the text content of the filter option paragraph components
      const filterOptionText = filterOptions.map(option => option.textContent);

      // check that the options are sorted alphabetically
      expect(filterOptionText).toEqual([
        "!",
        "@",
        "1",
        "2",
        "3",
        "10",
        "A",
        "b",
        "B",
        "C",
        "Gate 1",
        "Gate 4",
        "Gate 5",
        "Gate 10"
      ]);
    });
  });
});
