import { Meta, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";

import AlignHorizontal from "./AlignHorizontal";
import { AlignHorizontalProps } from "./AlignHorizontal.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof AlignHorizontal> = {
  component: AlignHorizontal,
  title: "Text/AlignHorizontal"
};
export default meta;

/**
 * Story template for the AlignHorizontal component
 * This provides some state management for the component to make it easier to use in Storybook
 */
const Template: Story<AlignHorizontalProps> = args => {
  const [value, setValue] = useState<AlignHorizontalProps["value"]>(
    args.value ?? null
  );
  useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (
    event: React.MouseEvent<HTMLElement>,
    value: AlignHorizontalProps["value"]
  ) => {
    setValue(value);
    action("onChange")(event, value);
  };
  return <AlignHorizontal {...args} onChange={onChange} value={value} />;
};

/**
 * Default story for the AlignHorizontal component
 */
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  orientation: "horizontal",
  size: "medium",
  value: "left"
};
