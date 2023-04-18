import AlignHorizontal, { AlignHorizontalProps } from "./AlignHorizontal";
import { Meta, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";

import { action } from "@storybook/addon-actions";

const meta: Meta<typeof AlignHorizontal> = {
  component: AlignHorizontal,
  title: "Text/AlignHorizontal"
};
export default meta;

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

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  orientation: "horizontal",
  size: "medium",
  value: "left"
};
