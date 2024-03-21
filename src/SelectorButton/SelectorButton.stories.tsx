import AddHomeIcon from "@mui/icons-material/AddHome";
import React from "react";
import SelectorButton from "./SelectorButton";
import { SelectorButtonProps } from "./SelectorButton.types";
import { StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default { component: SelectorButton, title: "Selectors/SelectorButton" };

const Template: StoryFn<SelectorButtonProps> = args => {
  return <SelectorButton {...args} />;
};

export const Default = {
  args: {
    description: "Let's add a new house",
    icon: <AddHomeIcon sx={{ fontSize: 56 }} />,
    onClick: action("onClick"),
    text: "Add House"
  },
  render: Template
};
