import { Button, Typography } from "@mui/material";
import ConfirmProvider, { confirm as staticConfirm } from "./ConfirmProvider";
import { Meta, StoryFn } from "@storybook/react";

import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { action } from "@storybook/addon-actions";
import useConfirm from "./useConfirm";

/**
 * Story metadata
 */
const meta: Meta<typeof ConfirmProvider> = {
  component: ConfirmProvider,
  title: "Dialog/ConfirmProvider"
};
export default meta;

// create an action for the confirm and cancel buttons
const confirmationAction = action("confirmed");
const cancellationAction = action("cancelled");

// confirmDialog component using the useConfirm hook
const ConfirmDialog: React.FC = options => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm(options).then(confirmationAction).catch(cancellationAction);
      }}
      variant="contained"
    >
      Click
    </Button>
  );
};

// story template
const Template: StoryFn = args => {
  return (
    <ConfirmProvider>
      <ConfirmDialog {...args} />
    </ConfirmProvider>
  );
};

// default story
export const Default = Template.bind({});
Default.args = {
  defaultOptions: {
    cancellationText: "No",
    confirmationText: "Yes",
    description: "This is the default description",
    title: "Dialog Title"
  }
};

// story with static method
export const StaticMethod = {
  render: options => {
    return (
      <ConfirmProvider>
        <Button
          onClick={() => staticConfirm(options).then(confirmationAction)}
          variant="contained"
        >
          Click
        </Button>
      </ConfirmProvider>
    );
  }
};

// story with custom text
export const WithCustomText = Template.bind({});
WithCustomText.args = {
  cancellationText: "No",
  confirmationText: "Yes",
  description: "This is a custom description",
  title: "Custom Title"
};

// story with confirmation button props
export const WithConfirmationButtonProps = Template.bind({});
WithConfirmationButtonProps.args = {
  confirmationButtonProps: { color: "error" }
};

// story with custom Elements
export const WithCustomElements = Template.bind({});
WithCustomElements.args = {
  description: <LinearProgress />
};

// story with custom content
export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  content: (
    <div>
      <LinearProgress />
      <Typography p={2} pl={0}>
        This isn't wrapped in DialogContentText.
      </Typography>
    </div>
  )
};
