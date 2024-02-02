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
    <Multi.render {...Multi.args} />
    <SingleCheckbox.render {...SingleCheckbox.args} />
    <SingleLabel.render {...SingleLabel.args} />
  </FilterStack>
);

export const Default = {
  args: {
    onClear: action("onClear")
  },

  render: Template
};

export const WithCount = {
  args: {
    ...Default.args,
    count: 3
  },

  render: Template
};
