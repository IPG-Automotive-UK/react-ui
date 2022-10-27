import * as React from "react";

import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import FilterPopper from "./FilterPopper";
import LabelFilter from "../LabelFilter/LabelFilter";
import RangeFilter from "../RangeFilter/RangeFilter";

export default {
  component: FilterPopper,
  title: "Filters/FilterPopper"
};

// standard options
const labelOptions = [
  { _id: 1, color: "#005FA8", description: "first label", name: "label 1" },
  { _id: 2, color: "#f542e0", description: "second label", name: "label 2" }
];
const checkboxOptions = ["Option 1", "Option 2", "Option 3"];

// template for a multi filter popper
const MultiTemplate = args => {
  // state for filters
  const [checkboxValues, setCheckboxValues] = React.useState([]);
  const [labelValues, setLabelValues] = React.useState([]);
  const [rangeValues, setRangeValues] = React.useState([0, 100]);

  // get count from state
  const rangeCount = rangeValues[0] === 0 && rangeValues[1] === 100 ? 0 : 1;
  const stateCount = checkboxValues.length + labelValues.length + rangeCount;

  // checkbox filter change
  const onCheckboxChange = newValue => {
    setCheckboxValues(newValue);
  };

  // range filter change
  const onRangeChange = newValue => {
    setRangeValues(newValue);
  };

  // label filter change
  const onLabelChange = newValue => {
    setLabelValues(newValue);
  };

  return (
    <FilterPopper {...args} count={args.count || stateCount}>
      <CheckboxFilter
        name="filter1"
        label="Checkboxes"
        onChange={onCheckboxChange}
        value={checkboxValues}
        options={checkboxOptions}
      />
      <LabelFilter
        name="filter2"
        label="Labels"
        onChange={onLabelChange}
        value={labelValues}
        options={labelOptions}
      />
      <RangeFilter
        name="filter3"
        label="Range"
        onChange={onRangeChange}
        value={rangeValues}
        min={0}
        max={100}
      />
    </FilterPopper>
  );
};

// story for a multi filter popper
export const Multi = MultiTemplate.bind({});
Multi.args = {
  label: "Grouped filters"
};

// template for a single checkbox filter
const SingleCheckboxTemplate = args => {
  // selection state
  const [value, setValue] = React.useState([]);

  // filter change
  const onChange = newValue => {
    setValue(newValue);
  };

  // calculate count
  const stateCount = value.length;

  return (
    <FilterPopper {...args} count={args.count || stateCount}>
      <CheckboxFilter
        name="filter1"
        label="Checkbox"
        onChange={onChange}
        value={value}
        options={checkboxOptions}
        variant="always-open"
      />
    </FilterPopper>
  );
};

// story for a single checkbox filter
export const SingleCheckbox = SingleCheckboxTemplate.bind({});
SingleCheckbox.args = {
  label: "Single checkbox"
};

// template for a single label filter
const SingleLabelTemplate = args => {
  // selection state
  const [value, setValue] = React.useState([]);

  // filter change
  const onChange = newValue => {
    setValue(newValue);
  };

  // calculate count
  const stateCount = value.length;

  return (
    <FilterPopper {...args} count={args.count || stateCount}>
      <LabelFilter
        name="filter1"
        label="Labels"
        onChange={onChange}
        value={value}
        options={labelOptions}
        variant="always-open"
      />
    </FilterPopper>
  );
};

// story for a single label filter
export const SingleLabel = SingleLabelTemplate.bind({});
SingleLabel.args = {
  label: "Single label"
};
