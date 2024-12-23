import * as React from "react";

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import LabelFilter from "./LabelFilter";
import { LabelFilterProps } from "./LabelFilter.types";
import userEvent from "@testing-library/user-event";

/**
 * Test wrapper for LabelFilter
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const LabelFilterWithState = ({
  onChange = () => {},
  value: valueIn = [],
  options,
  ...rest
}: LabelFilterProps) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = selectedValues => {
    setValue(selectedValues);
    onChange(selectedValues);
  };

  return (
    <LabelFilter
      options={options}
      {...rest}
      onChange={handleChange}
      value={value}
    />
  );
};

// sample options
const options = [
  {
    _id: "1",
    color: "#FF0000",
    description: "option 1 description",
    name: "option 1"
  },
  {
    _id: "2",
    color: "#00FF00",
    description: "option 2 description",
    name: "option 2"
  },
  {
    _id: "3",
    color: "#0000FF",
    description: "option 3 description",
    name: "option 3"
  }
];

// Tests
describe("LabelFilter", () => {
  describe("variant=popper", () => {
    it("can single select", async () => {
      const onChange = vi.fn();
      render(<LabelFilterWithState options={options} onChange={onChange} />);

      // click the label selector down arrow
      await userEvent.click(screen.getByRole("button", { name: /open/i }));

      // check that the options are rendered
      expect(screen.getByText("option 1")).toBeInTheDocument();
      expect(screen.getByText("option 2")).toBeInTheDocument();
      expect(screen.getByText("option 3")).toBeInTheDocument();

      // click the first option
      await userEvent.click(screen.getByText("option 1"));

      // check that the onChange event is fired
      expect(onChange).toHaveBeenLastCalledWith([options[0]]);
    });
    it("can multi select", async () => {
      const onChange = vi.fn();
      render(<LabelFilterWithState options={options} onChange={onChange} />);

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
      expect(onChange).toHaveBeenLastCalledWith(options.slice(0, 2));
    });
  });
});
