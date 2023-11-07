import * as React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import RangeFilter from "./RangeFilter";

/**
 * Test wrapper for RangeFilter
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const RangeFilterWithState = ({
  onChange,
  min = 0,
  max = 100,
  value: valueIn = [min, max],
  ...rest
}) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = selectedValues => {
    setValue(selectedValues);
    onChange(selectedValues);
  };

  return <RangeFilter {...rest} onChange={handleChange} value={value} />;
};

// Tests
describe("RangeFilter", () => {
  it("can select range", () => {
    const onChange = jest.fn();
    render(<RangeFilterWithState onChange={onChange} />);

    // adjust sliders
    const sliders = screen.getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: 25 } });
    fireEvent.change(sliders[1], { target: { value: 75 } });

    // check that the onChange event is fired
    expect(onChange).toHaveBeenLastCalledWith([25, 75]);
  });
});
