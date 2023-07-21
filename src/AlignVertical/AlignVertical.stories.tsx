import { Meta, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";

import AlignVertical from "./AlignVertical";
import { AlignVerticalProps } from "./AlignVertical.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof AlignVertical> = {
  argTypes: {
    onChange: {
      control: false
    }
  },
  component: AlignVertical,
  title: "Text/AlignVertical"
};
export default meta;

/**
 * Story template for the AlignHorizontal component
 * This provides some state management for the component to make it easier to use in Storybook
 */
const Template: Story<AlignVerticalProps> = args => {
  const [value, setValue] = useState<AlignVerticalProps["value"]>(
    args.value ?? null
  );
  useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (
    event: React.MouseEvent<HTMLElement>,
    value: AlignVerticalProps["value"]
  ) => {
    setValue(value);
    action("onChange")(event, value);
  };
  return <AlignVertical {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  orientation: "horizontal",
  size: "medium",
  value: "top"
};
