import * as React from "react";

import { render, screen } from "@testing-library/react";

import CheckboxFilter from "./CheckboxFilter";
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
}) => {
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
      const onChange = jest.fn();
      render(<CheckboxFilterWithState options={options} onChange={onChange} />);

      // click the label selector down arrow
      await userEvent.click(screen.getByRole("button", { name: /open/i }));

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
      const onChange = jest.fn();
      render(<CheckboxFilterWithState options={options} onChange={onChange} />);

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
      expect(onChange).toHaveBeenLastCalledWith(["option 1", "option 2"]);
    });
  });
  describe("variant=always-open", () => {
    it("can single select", async () => {
      const onChange = jest.fn();
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
    it("can single select", async () => {
      const onChange = jest.fn();
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
  });
});
