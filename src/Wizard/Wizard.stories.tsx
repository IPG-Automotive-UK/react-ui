import { Meta, StoryFn } from "@storybook/react";
import { Stack, Typography } from "@mui/material";

import React from "react";
import VersionChip from "../VersionChip/VersionChip";
import Wizard from "./Wizard";
import { Default as WizardActions } from "./WizardActions/WizardActions.stories";
import { Default as WizardContent } from "./WizardContent/WizardContent.stories";
import { WizardProps } from "./Wizard.types";
import { Default as WizardSteps } from "./WizardSteps/WizardSteps.stories";

const meta: Meta<typeof Wizard> = {
  argTypes: {
    children: {
      control: false
    },
    maxWidth: {
      control: {
        type: "number"
      }
    }
  },
  component: Wizard,
  title: "Wizard/Wizard"
};
export default meta;

const Template: StoryFn<WizardProps> = args => {
  return (
    <Wizard {...args}>
      <WizardSteps.render {...WizardSteps.args} />
      <WizardContent.render {...WizardContent.args} />
      <WizardActions.render {...WizardActions.args} />
    </Wizard>
  );
};

export const Default = {
  args: {
    maxWidth: 1152,
    title: ""
  },

  render: Template
};

export const WithTitleTypeString = {
  args: {
    ...Default.args,
    title: "Wizard Title"
  },

  render: Template
};

export const WithTitleTypeElement = {
  args: {
    ...Default.args,
    title: (
      <Stack
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          gap: 1,
          maxWidth: theme => theme?.layout?.content?.maxWidth,
          mb: 2,
          mt: 1,
          mx: "auto",
          width: "100%"
        }}
      >
        <Typography
          variant="h5"
          color="textPrimary"
          sx={{
            fontWeight: 700
          }}
        >
          Wizard Title
        </Typography>
        <VersionChip version="1.0" />
      </Stack>
    )
  },

  render: Template
};
