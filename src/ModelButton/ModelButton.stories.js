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

// default component with no children
const DefaultTemplate = args => {
  return <ModelButton {...args} onClick={event => action("onClick")(event)} />;
};

// component with children
const ChildrenTemplate = args => {
  return (
    <ModelButton {...args} onClick={event => action("onClick")(event)}>
      <ModelButton
        icon={<DirectionsCarIcon />}
        label="Child Model 1"
        onClick={event => action("onClick")(event)}
        status="error"
      />
      <ModelButton
        icon={<DirectionsCarIcon />}
        label="Child Model 2"
        onClick={event => action("onClick")(event)}
        status="warning"
      />
      <ModelButton
        icon={<DirectionsCarIcon />}
        label="Child Model 3"
        onClick={event => action("onClick")(event)}
        status="success"
      />
    </ModelButton>
  );
};

// default story props
export const Default = DefaultTemplate.bind({});
Default.args = {
  disabled: false,
  icon: <DirectionsCarIcon />,
  label: "My Model",
  onClick: () => {},
  status: "none"
};

// with children story props
export const WithChildren = ChildrenTemplate.bind({});
WithChildren.args = {
  disabled: false,
  icon: <DirectionsCarIcon />,
  label: "Parent Model",
  onClick: () => {},
  status: "warning"
};
