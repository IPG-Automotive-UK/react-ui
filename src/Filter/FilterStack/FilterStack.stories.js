import * as React from "react";

import {
  Multi,
  SingleCheckbox,
  SingleLabel
} from "../FilterPopper/FilterPopper.stories";

import FilterStack from "./FilterStack";
import { action } from "@storybook/addon-actions";

export default {
  component: FilterStack,
  title: "Filters/FilterStack"
};

const Template = args => (
  <FilterStack {...args}>
    <Multi {...Multi.args} />
    <SingleCheckbox {...SingleCheckbox.args} />
    <SingleLabel {...SingleLabel.args} />
  </FilterStack>
);

export const Default = Template.bind({});
Default.args = {
  onClear: action("onClear")
};

export const WithCount = Template.bind({});
WithCount.args = {
  ...Default.args,
  count: 3
};
