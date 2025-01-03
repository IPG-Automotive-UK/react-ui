import { Meta, StoryFn } from "@storybook/react";

import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import { LabelFilter } from "../LabelFilter/LabelFilter";
import React from "react";
import { SidebarFilter } from "./SidebarFilter";
import { SidebarFilterProps } from "./SidebarFilter.types";
import { Typography } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

/**
 * Story metadata
 */
const meta: Meta<typeof SidebarFilter> = {
  argTypes: {
    children: {
      control: false
    }
  },
  component: SidebarFilter,
  title: "Filters/SidebarFilter"
};

// standard options
const labelOptions = [
  { _id: "1", color: "#005FA8", description: "first label", name: "label 1" },
  { _id: "2", color: "#f542e0", description: "second label", name: "label 2" }
];
const checkboxOptions = ["Option 1", "Option 2", "Option 3"];

/**
 * Story template for the SidebarFilter component
 */
const Template: StoryFn<SidebarFilterProps> = args => {
  //  useArgs is a hook that returns the current state of the args object
  const [{ count }, updateArgs] = useArgs();

  // state for filters
  const [checkboxValues, setCheckboxValues] = React.useState([]);
  const [labelValues, setLabelValues] = React.useState([]);

  // checkbox filter change
  const onCheckboxChange = newValue => {
    setCheckboxValues(newValue);
    const statCount = labelValues.length + newValue.length;
    updateArgs({ count: statCount });
  };

  // label filter change
  const onLabelChange = newValue => {
    setLabelValues(newValue);
    const statCount = checkboxValues.length + newValue.length;
    updateArgs({ count: statCount });
  };

  // handle click on the clear button
  const handleClear = () => {
    // clear the checkbox values
    setCheckboxValues([]);
    // clear the label values
    setLabelValues([]);

    // reset the count value in the args object
    updateArgs({ count: 0 });

    // call the onClear action
    action("onClear")();
  };

  return (
    <SidebarFilter {...args} count={count} onClear={handleClear}>
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
    </SidebarFilter>
  );
};

/**
 * Default story for the SidebarFilter component
 */
export const Default = {
  args: {
    count: 0,
    onClear: action("onClear")
  },
  render: Template
};

/**
 * Story template for the SidebarFilter component with active filter
 */
const WithActiveFilter: StoryFn<SidebarFilterProps> = args => {
  //  useArgs is a hook that returns the current state of the args object
  const [{ count }, updateArgs] = useArgs();

  // state for filters
  const [checkboxValues, setCheckboxValues] = React.useState<string[]>([
    "Option 1"
  ]);

  // checkbox filter change
  const onCheckboxChange = (newValue: string[]) => {
    setCheckboxValues(newValue);
    const statCount = newValue.length;
    updateArgs({ count: statCount });
  };

  // handle click on the clear button
  const handleClear = () => {
    // clear the checkbox values
    setCheckboxValues([]);

    // reset the count value in the args object
    updateArgs({ count: 0 });

    // call the onClear action
    action("onClear")();
  };

  return (
    <SidebarFilter {...args} count={count} onClear={handleClear}>
      <CheckboxFilter
        name="filter1"
        label="Checkboxes"
        onChange={onCheckboxChange}
        value={checkboxValues}
        options={checkboxOptions}
      />
    </SidebarFilter>
  );
};

/**
 * Story with active filter count
 */
export const WithActiveFilterCount = {
  args: {
    ...Default.args,
    count: 1
  },
  render: WithActiveFilter
};

/**
 * Story template for the SidebarFilter component with scrollable content
 */
const WithScrollable: StoryFn<SidebarFilterProps> = args => {
  //  useArgs is a hook that returns the current state of the args object
  const [{ count }, updateArgs] = useArgs();

  // handle click on the clear button
  const handleClear = () => {
    // reset the count value in the args object
    updateArgs({ count: 0 });

    // call the onClear action
    action("onClear")();
  };
  return (
    <SidebarFilter {...args} count={count} onClear={handleClear}>
      {Array.from(Array(50).keys()).map(i => (
        <Typography key={i}>Content {i}</Typography>
      ))}
    </SidebarFilter>
  );
};

/**
 * Story with scrollable content
 */
export const WithScrollableContent = {
  args: {
    ...Default.args,
    count: 1
  },
  render: WithScrollable
};

export default meta;
