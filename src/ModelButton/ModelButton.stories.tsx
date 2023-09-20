import { Meta, StoryFn } from "@storybook/react";

import ModelButton from "./ModelButton";
import ModelButtonImage from "../ModelButtonImage";
import { ModelButtonProps } from "./ModelButton.types";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import { Paper } from "@mui/material";
import PowerSupplyImg from "../../static/powersupply-lv.svg";
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
const DefaultTemplate: StoryFn<ModelButtonProps> = args => {
  return <ModelButton {...args} onClick={event => action("onClick")(event)} />;
};

// component with children
const ChildrenTemplate: StoryFn<ModelButtonProps> = args => {
  return (
    <ModelButton {...args} onClick={event => action("onClick")(event)}>
      <ModelButton
        icon={<ModelButtonImage src={PowerSupplyImg} />}
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
const ChildrenTemplateWithPaper: StoryFn<
  ModelButtonProps & { elevation: number }
> = ({ elevation, ...args }) => {
  return (
    <Paper elevation={elevation} sx={{ p: 3 }}>
      <ChildrenTemplate {...args} />
    </Paper>
  );
};

export const Default = {
  args: {
    disabled: false,
    icon: <ModelButtonImage src={ModelButtonSampleImg} />,
    label: "My Model",
    onClick: () => {},
    status: "none"
  },

  render: DefaultTemplate
};

export const WithChildren = {
  args: {
    disabled: false,
    icon: <ModelButtonImage src={ModelButtonSampleImg} />,
    label: "Parent Model",
    onClick: () => {},
    status: "warning"
  },

  render: ChildrenTemplate
};

export const WithChildrenAndPaper = {
  args: {
    disabled: false,
    elevation: 3,
    icon: <ModelButtonImage src={ModelButtonSampleImg} />,
    label: "Parent Model",
    onClick: () => {},
    status: "warning"
  },

  render: ChildrenTemplateWithPaper
};
