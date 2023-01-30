import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ModelButton from "./ModelButton";
import React from "react";
import { action } from "@storybook/addon-actions";

// define story metadata
export default {
  argTypes: {
    disabled: {
      control: "boolean"
    },
    icon: {
      control: false
    },
    onClick: {
      control: false
    }
  },
  component: ModelButton,
  title: "General/ModelButton"
};

// create instance of component
const Template = args => {
  return <ModelButton {...args} onClick={event => action("onClick")(event)} />;
};

// default story props
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  icon: <DirectionsCarIcon />,
  label: "My Model",
  onClick: () => {},
  status: "none"
};
