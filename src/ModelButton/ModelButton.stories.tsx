import { Meta, Story } from "@storybook/react";

import ModelButton from "./ModelButton";
import ModelButtonImage from "../ModelButtonImage";
import { ModelButtonProps } from "./ModelButton.types";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import { Paper } from "@mui/material";
import React from "react";
import { action } from "@storybook/addon-actions";

// define story metadata
const meta: Meta<typeof ModelButton> = {
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
export default meta;

// default component with no children
const DefaultTemplate = args => {
  return <ModelButton {...args} onClick={event => action("onClick")(event)} />;
};

// component with children
const ChildrenTemplate: Story<ModelButtonProps> = args => {
  return (
    <ModelButton {...args} onClick={event => action("onClick")(event)}>
      <ModelButton
        icon={<ModelButtonImage src={ModelButtonSampleImg} />}
        label="Child Model 1"
        onClick={event => action("onClick")(event)}
        status="error"
      />
      <ModelButton
        icon={<ModelButtonImage src={ModelButtonSampleImg} />}
        label="Child Model 2"
        onClick={event => action("onClick")(event)}
        status="warning"
      />
      <ModelButton
        icon={<ModelButtonImage src={ModelButtonSampleImg} />}
        label="Child Model 3"
        onClick={event => action("onClick")(event)}
        status="success"
      />
    </ModelButton>
  );
};

// component with children over a paper component
// useful to see how different background colours in dark mode effect the button
const ChildrenTemplateWithPaper: Story<
  ModelButtonProps & { elevation: number }
> = ({ elevation, ...args }) => {
  return (
    <Paper elevation={elevation} sx={{ p: 3 }}>
      <ChildrenTemplate {...args} />
    </Paper>
  );
};

// default story props
export const Default = DefaultTemplate.bind({});
Default.args = {
  disabled: false,
  icon: <ModelButtonImage src={ModelButtonSampleImg} />,
  label: "My Model",
  onClick: () => {},
  status: "none"
};

// with children story props
export const WithChildren = ChildrenTemplate.bind({});
WithChildren.args = {
  disabled: false,
  icon: <ModelButtonImage src={ModelButtonSampleImg} />,
  label: "Parent Model",
  onClick: () => {},
  status: "warning"
};

// with children and paper story props
export const WithChildrenAndPaper = ChildrenTemplateWithPaper.bind({});
WithChildrenAndPaper.args = {
  disabled: false,
  elevation: 3,
  icon: <ModelButtonImage src={ModelButtonSampleImg} />,
  label: "Parent Model",
  onClick: () => {},
  status: "warning"
};
